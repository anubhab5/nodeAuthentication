const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route');

mongoose
    .connect("mongodb://localhost/authenticateauthorize", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((resp) => console.log("Connected Successfully"))
    .catch((err) => console.log(err));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("WELCOME ");
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);


app.listen(4000, () => {
    console.log(`Server started on port 4000`);
});