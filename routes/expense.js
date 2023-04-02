const express = require('express');

const expenseController = require('../controller/expense');

const router = express.Router();

router.get('/expense', expenseController.getExpenses);
router.post('/expense', expenseController.postExpense);

module.exports = router;
