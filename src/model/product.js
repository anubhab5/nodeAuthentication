const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        minlength: 1,
        maxlength: 255
    },
    productPrice: {
        type: Number,
        min: 0,
        max: 99
    }
});

const Product = mongoose.model("product", productSchema);

module.exports = {
    Product: Product
}