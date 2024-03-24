
import { Canvas_ENGINE } from "./engine/canvas.js";
import { Coordinate_ENGINE } from "./engine/coordinate.js";
import { Game } from "./game/game.js";

window.addEventListener("load", () => {
    const canvas = new Canvas_ENGINE({
        leftUp: new Coordinate_ENGINE({ x: 0, y: 0 }),
        framesPerSecond: 24
    });
    const game = new Game({ canvas });
    game.start();
});