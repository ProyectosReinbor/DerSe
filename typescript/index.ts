import { Juego } from "./juego/juego";
import { Lienzo } from "./motor/lienzo";

window.addEventListener("load", () => {
    const canvas = new Lienzo(
        24,
        undefined,
        0, 0
    );
    const game = new Juego(canvas);
    game.start();
});