import { Scene } from "../engine/scene.js";
import { Map } from "./map.js";
import { Pawn } from "./pawn.js";

export class Game extends Scene {
    constructor(canvas) {
        super(canvas);
        this.map = new Map(this.canvas, 15, 15);
        this.pawn = new Pawn(
            5,
            5,
            this.map.boxes.width,
            this.map.boxes.height,
            this.canvas,
            0
        );
    }

    draw() {
        this.map.drawMap();
        this.pawn.drawPawn();
    }
}