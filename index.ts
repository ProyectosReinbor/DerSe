import express from 'express';
import { WebcastPushConnection } from 'tiktok-live-connector';

await Bun.build({
    entrypoints: ['./public/tsc/index.ts'],
    outdir: './public/js',
});

const app = express();
const port = 3000;
app.use(express.static("public"));
app.listen(port, () => console.log("Listen on port: ", port));

// const tiktokLiveConnection = new WebcastPushConnection(username.toString());
// const connect = await tiktokLiveConnection.connect();

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