const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const productSchema = new Schema({
//     name: String,
//     price: Number,
//     code: String,
// });

const receiptSchema = new Schema({
    barcode: String,
    store: String,
    location: String,
    products: [{
        name: {type: String, required: [true, 'A Name is required']},
        price: {type: Number, required: [true, 'A Price is required']},
        code: {type: String, required: [true, 'A Code is required']}
    }],
    datePurchased: { type: Date, default: Date.now },
    total: {type: Number, required: [true, 'Total value of Receipt is missing']},
    imageName: String
});

// module.exports = {
//     Product: mongoose.model("Product", productSchema),
//     Receipt: mongoose.model("Receipt", receiptSchema)
// };
module.exports = mongoose.model('Receipt', receiptSchema);