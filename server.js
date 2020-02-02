/* eslint-disable no-console */
const express = require('express');
const app = express();
const port = 4000;
const server = app.listen(process.env.PORT || port, () => {
    console.log(`Server started on port ${port}`);
});
const io = require('socket.io')(server, {
    path: '/server/socket.io',
    transports: ["polling", "websocket"],
});

let counter = 5;
let interval;

/**
 * Increasing counter and sending it back to the client
 * @Params: socket, the socket instance.
 **/
const increaseCounter = (socket) => {
    interval = setInterval(() => {
        counter += Math.floor(Math.random() * 5) + 1;
        socket.emit('counter:update', counter);
    }, 5 * 1000);
};

/**
 * Register for `counter:get` listener and return the counter through the callback
 * @param socket: the socket connection instance
 */
const getCounterListener = (socket) => {
    socket.on('counter:get', getCallback => {
        getCallback(counter);
    });
};

/**
 * Register for disconnect listener. Closes the socket connection and clears the increase counter interval
 * @param socket: the socket connection instance
 */
const disconnectListener = (socket) => {
    socket.on('disconnect', () => {
        console.log('\x1b[31m%s\x1b[0m', `\nDISCONNECTING ${socket.id}`);
        clearInterval(interval);
        socket.disconnect();
    });
};

/**
 * Register ioServer connection listener and register listeners on the created socket instance
 */
io.on('connection', socket => {
    console.log('\x1b[32m%s\x1b[0m', `\nCONNECTING ${socket.id}`);

    increaseCounter(socket);
    getCounterListener(socket);
    disconnectListener(socket);
});

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req,res) {
    res.sendFile('index.html');
});

module.exports = app;
