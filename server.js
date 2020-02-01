/* eslint-disable no-console */
const express = require('express');
const app = express();
const port = 4000;
const server = app.listen(`${port}`, () => {
    console.log(`Server started on port ${port}`);
});
const io = require('socket.io')(server);

let counter = 5;

io.on('connection', socket => {
    console.log('\x1b[32m', `\nCONNECTING ${socket.id}`);

    /* Counter related listeners start */
    socket.on('counter:add', addCallback => {
        counter++;
        addCallback(counter);
    });

    socket.on('counter:actual', getCallback => {
        getCallback(counter);
    });

    socket.on('counter:stop', () => socket.disconnect());
    /* Counter related listeners end */

    /*/!* Orders related listeners start *!/
    socket.on('orders:get', getOrdersCallback => {
        getOrdersCallback(orders);
    });
    /!* Orders related listeners end *!/*/

    socket.on('disconnect', () => {
        console.log('\x1b[31m', `\nDISCONNECTING ${socket.id}`);
        socket.disconnect();
    });
});

module.exports = app;
