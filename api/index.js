const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")
const ekipaRoute = require("./routes/ekipa")
const ligaRoute = require("./routes/liga")

// add cors () add stripeRoute


dotenv.config()

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connection successful"))
    .catch((err) => {
        console.log(err);
    })
// then nese o successful write the function up
    //rest apis endpoints
    // app.get("/api/test", ()=>{
    //     console.log("test is successful");
    // })
    app.use(express.json())
    app.use(cors())
    app.use("/api/users", userRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/products", productRoute);
    app.use("/api/carts", cartRoute);
    app.use("/api/orders", orderRoute);
    app.use("/api/checkout", stripeRoute)
    app.use("/api/ekipa", ekipaRoute)
    app.use("/api/liga", ligaRoute)

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running");
})
