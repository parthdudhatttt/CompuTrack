const statusCode = require("../utils/statusCode.json");
const message = require("../utils/message.json");

const jwt = require("jsonwebtoken");

const { warehouseSchema, warehouseProductSchema, historySchema, productSchema } = require("../models");

module.exports = {
    addWarehouse: async (req, res) => {
        try {
            const { name, address } = req.body;
            let token, user;
            const authorization = req.headers.authorization;
            if (authorization && authorization.startsWith("Bearer")) {
                token = req.headers.authorization.split(" ")[1];
                if(!token) {
                    return res
                        .status(statusCode.HTTP_CODE.UNAUTHORIZED)
                        .json({ success: false, message: message.INVALID_TOKEN });
                }
                user = await jwt.verify(token, process.env.SECRET_KEY);
            }
            const warehouseExist = await warehouseSchema.findOne({ name, user: user.user });
            if (warehouseExist) {
                return res
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: message.WAREHOUSE_ALREADY_EXISTS });
            }


            const warehouse = await warehouseSchema.create({ name, address, user: user.user });
            if (warehouse) {
                return res
                    .status(statusCode.HTTP_CODE.OK)
                    .json({ success: true, message: message.WAREHOUSE_ADDED_SUCCESSFULLY });
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
    getWarehouses: async (req, res) => {
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
            const warehouses = await warehouseSchema.find({user: user.user});
            if (warehouses.length > 0) {
                return res
                    .status(statusCode.HTTP_CODE.OK)
                    .json({ success: true, warehouses });
            }
            return res
                .status(statusCode.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: message.WAREHOUSE_NOT_FOUND });
        } catch (error) {
            return res
                .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    deleteWarehouse: async (req, res) => {
        try {
            const { _id } = req.params;
            if (!_id) {
                return res
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: message.FAILED });
            }
            const warehouse = await warehouseSchema.findOne({ _id });
            
            if (!warehouse) {
                return res
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success: true, message: message.WAREHOUSE_NOT_FOUND });
            }

            const deletedWarehouse = await warehouseSchema.deleteOne(warehouse);
            const deleteHistory = await historySchema.deleteMany({ warehouse: _id });
            const warehouseProducts = await warehouseProductSchema.find({ warehouse: _id });
            warehouseProducts.forEach(async (warehouseProduct) => {
                await productSchema.updateOne({ _id: warehouseProduct.product }, { $inc: { total_quantity: -warehouseProduct.quantity } });
            })
            await warehouseProductSchema.deleteMany({ warehouse: _id });
            if (deletedWarehouse && warehouseProducts && deleteHistory) {
                return res
                    .status(statusCode.HTTP_CODE.OK)
                    .json({ success: true, message: message.WAREHOUSE_DELETED_SUCCESSFULLY });
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

    updateWarehouse : async (req, res) => {
        try {
            const { _id, name, address } = req.body;
            const warehouse = await warehouseSchema.findOne({ _id });
            if (!warehouse) {
                return res
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: message.WAREHOUSE_NOT_FOUND });
            }
            warehouse.name = name;
            warehouse.address = address;
            const updatedWarehouse = await warehouse.save();
            if (updatedWarehouse) {
                return res
                    .status(statusCode.HTTP_CODE.OK)
                    .json({ success: true, message: message.WAREHOUSE_UPDATED_SUCCESSFULLY, warehouse: updatedWarehouse });
            }
            return res
                .status(statusCode.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: message.FAILED });
        }
        catch (error) {
            return res
                .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },

    getWarehouseById: async (req, res) => {
        try {
            const { _id } = req.params;
            const warehouse = await warehouseSchema.findOne({ _id });
            if (warehouse) {
                return res
                    .status(statusCode.HTTP_CODE.OK)
                    .json({ success: true, warehouse });
            }
            return res
                .status(statusCode.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: message.WAREHOUSE_NOT_FOUND });
        } catch (error) {
            return res
                .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    }
}
