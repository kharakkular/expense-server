const express = require("express");

const config = require('./config');
const routes = require('./routes/expense');

const app = express();

// checking values of node and name supplied through terminal
console.log('Values of PORT, NODE_ENV and root directory are ', 
    {PORT: process.env.PORT, NODE_ENV: config.NODE_ENV, dirName: __dirname}
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-headers', 'Content-Type, Authorization');
    next();
});

app.use('/api', routes);

app.listen(config.PORT, config.HOST, () => {
    console.log(`Server is running on port http://localhost:${config.PORT}`);
});