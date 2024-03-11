
import { Canvas, Position } from "../engine.js";
import { Size } from "../engine/size.js";
import { Castles } from "./castles.js";
import { Elevations } from "./elevations.js";
import { FlatsYellow } from "./flatsYellow.js";
import { Foams } from "./foams.js";
import { Water } from "./water.js";

export class Map extends Position {
    constructor(
        canvas,
        lengthHorizontal,
        lengthVertical,
    ) {
        super(
            0,
            0,
            100,
            100
        );
        this.boxes = new Size(
            this.size.width / lengthHorizontal,
            this.size.height / lengthVertical,
        )
        this.water = new Water(
            this.initial.x,
            this.initial.y,
            canvas,
            this.boxes
        );
        this.foams = new Foams(
            this.initial.x,
            this.initial.y,
            canvas,
            this.boxes
        );
        this.flatsYellow = new FlatsYellow(
            this.initial.x,
            this.initial.y,
            canvas,
            this.boxes,
            this.foams
        );
        this.elevations = new Elevations(
            this.initial.x,
            this.initial.y,
            canvas,
            this.boxes
        );
        this.castles = new Castles(
            this.initial.x,
            this.initial.y,
            canvas,
            this.boxes
        );
    }

    drawMap() {
        this.water.drawWaters();
        this.foams.drawFoams();
        this.flatsYellow.drawFlatsYellow();
        this.elevations.drawElevations();
        this.castles.drawCastles();
    }
}   