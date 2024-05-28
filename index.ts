const rutaBase = "public/";
const servidor = Bun.serve({
    port: 3000,
    async fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === "/") {
            const res = await Bun.build({
                entrypoints: ['./typescript/index.ts'],
                outdir: `./${rutaBase}/js`,
            });
            if (res.logs.length > 0) {
                console.log(res.logs);
            }
            return new Response(
                Bun.file(`${rutaBase}index.html`)
            );
        }
        return new Response(
            Bun.file(`${rutaBase}${url.pathname}`)
        );
    },
});
console.log(servidor.url.href);