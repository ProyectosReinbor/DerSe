
import { Canvas_ENGINE } from "./engine/canvas.js";
import { Coordinate_ENGINE } from "./engine/coordinate.js";
import { Game_ENGINE } from "./game/game.js";

window.addEventListener("load", () => {
    const canvas = new Canvas_ENGINE(
        new Coordinate_ENGINE(0, 0),
        24,
    );
    const game = new Game_ENGINE(canvas);
    game.start();
});