const statusCode = require("../utils/statusCode.json");
const message = require("../utils/message.json");

const jwt = require("jsonwebtoken");
const { categorySchema } = require("../models");

module.exports = {
    addCategory: async (req, res) => {
        try {
            const { name } = req.body;
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
            const categoryExist = await categorySchema.findOne({ name, user:user.user });
            if (categoryExist) {
                return res
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: message.CATEGORY_ALREADY_EXISTS });
            }
            const category = await categorySchema
                .create({ name, user: user.user });
            if (category) {
                return res
                    .status(statusCode.HTTP_CODE.OK)
                    .json({ success: true, message: message.CATEGORY_ADDED_SUCCESSFULLY });
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
    getCategories: async (req, res) => {
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
            const categories = await categorySchema.find({user: user.user});
            if (categories.length > 0) {
                return res
                    .status(statusCode.HTTP_CODE.OK)
                    .json({ success: true, categories });
            }
            return res
                .status(statusCode.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: message.CATEGORY_NOT_FOUND });
        } catch (error) {
            return res
                .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    deleteCategory : async (req, res) => {
        try {
            const { _id } = req.params;
            if(!_id)
            {
                return res
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: message.FAILED });
            }
            const category = await categorySchema.findOne({ _id });
            if (!category) {
                return res
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success: true, message: message.CATEGORY_NOT_FOUND });
            }
            const categoryDeleted = await categorySchema.deleteOne({ _id });
            if (categoryDeleted) {
                return res
                    .status(statusCode.HTTP_CODE.OK)
                    .json({ success: true, message: message.CATEGORY_DELETED_SUCCESSFULLY });
            }
            return res
                .status(statusCode.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: message.FAILED });
        } catch (error) {
            return res
                .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    }
};