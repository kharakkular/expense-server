const express = require("express");
const mongoose = require('mongoose');

const config = require('./config');
const expenseRoutes = require('./routes/expense');

const app = express();

// checking values of node and name supplied through terminal
console.log('Values of PORT and root directory are ', {PORT: process.env.PORT, dirName: __dirname});
const URI = `mongodb+srv://${config.UserName}:${config.Password}@cluster0.x1tfvys.mongodb.net/expense?retryWrites=true&w=majority`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-headers', 'Content-Type, Authorization');
    next();
});

// Routes
app.use('/api', expenseRoutes);

// error handling
app.use((error, req, res, next) => {
    console.log("Error is ", {error});
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
});

console.log('URI is ', URI);

mongoose.connect(URI)
    .then(res => {
        // console.log('Response from Mongoose is ', {res: res});
        app.listen(config.PORT, config.HOST, () => {
            console.log(`Server is running on port ${config.HOST}:${config.PORT}`);
        });
    }).catch(err => console.log('Error while connecting to MongoDB', {err}));
