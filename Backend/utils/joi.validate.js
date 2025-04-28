const Joi = require("joi")
const statusCode = require("./statusCode.json")

module.exports = {

    //user validation
    validate4login : (req, res, next) => {
        let schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })

        let { error } = schema.validate(req.body)
        if (error) {
            return res 
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success : false , message : error.details[0].message})
        }
        else{
            next();
        }
    },
    validate4register : (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        })
        let { error } = schema.validate(req.body)
        if (error) {
            return res 
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success : false , message : error.details[0].message})
        }
        else{
            next();
        }
    },

    //product validation
    validate4product : (req, res, next) => {
        let schema = Joi.object().keys({
            name: Joi.string().required(),
            actual_price: Joi.number().required(),
            selling_price: Joi.number().required(),
            productNo: Joi.string().required(),
            category: Joi.string().required(),
            description: Joi.string().required()
        })
        let { error } = schema.validate(req.body)
        if (error) {
            return res 
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success : false , message : error.details[0].message})
        }
        else{
            next();
        }
    },
    validate4updateProduct : (req, res, next) => {
        let schema = Joi.object().keys({
            _id: Joi.string().required(),
            name: Joi.string().required(),
            actual_price: Joi.number().required(),
            selling_price: Joi.number().required(),
            productNo: Joi.string().required(),
            category: Joi.string().required(),
            description: Joi.string().required()
        })
        let { error } = schema.validate(req.body)
        if (error) {
            return res 
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success : false , message : error.details[0].message})
        }
        else{
            next();
        }
    },

    //Warehouse product validation
    validate4warehouseProduct : (req, res, next) => {
        let schema = Joi.object().keys({
            product: Joi.string().required(),
            warehouse: Joi.string().required(),
            quantity: Joi.number().required(),
        })
        let { error } = schema.validate(req.body)
        if (error) {
            return res 
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success : false , message : error.details[0].message})
        }
        else{
            next();
        }
    },
    validate4updateWarehouseProduct : (req, res, next) => {
        let schema = Joi.object().keys({
            _id: Joi.string().required(),
            quantity: Joi.number().required(),
        })
        let { error } = schema.validate(req.body)
        if (error) {
            return res 
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success : false , message : error.details[0].message})
        }
        else{
            next();
        }
    },
    
    //common validation
    validate4delete : (req, res, next) => {
        let schema = Joi.object().keys({
            _id: Joi.string().required()
        })
        let { error } = schema.validate(req.body)
        if (error) {
            return res 
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success : false , message : error.details[0].message})
        }
        else{
            next();
        }
    },

}