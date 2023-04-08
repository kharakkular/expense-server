const env = require('dotenv');
const path = require('path');

env.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'd-development',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || '8083',
    UserName: process.env.UserName,
    Password: process.env.Password
};