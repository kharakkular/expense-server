const env = require('dotenv');
const path = require('path');

env.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || '8083',
    UserName: process.env.name,
    Password: process.env.Password
};