import { Juego } from "./juego/juego";
import { Lienzo } from "./motor/lienzo";

window.addEventListener("load", () => {
    const canvas = new Lienzo(
        new Coordenadas(0, 0),
        24,
    );
    const game = new Juego(canvas);
    game.start();
});