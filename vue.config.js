const server = require('./server');

module.exports = {
    devServer: {
        before: () => server
    }
};
