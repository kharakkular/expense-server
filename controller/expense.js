const Receipt = require('../models/receipt');

exports.getExpenses = async (req, res, next) => {
    try {
        // const receiptsCount = await Receipt.count();
        const receipts = await Receipt.find();
        console.log('Response from get expenses ', {receipts});
        res.status(200).json({
            expenses: receipts
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "error retrieving data in DB"
        });
    }
}

exports.postExpense = async (req, res, next) => {
    console.log({body: req.body });
    const products = req.body.products.map(p => {
        const item = {
            name: p.name,
            price: p.price,
            code: p.code
        };
        return item;
    });
    console.log({products});
    // check to see if the receipt is already defined
    try {
        
        const prevReceipt = await Receipt.findOne({barcode: req.body.barcode});
        
        console.log("value of prevReceipt", {prevReceipt});
        if(prevReceipt === null) {
            const receipt1 = new Receipt({
                barcode: req.body.barcode,
                store: req.body.store,
                location: req.body.location,
                datePurchased: req.body.datePurchased,
                products: [...products],
                total: req.body.total
            });
            // console.log('Response from post expense method', {receipt1, p: receipt1.products});
            console.log('New Product has been added');
            receipt1.save()
                .then(result => {
                    console.log('response from db is ', {result})
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log('error is', {err});
                    res.status(400).json({
                        error: err.message,
                        message: "Bad request"
                    });
                });
        }
        else {
            res.status(409).json({
                message: "Receipt with barcode " + req.body.barcode + " already exists"
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "error posting data in DB"
        });
    } 
}