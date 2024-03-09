import { Canvas, Scene } from "../engine.js";
import { Map } from "./map.js";
import { Pawn } from "./pawn.js";

export class Game extends Scene {

    map: Map;
    pawn: Pawn;

    constructor(canvas: Canvas) {
        super(canvas);
        this.map = new Map(this.canvas, 15, 15);
        this.pawn = new Pawn(
            {
                x: 5,
                y: 5,
            },
            this.map.boxes,
            this.canvas,
            "blue"
        );
    }

    draw(): void {
        this.map.drawMap();
        this.pawn.drawPawn();
    }
}