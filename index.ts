import { WebcastPushConnection } from 'tiktok-live-connector';

Bun.serve({
    port: 3000,
    async fetch(request, response) {
        const url = new URL(request.url);
        if (url.pathname === "/") {
            await Bun.build({
                entrypoints: ['./public/tsc/index.ts'],
                outdir: './public/js',
            });
            return new Response(
                Bun.file(`public/index.html`)
            );
        }
        return new Response(
            Bun.file(`public${url.pathname}`)
        );
    },
});

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