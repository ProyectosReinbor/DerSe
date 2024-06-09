import { Juego } from "./juego/juego";
import { Lienzo } from "./motor/lienzo";

window.addEventListener("load", () => {
    const lienzo = new Lienzo(
        24,
        undefined,
        0, 0
    );
    const juego = new Juego(lienzo);
    juego.start();
});