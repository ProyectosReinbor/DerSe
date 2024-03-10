
import { Canvas } from "./engine.js";
import { Game } from "./scenes/game.js";

window.addEventListener("load", () => {
    const canvas = new Canvas(24, { x: 0, y: 0 });
    const game = new Game(canvas);
    game.start();
});