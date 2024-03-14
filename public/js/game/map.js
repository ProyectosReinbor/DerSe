
import { Position } from "../engine/position.js";
import { Size } from "../engine/size.js";
import { Castles } from "./castles.js";
import { Elevations } from "./elevations.js";
import { FlatsYellow } from "./flatsYellow.js";
import { Foams } from "./foams.js";
import { Water } from "./water.js";
import { MapMatrix } from "./mapMatrix.js";
import { WallElevations } from "./wallElevations.js";
import { StairsElevations } from "./stairsElevations.js";

export class Map extends Position {
    constructor(canvas) {
        super(
            0,
            0,
            100,
            100
        );
        this.matrix = MapMatrix();
        this.boxes = new Size(
            this.size.width / this.matrix[0].length,
            this.size.height / this.matrix.length,
        )
        this.water = new Water(
            this.initial.x,
            this.initial.y,
            canvas,
            this
        );
        this.foams = new Foams(
            this.initial.x,
            this.initial.y,
            canvas,
            this
        );
        this.flatsYellow = new FlatsYellow(
            this.initial.x,
            this.initial.y,
            canvas,
            this,
        );
        this.elevations = new Elevations(
            this.initial.x,
            this.initial.y,
            canvas,
            this
        );
        this.wallElevations = new WallElevations(
            this.initial.x,
            this.initial.y,
            canvas,
            this,
            this.elevations
        );
        this.stairsElevation = new StairsElevations(
            this.initial.x,
            this.initial.y,
            canvas,
            this,
            this.elevations
        );
        this.castles = new Castles(
            this.initial.x,
            this.initial.y,
            canvas,
            this
        );

        this.matrix.forEach((row, y) => {
            row.forEach((box, x) => {
                box.forEach((parameters) => {
                    const { layer } = parameters;
                    if (layer === "water")
                        this.water.setWater(x, y);

                    if (layer === "foam")
                        this.foams.setFoam(x, y);

                    if (layer === "flatYellow")
                        this.flatsYellow.setFlat(x, y);

                    if (layer === "elevation")
                        this.elevations.setElevation(x, y);

                    if (layer === "wallElevation") {
                        this.wallElevations.setWallElevations(x, y);
                    }

                    if (layer === "stairElevation")
                        this.stairsElevation.setStairsElevations(x, y);

                    if (layer === "castle") {
                        const { color, state } = parameters;
                        this.castles.setCastle(x, y, color, state);
                    }
                });
            });
        });
    }

    async drawMap() {
        await this.water.drawWaters();
        await this.foams.drawFoams();
        await this.flatsYellow.drawFlatsYellow();
        await this.elevations.drawElevations();
        await this.stairsElevation.drawStairsElevations();
        await this.wallElevations.drawWallElevations();
        await this.castles.drawCastles();
    }
}   