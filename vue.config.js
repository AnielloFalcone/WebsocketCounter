const server = require('./server/server');

module.exports = {
    devServer: {
        before: server
    }
};
