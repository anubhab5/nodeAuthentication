const router = require('express').Router();
const mongoose = require('mongoose');
const { Product } = require("../model/product");
const auth = require("../middleware/auth");

router.get("/", async(req, res) => {
    const result = await Product.find();
    res.send(result);
});

router.post("/", auth, async(req, res) => {
    const prod = new Product({
        productName: req.body.productName,
        productPrice: req.body.productPrice
    });
    const result = await prod.save();
    res.send(result);
});


module.exports = router;