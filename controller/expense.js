const fs = require('node:fs/promises');

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

exports.getExpenseReceipt = async (req, res, next) => {
    console.log(`Barcode received is ${req.params.barcode}`);
    const barcodeReceived = req.params.barcode;
    try {
        const receipt = await Receipt.findOne({ barcode: barcodeReceived });
        console.log("Receipt value received is ", {receipt});

        if(receipt !== null) {
            const nameOfImage = receipt.imageName;
            
            const fileHandle = await fs.open(`./images/${nameOfImage}`);

            // create readStream
            const readStream = fileHandle.createReadStream();
            readStream.pipe(res);
        } else {
            return res.status(404).json({
                "message": `Image with barcode ${barcodeReceived} not found`
            });
        }
    } catch (error) {
        console.log('Error generated is ', {msg: error.message});
        return res.status(404).json({
            "error": `Error received ${error.message}`
        });
    }

    // res.status(200).json({ message: "Sent image"});
}

exports.postExpense = async (req, res, next) => {
    console.log({ file: req.file });

    console.log('-------------------');
    console.dir(req.body);
    const productsArr = JSON.parse(req.body.products);
    console.log('-------------------');
    console.dir(productsArr);
    const products = productsArr.map(p => {
        const item = {
            name: p.name,
            price: p.price,
            code: p.code
        };
        return item;
    });
    console.log({products});
    // check to see if the receipt is already defined
    // const filePresent = await fs.access(req.file.path);
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
                total: req.body.total,
                imageName: req.body.imageName
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
            fs.unlink(req.file.path).then(() => {
                console.log(`File with path "${req.file.path}" has been deleted`);
            }).catch(err => {
                console.log(`Error reported: "${err.message}"`);
            });
            res.status(409).json({
                message: "Receipt with barcode " + req.body.barcode + " already exists"
            });
        }
    } catch (error) {
        fs.unlink(req.file.path).then(() => {
            console.log(`File with path "${req.file.path}" has been deleted`);
        }).catch(err => {
            console.log(`Error reported: "${err.message}"`);
        });
        res.status(500).json({
            error: error.message,
            message: "error posting data in DB"
        });
    } 
}