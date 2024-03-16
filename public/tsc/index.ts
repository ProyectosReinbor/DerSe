
import { Canvas } from "./engine/canvas.js";
import { Coordinate } from "./engine/coordinate.js";
import { Game } from "./game/game.js";
// import { Tiktok } from "./tiktok.js";
window.addEventListener("load", () => {
    const canvas = new Canvas(new Coordinate, 24);
    const game = new Game(canvas);
    game.start();
    // Tiktok(
    //     gift => game.tiktokGift(gift),
    //     chat => game.tiktokChat(chat)
    // );
});