const express = require("express");
const app = express();
const port = 4000;
const server = app.listen(`${port}`, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started on port ${port}`);
});
const io = require("socket.io")(server);

let counter = 0;

io.on("connection", socket => {
    setInterval(() => {
        socket.broadcast.emit("newcounter", counter);
        counter++;
        console.log('Class: Connect, Function: on, Line 16 counter(1) => ', counter);
    }, 1000)
});

module.exports = app;
