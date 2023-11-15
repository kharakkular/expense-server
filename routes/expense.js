const express = require('express');

const expenseController = require('../controller/expense');
const upload = require('../middlewares/imageFilter');

const router = express.Router();

router.get('/expense', expenseController.getExpenses);
router.post('/expense', upload.single('imageFile') , expenseController.postExpense);

module.exports = router;