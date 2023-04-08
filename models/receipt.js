const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const productSchema = new Schema({
//     name: String,
//     price: Number,
//     code: String,
// });

const receiptSchema = new Schema({
    barcode: String,
    location: String,
    products: [{
        name: {type: String, required: true},
        price: {type: Number, required: true},
        code: {type: String, required: true}
    }],
    datePurchased: { type: Date, default: Date.now }
});

// module.exports = {
//     Product: mongoose.model("Product", productSchema),
//     Receipt: mongoose.model("Receipt", receiptSchema)
// };
module.exports = mongoose.model('Receipt', receiptSchema);