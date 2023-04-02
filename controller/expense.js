exports.getExpenses = (req, res, next) => {
    console.log('Response from get expenses');
    res.status(200).json({
        expense: "All my expenses are shown below"
    });
}

exports.postExpense = (req, res, next) => {
    console.log('Response from post expense method', {body: req.body});
    const content = req.body.content;
    res.status(200).json({
        message: "Expense created successfully",
        expense: {id: new Date().toISOString(), content: content}
    });
}