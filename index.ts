// import { WebcastPushConnection } from 'tiktok-live-connector';

Bun.serve({
    port: 3000,
    async fetch(request) {
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