import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { WebcastPushConnection } from 'tiktok-live-connector';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
app.use(express.static('src'));

io.on('connection', (socket) => {
    socket.on('live', (username) => {
        const tiktokLiveConnection = new WebcastPushConnection(username);
        tiktokLiveConnection.connect()
            .then(() => {
                socket.emit('live', true);
            })
            .catch(err => {
                console.error(err);
                socket.emit('live', false);
            });
        tiktokLiveConnection.on('chat', (data) => {
            socket.emit('chat', JSON.stringify(data));
        });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected!');
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000!');
});
