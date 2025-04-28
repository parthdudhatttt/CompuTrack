const statusCode = require("../utils/statusCode");
const message = require("../utils/message");
const jwt = require("jsonwebtoken");

const {
  warehouseProductSchema,
  productSchema,
  historySchema,
} = require("../models");

module.exports = {
  getWarehouseProducts: async (req, res) => {
    try {
      const warehouseProducts = await warehouseProductSchema
        .find()
        .populate("warehouse")
        .populate({ path: "product", populate: { path: "category" } });
      if (warehouseProducts.length > 0) {
        return res
          .status(statusCode.HTTP_CODE.OK)
          .json({ success: true, warehouseProducts });
      }
      return res
        .status(statusCode.HTTP_CODE.BAD_REQUEST)
        .json({ success: false, message: message.WAREHOUSE_PRODUCT_NOT_FOUND });
    } catch (error) {
      return res
        .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  },
  getWarehouseProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const warehouseProduct = await warehouseProductSchema
        .findOne({ _id: id })
        .populate("warehouse")
        .populate({ path: "product", populate: { path: "category" } });
      if (warehouseProduct) {
        return res
          .status(statusCode.HTTP_CODE.OK)
          .json({ success: true, warehouseProduct });
      }
      return res
        .status(statusCode.HTTP_CODE.BAD_REQUEST)
        .json({ success: false, message: message.WAREHOUSE_PRODUCT_NOT_FOUND });
    } catch (error) {
      return res
        .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  },
  getWarehouseProductByWarehouse: async (req, res) => {
    try {
      const { id } = req.params;
      const warehouseProducts = await warehouseProductSchema
        .find({ warehouse: id })
        .populate("warehouse")
        .populate({ path: "product", populate: { path: "category" } });
      if (warehouseProducts.length > 0) {
        return res
          .status(statusCode.HTTP_CODE.OK)
          .json({ success: true, warehouseProducts });
      }
      return res
        .status(statusCode.HTTP_CODE.BAD_REQUEST)
        .json({ success: false, message: message.WAREHOUSE_PRODUCT_NOT_FOUND });
    } catch (error) {
      return res
        .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  },
  getWarehouseProductByProductNo: async (req, res) => {
    try {
      const { productNo } = req.params;
      const product = await productSchema.findOne({ productNo });
      if (!product) {
        return res
          .status(statusCode.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: message.PRODUCT_NOT_FOUND });
      }
      const warehouseProducts = await warehouseProductSchema
        .find({ product: product._id })
        .populate("warehouse")
      if (warehouseProducts.length > 0) {
        return res
          .status(statusCode.HTTP_CODE.OK)
          .json({ success: true, warehouseProducts });
      }
      return res
        .status(statusCode.HTTP_CODE.BAD_REQUEST)
        .json({ success: false, message: message.WAREHOUSE_PRODUCT_NOT_FOUND });
    } catch (error) {
      return res
        .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  },
  addWarehouseProduct: async (req, res) => {
    try {
      const { warehouse, product, quantity } = req.body;
      const warehouseProductExist = await warehouseProductSchema.findOne({
        warehouse,
        product,
      });
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
      const productExist = await productSchema.findOne({ _id: product });
      if (!productExist) {
        return res
          .status(statusCode.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: message.PRODUCT_NOT_FOUND });
      }
      if (warehouseProductExist) {
        return res
          .status(statusCode.HTTP_CODE.BAD_REQUEST)
          .json({
            success: false,
            message: message.WAREHOUSE_PRODUCT_ALREADY_EXISTS,
          });
      }

      productExist.total_quantity = productExist.total_quantity + parseInt(quantity);
      const updatedProduct = await productExist.save();

      let available = true;
      if (quantity <= 0) {
        available = false;
      }
      const warehouseProduct = await warehouseProductSchema.create({
        warehouse,
        product,
        quantity,
        available,
      });

      let type = "incoming";
      let total_profit = 0;
      const history = await historySchema.create({
        warehouse,
        product,
        quantity,
        total_profit,
        type,
        user: user.user,
      });

      if (warehouseProduct && updatedProduct && history) {
        return res
          .status(statusCode.HTTP_CODE.OK)
          .json({
            success: true,
            message: message.WAREHOUSE_PRODUCT_ADDED_SUCCESSFULLY,
          });
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
  updateWarehouseProduct: async (req, res) => {
    try {
      const { _id, quantity } = req.body;
      const warehouseProduct = await warehouseProductSchema.findOne({ _id });
      if (!warehouseProduct) {
        return res
          .status(statusCode.HTTP_CODE.BAD_REQUEST)
          .json({
            success: false,
            message: message.WAREHOUSE_PRODUCT_NOT_FOUND,
          });
      }
      let token,user;
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
      const productExist = await productSchema.findOne({
        _id: warehouseProduct.product,
      });
      if (!productExist) {
        return res
          .status(statusCode.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: message.PRODUCT_NOT_FOUND });
      }

      if (!warehouseProduct) {
        return res
          .status(statusCode.HTTP_CODE.BAD_REQUEST)
          .json({
            success: false,
            message: message.WAREHOUSE_PRODUCT_NOT_FOUND,
          });
      }
      //if warehouseProduct.quantity is less than quantity then type is out going else it is incoming ( for history purpose)
      let type = warehouseProduct.quantity < quantity ? "incoming" : "outgoing";

      productExist.total_quantity =
        productExist.total_quantity +
        parseInt(quantity) -
        parseInt(warehouseProduct.quantity);

      let total_profit = 0;
      const history_quantity = Math.abs(parseInt(warehouseProduct.quantity) - parseInt(quantity));
      if (type === "outgoing") {
        total_profit =
          (productExist.selling_price - productExist.actual_price) *
          history_quantity;
      }
      warehouseProduct.quantity = quantity;

      let available = true;
      if (warehouseProduct.quantity <= 0) {
        available = false;
      }
      warehouseProduct.available = available;
      await warehouseProductSchema.updateOne({ _id }, { quantity, available });
      /* const updateWarehouseProductACK = await warehouseProductSchema.updateOne(
        warehouseProduct
      ); */
      const updateProductACK = await productSchema.updateOne(
          { _id: warehouseProduct.product },
          { total_quantity: productExist.total_quantity }
        );
        
        const history = await historySchema.create({
            warehouse: warehouseProduct.warehouse,
            product: warehouseProduct.product,
            quantity: history_quantity,
            type,
            total_profit,
            user: user.user,
        });
        
        const newWarehouseProduct = await warehouseProductSchema.findOne({ _id : warehouseProduct._id }).populate("warehouse").populate({ path: "product", populate: { path: "category" } });
        if (updateProductACK && history) {
            return res
            .status(statusCode.HTTP_CODE.OK)
            .json({
                success: true,
                message: message.WAREHOUSE_PRODUCT_UPDATED_SUCCESSFULLY, 
                warehouseProduct : newWarehouseProduct
            });
        }
        return res
        .status(statusCode.HTTP_CODE.OK)
        .json({ success: true, message: message.FAILED });
    } catch (error) {
      return res
        .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  },
  deleteWarehouseProduct: async (req, res) => {
    try {
      const { _id } = req.params;
      const warehouseProduct = await warehouseProductSchema.findOne({ _id });

      if (!warehouseProduct) {
        return res
          .status(statusCode.HTTP_CODE.BAD_REQUEST)
          .json({
            success: false,
            message: message.WAREHOUSE_PRODUCT_NOT_FOUND,
          });
      }

      const productExist = await productSchema.findOne({
        _id: warehouseProduct.product,
      });

      if (!productExist) {
        return res
          .status(statusCode.HTTP_CODE.BAD_REQUEST)
          .json({ success: false, message: message.PRODUCT_NOT_FOUND });
      }

      productExist.total_quantity =
        productExist.total_quantity - parseInt(warehouseProduct.quantity);

      const updatedProduct = await productSchema.updateOne(productExist);
      const deletedWarehouseProduct = await warehouseProductSchema.deleteOne(
        warehouseProduct
      );

      if (deletedWarehouseProduct && updatedProduct) {
        return res
          .status(statusCode.HTTP_CODE.OK)
          .json({
            success: true,
            message: message.WAREHOUSE_PRODUCT_DELETED_SUCCESSFULLY,
          });
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
};
