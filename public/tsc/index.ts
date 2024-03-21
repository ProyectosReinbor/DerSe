
import { Canvas } from "./engine/canvas.js";
import { Coordinate } from "./engine/coordinate.js";
import { Game } from "./game/game.js";

window.addEventListener("load", () => {
    const canvas = new Canvas({
        initial: new Coordinate({ x: 0, y: 0 }),
        framesPerSecond: 24
    });
    const game = new Game({ canvas });
    game.start();
});