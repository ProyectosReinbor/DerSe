// import { WebcastPushConnection } from 'tiktok-live-connector';

Bun.serve({
    port: 3000,
    async fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === "/") {
            const res = await Bun.build({
                entrypoints: ['./public/tsc/index.ts'],
                outdir: './public/js',
            });
            if(res.logs.length > 0) {
                console.log(res.logs);
            }
            return new Response(
                Bun.file(`public/index.html`)
            );
        }
        return new Response(
            Bun.file(`public${url.pathname}`)
        );
    },
});