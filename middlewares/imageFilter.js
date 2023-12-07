const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // console.log(`Image file is ${req.file}`);
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        const nameOfFile = Date.now() + '-' + file.fieldname;
        req.body.imageName = nameOfFile + '-' + file.originalname;
        cb(null, nameOfFile + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

module.exports = upload;
