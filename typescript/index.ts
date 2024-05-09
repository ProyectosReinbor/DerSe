import { Coordenadas } from "./motor/coordenadas";
import { Lienzo } from "./motor/lienzo";

window.addEventListener("load", () => {
    const canvas = new Lienzo(
        new Coordenadas(0, 0),
        24,
    );
    const game = new Game_ENGINE(canvas);
    game.start();
});