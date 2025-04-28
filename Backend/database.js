const mongoose = require('mongoose')

//create connection to mongoDB database server
// const db = mongoose.connect("mongodb+srv://parthdudhatttt666:p!rTh_666@inventory-management.6omjegn.mongodb.net/CompuTrack")
const db = mongoose.connect(process.env.MONGODB_KEY)

module.exports = db