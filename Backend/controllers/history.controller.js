const statusCode = require('../utils/statusCode');
const message = require('../utils/message');
const jwt = require("jsonwebtoken");

const { historySchema } = require('../models');

module.exports = {
    getHistory: async (req, res) => {
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
            const history = await historySchema.find({user: user.user}).sort({ createdAt: -1 }).populate('warehouse').populate({path :'product'
            ,populate : {path : 'category'}
            });
            if (history.length > 0) {
                return res
                    .status(statusCode.HTTP_CODE.OK)
                    .json({ success: true, history });
            }
            return res
                .status(statusCode.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: message.HISTORY_NOT_FOUND });
        } catch (error) {
            return res
                .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    },
    deleteHistory: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res
                    .status(statusCode.HTTP_CODE.BAD_REQUEST)
                    .json({ success: false, message: message.FAILED });
            }
            const history = await historySchema.findByIdAndDelete(id);
            if (history) {
                return res
                    .status(statusCode.HTTP_CODE.OK)
                    .json({ success: true, message: message.HISTORY_DELETED_SUCCESSFULLY });
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
    generateReport: async (req, res) => {
        let { fromDate, toDate } = req.body;
        const isoFromDate = new Date(fromDate).toISOString(); 
        const isoToDate = new Date(toDate).setHours(23, 59, 59, 999); 
        const isoToDateFormatted = new Date(isoToDate).toISOString();
        /* fromDate = new Intl.DateTimeFormat('en-GB').format(fromDate);
        toDate = new Intl.DateTimeFormat('en-GB').format(toDate); */
        
        try{
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
            const history = await historySchema.find({ user : user.user, createdAt: { $gte: isoFromDate, $lte: isoToDateFormatted } }).populate('warehouse').populate({path :'product'
                ,populate : {path : 'category'}
                });

            if (history.length > 0) {
                const totalProfit = history.reduce((sum, report) => sum + (report.total_profit || 0), 0);
                return res
                    .status(statusCode.HTTP_CODE.OK)
                    .json({ success: true, history, totalProfit });
            }
            return res
                .status(statusCode.HTTP_CODE.BAD_REQUEST)
                .json({ success: false, message: message.HISTORY_NOT_FOUND });
        }
        catch (error) {
            return res
                .status(statusCode.HTTP_CODE.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: error.message });
        }
    }
};
