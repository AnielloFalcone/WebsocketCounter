/* eslint-disable no-console */
const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {
    httpServer = http.createServer();
    httpServerAddr = httpServer.listen().address();
    ioServer = ioBack(httpServer);
    done();
});

/**
 *  Cleanup WS & HTTP servers
 */
afterAll((done) => {
    if (ioServer) {
        ioServer.close();
    }

    httpServer.close();
    done();
});

beforeEach((done) => {
    socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
        'reconnection delay': 0,
        'reopen delay': 0,
        'force new connection': true,
        transports: ['polling', 'websocket'],
    });

    socket.on('connect', () => {
        done();
    });
});

afterEach((done) => {
    if (socket.connected) {
        socket.disconnect();
    }
    done();
});


describe('Server NodeJs Socket.io tests', () => {
    test('should communicate', (done) => {
        // once connected, emit Hello World
        ioServer.emit('echo', 'Hello World');
        socket.once('echo', (message) => {
            // Check that the message matches
            expect(message).toBe('Hello World');
            done();
        });

        ioServer.on('connection', (mySocket) => {
            expect(mySocket).toBeDefined();
        });
    });

    test('should send back a counter', (done) => {
        socket.emit('counter:get', (counter) => {
            expect(counter).toBeDefined();
        });

        done();
    });
});
