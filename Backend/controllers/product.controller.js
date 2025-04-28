const statusCode = require("../utils/statusCode.json");
const message = require("../utils/message.json");

const jwt = require("jsonwebtoken");
const { productSchema } = require("../models");
const { putObject } = require("../utils/s3");

module.exports = {
    addProduct: async (req, res) => {
        try {
            const { name, actual_price, selling_price, productNo, category, description, image } = req.body;
            let token, user;
            const authorization = req.headers.authorization;
            if (authorization && authorization.startsWith("Bearer")) {
                token = req.headers.authorization.split(" ")[1];
                if(!token) {
                    return res
                        .status(statusCode.HTTP_CODE.UNAUTHORIZED)
                        .json({ success: false, message: message.UNAUTHORIZED });
                }
                user = await jwt.verify(token, process.env.SECRET_KEY);
            }
            const productExist = await productSchema.findOne({ productNo, user: user.user });
            if (productExist) {
                return res
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: message.PRODUCT_ALREADY_EXISTS });
            }
            const profit = selling_price - actual_price;
            const product = await productSchema.create({ name, actual_price, selling_price, productNo, profit, category, description, image, user: user.user });
            if (product) {
                return res
                    .status(statusCode.HTTP_CODE.OK)
                    .json({ success: true, message: message.PRODUCT_ADDED_SUCCESSFULLY });
            }
            return res
                .status(statusCode.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: message.FAILED });
        } catch (error) {
            return res
                .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    getProducts: async (req, res) => {
        try {
            let token, user;
            const authorization = req.headers.authorization;
            if (authorization && authorization.startsWith("Bearer")) {
                token = req.headers.authorization.split(" ")[1];
                if(!token) {
                    return res
                        .status(statusCode.HTTP_CODE.UNAUTHORIZED)
                        .json({ success: false, message: message.UNAUTHORIZED });
                }
                user = await jwt.verify(token, process.env.SECRET_KEY);
            }
            const products = await productSchema.find({user: user.user}).sort({ createdAt: -1 }).populate('category');
            if (products.length > 0) {
                return res
                    .status(statusCode.HTTP_CODE.OK)
                    .json({ success: true, products });
            }
            return res
                .status(statusCode.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: message.PRODUCT_NOT_FOUND });
        } catch (error) {
            return res
                .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    getProductByProductNo : async (req, res) => {
        try {
            const { productNo } = req.params;
            let token, user;
            const authorization = req.headers.authorization;
            if (authorization && authorization.startsWith("Bearer")) {
                token = req.headers.authorization.split(" ")[1];
                if(!token) {
                    return res
                        .status(statusCode.HTTP_CODE.UNAUTHORIZED)
                        .json({ success: false, message: message.UNAUTHORIZED });
                }
                user = await jwt.verify(token, process.env.SECRET_KEY);
            }
            const product = await productSchema.findOne({ productNo, user:user.user}).populate('category');
            if (!product) {
                return res
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: message.PRODUCT_NOT_FOUND });
            }
            return res
                .status(statusCode.HTTP_CODE.OK)
                .json({ success: true, product });
        } catch (error) {
            return res
                .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    deleteProduct : async (req, res) => {
        try {
            const { _id } = req.params;
            const product = await productSchema.findOne({ _id });
            if (!product) {
                return res
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: message.PRODUCT_NOT_FOUND });
            }
            await productSchema.deleteOne(product);
            return res
                .status(statusCode.HTTP_CODE.OK)
                .json({ success: true, message: message.PRODUCT_DELETED_SUCCESSFULLY });
        } catch (error) {
            return res
                .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    updateProduct : async (req, res) => {
        try {
            const { _id, name, actual_price, selling_price, productNo, category, description } = req.body;
            const product = await productSchema.findOne({ _id });
            if (!product) {
                return res
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: message.PRODUCT_NOT_FOUND });
            }
            const profit = selling_price - actual_price;
            await productSchema.updateOne({ _id }, { name, actual_price, selling_price, productNo, profit, category, description });
            return res
                .status(statusCode.HTTP_CODE.OK)
                .json({ success: true, message: message.PRODUCT_UPDATED_SUCCESSFULLY });
        } catch (error) {
            return res
                .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },

    uploadImage : async (req, res) => {
        try {
            let { filename, contentType } = req.body;
            const currentDateTime = new Date().toISOString().replace(/[:.]/g, '-');
            filename = currentDateTime + "-" + filename;
            const uploadUrl = await putObject(filename, contentType);
            const imageUrl = `https://computrack-product.s3.eu-north-1.amazonaws.com/${encodeURIComponent(filename)}`;
        
            return res
                    .status(statusCode.HTTP_CODE.OK)
                    .json({success:true, uploadUrl, imageUrl });
          } catch (error) {
            console.error(error);
            return res
                    .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: error.message });
          }
    }
}