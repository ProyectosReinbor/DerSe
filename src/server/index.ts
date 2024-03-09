import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { WebcastPushConnection } from 'tiktok-live-connector';
import {
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData
} from './server.js';

const app = express();
const server = http.createServer(app);
const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(server);

app.use(express.static('public'));
app.use(express.static('dist'));

io.on('connection', (socket) => {
    console.log('A user connected!');

    socket.on('live', (username) => {
        const tiktokLiveConnection = new WebcastPushConnection(username);
        tiktokLiveConnection.connect()
            .then(state => {
                socket.emit('live', true);
            })
            .catch(err => {
                socket.emit('live', false);
            });
        tiktokLiveConnection.on('chat', (data) => {
            socket.emit('chat', data.message);
        });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected!');
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000!');
});
