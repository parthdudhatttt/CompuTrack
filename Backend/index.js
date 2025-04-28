const express = require("express")
const app = express()
const Cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config()
require("./database")
const PORT = process.env.PORT || 3000;

const { userRoutes, categoryRoutes, warehouseRoutes, productRoutes, warehouseProductRoutes, historyRoutes } = require("./routes")


app.use(Cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/api/user",userRoutes)
app.use("/api/category",categoryRoutes)
app.use("/api/warehouse",warehouseRoutes)
app.use("/api/product",productRoutes)
app.use("/api/warehouseProduct",warehouseProductRoutes)
app.use("/api/history",historyRoutes)

app.listen(PORT, () => {
    console.log(`server is Started on ${PORT} !!`)
})