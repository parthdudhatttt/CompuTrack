const statusCode = require('../utils/statusCode.json');
const message = require('../utils/message.json');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const {userSchema} = require('../models');

module.exports = {
    register: async (req, res) => {
        try {
            const { email, password, name } = req.body;
            const userExist = await userSchema.findOne({ email });
            if (userExist) {
                return res
                        .status(statusCode.HTTP_CODE.BAD_REQUEST)
                        .json({success: false, message: message.USER_ALREADY_EXISTS});
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await userSchema.create({ email, password: hashedPassword, name});

            if(user) {
                return res
                        .status(statusCode.HTTP_CODE.OK)
                        .json({success: true, message: message.USER_REGISTERED_SUCCESSFULLY});
            }
                return res
                        .status(statusCode.HTTP_CODE.BAD_REQUEST)
                        .json({success: false, message: message.FAILED});

        }catch (error) {
            return res
                    .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success: false, message: error.message});
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userSchema.findOne({ email });
            if (!user) {
                return res
                        .status(statusCode.HTTP_CODE.BAD_REQUEST)
                        .json({success: false, message: message.USER_NOT_FOUND});
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res
                        .status(statusCode.HTTP_CODE.BAD_REQUEST)
                        .json({success: false, message: message.INVALID_PASSWORD});
            }
            const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY,
                { expiresIn: "1d" });
            return res
                    .status(statusCode.HTTP_CODE.OK)
                    .json({success: true, message: message.LOGIN_SUCCESS, token});
        }catch (error) {
            return res
                    .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
                    .json({success: false, message: error.message});
        }
    }
}