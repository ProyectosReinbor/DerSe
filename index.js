import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { WebcastPushConnection } from 'tiktok-live-connector';

console.log("Write a tiktok username live:");
process.openStdin().on('data', async (username) => {
    process.stdin.removeAllListeners();

    // const tiktokLiveConnection = new WebcastPushConnection(username.toString());
    // const connect = await tiktokLiveConnection.connect();

    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);

    app.use(express.static('public'));
    app.use(express.static('src'));

    io.on('connection', (socket) => {
        // if (connect.isConnected !== true) {
        //     throw new Error("tiktok live is not connected");
        // }

        // tiktokLiveConnection.on('gift', data => {
        //     socket.emit('gift', JSON.stringify(data));
        // });
        // tiktokLiveConnection.on('chat', data => {
        //     socket.emit('chat', JSON.stringify(data));
        // });

        // socket.on('disconnect', () => {
        //     console.log('A user disconnected!');
        // });
    });

    server.listen(3000, () => {
        console.log('Server listening on port 3000!');
    });
});