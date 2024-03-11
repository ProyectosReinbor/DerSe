
import { Canvas } from "./engine/canvas.js";
import { Game } from "./game/game.js";
import { Tiktok } from "./tiktok.js";

window.addEventListener("load", () => {
    // const tiktok = new Tiktok("edwin_lider");
    const canvas = new Canvas(24, 0, 0);
    const game = new Game(canvas);
    game.start();
});