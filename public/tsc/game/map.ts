
import { Position } from "../engine/position.js";
import { Size } from "../engine/size.js";
import { Castles } from "./castles.js";
import { Elevations } from "./elevations.js";
import { FlatsYellow } from "./flatsYellow.js";
import { Foams } from "./foams.js";
import { Water } from "./water.js";
import { MapMatrix, type Box, MapMatrixLength } from "./mapMatrix.js";
import { WallElevations } from "./wallElevations.js";
import { StairsElevations } from "./stairsElevations.js";
import { Shadows } from "./shadows.js";
import { FlatElevations } from "./flatElevations.js";
import type { Canvas } from "../engine/canvas.js";
import { Coordinate } from "../engine/coordinate.js";

export class Map extends Position {
    matrix: Box[][] = MapMatrix();
    boxes: Size;
    water: Water;
    foams: Foams;
    flatsYellow: FlatsYellow;
    shadows: Shadows;
    elevations: Elevations;
    wallElevations: WallElevations;
    flatElevations: FlatElevations;
    stairsElevation: StairsElevations;
    castles: Castles;
    constructor(canvas: Canvas) {
        super(new Coordinate, new Size(100, 100));
        this.boxes = new Size(
            this.size.width / MapMatrixLength.horizontal,
            this.size.height / MapMatrixLength.vertical,
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
        this.shadows = new Shadows(
            this.initial.x,
            this.initial.y,
            canvas,
            this
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
        this.flatElevations = new FlatElevations(
            this.initial.x,
            this.initial.y,
            canvas,
            this,
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
                const boxes = new Coordinate(x, y);
                if (box.water === true)
                    this.water.setWater(boxes);

                if (box.foam !== false) {
                    this.foams.setFoam(boxes);
                    if (box.foam.flatSand === true)
                        this.flatsYellow.setFlat(boxes);
                }

                if (box.elevation !== false) {
                    if (box.elevation.shadow === true)
                        this.shadows.setShadow(boxes);

                    // if (box.elevation.flatGrass === true)
                    //     this.flatsGrass.setFlat(boxes);

                    this.elevations.setElevation(boxes);
                }

                if (box.wallElevation !== false) {
                    if (box.wallElevation.shadow === true)
                        this.shadows.setShadow(boxes);

                    this.wallElevations.setWallElevations(boxes);
                    if (box.wallElevation.flatElevation !== false)
                        this.flatElevations.setFlatElevation(
                            boxes,
                            box.wallElevation.flatElevation
                        );
                }

                if (box.stairElevation !== false) {
                    if (box.stairElevation.shadow === true)
                        this.shadows.setShadow(boxes);
                    this.stairsElevation.setStairsElevations(boxes);
                }

                if (box.castle !== false) {
                    this.castles.setCastle(
                        boxes,
                        box.castle.color,
                        box.castle.state
                    );
                }
            });
        });
    }

    async drawMap() {
        await this.water.drawWaters();
        await this.foams.drawFoams();
        await this.flatsYellow.drawFlatsYellow();
        await this.shadows.drawShadows();
        await this.elevations.drawElevations();
        await this.stairsElevation.drawStairsElevations();
        await this.wallElevations.drawWallElevations();
        await this.castles.drawCastles();
    }
}   