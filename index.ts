Bun.serve({
    port: 3000,
    async fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === "/") {
            const res = await Bun.build({
                entrypoints: ['./typescript/index.ts'],
                outdir: './js',
            });
            if (res.logs.length > 0) {
                console.log(res.logs);
            }
            return new Response(
                Bun.file(`/index.html`)
            );
        }
        return new Response(
            Bun.file(`${url.pathname}`)
        );
    },
});