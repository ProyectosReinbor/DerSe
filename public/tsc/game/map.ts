
import { Position } from "../engine/position.js";
import { Size } from "../engine/size.js";
import { Castles } from "./castles.js";
import { Elevations } from "./elevations.js";
import { FlatsSand } from "./flatsSand.js";
import { Foams } from "./foams.js";
import { Water } from "./water.js";
import { MapMatrix, type Box, MapMatrixLength } from "./mapMatrix.js";
import { WallElevations } from "./wallElevations.js";
import { StairsElevations } from "./stairsElevations.js";
import { Shadows } from "./shadows.js";
import { FlatElevations } from "./flatElevations.js";
import type { Canvas } from "../engine/canvas.js";
import { Coordinate } from "../engine/coordinate.js";
import { FlatsGrass } from "./flatsGrass.js";

export class Map extends Position {
    matrix: Box[][] = MapMatrix();
    boxes: Size;
    water: Water;
    foams: Foams;
    flatsSand: FlatsSand;

    shadows: Shadows;
    elevations: Elevations;
    flatsGrass: FlatsGrass;
    wallElevations: WallElevations;
    flatElevations: FlatElevations;
    stairsElevation: StairsElevations;

    secondShadows: Shadows;
    secondElevations: Elevations;
    secondFlatsGrass: FlatsGrass;
    secondWallElevations: WallElevations;
    secondFlatElevations: FlatElevations;
    secondStairsElevations: StairsElevations;

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
        this.flatsSand = new FlatsSand(
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
        this.flatsGrass = new FlatsGrass(
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
        );
        this.secondShadows = new Shadows(
            this.initial.x,
            this.initial.y,
            canvas,
            this
        );
        this.secondElevations = new Elevations(
            this.initial.x,
            this.initial.y,
            canvas,
            this
        );
        this.secondFlatsGrass = new FlatsGrass(
            this.initial.x,
            this.initial.y,
            canvas,
            this
        );
        this.secondWallElevations = new WallElevations(
            this.initial.x,
            this.initial.y,
            canvas,
            this,
        );
        this.secondFlatElevations = new FlatElevations(
            this.initial.x,
            this.initial.y,
            canvas,
            this,
        );
        this.secondStairsElevations = new StairsElevations(
            this.initial.x,
            this.initial.y,
            canvas,
            this,
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
                        this.flatsSand.setFlatSand(boxes);
                }

                if (box.elevation !== false) {
                    if (box.elevation.shadow === true)
                        this.shadows.setShadow(boxes);

                    if (box.elevation.flatGrass === true)
                        this.flatsGrass.setFlatGrass(boxes);

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

                    if (box.stairElevation.flatElevation !== false)
                        this.flatElevations.setFlatElevation(
                            boxes,
                            box.stairElevation.flatElevation
                        );
                }

                if (box.secondElevation !== false) {
                    if (box.secondElevation.shadow === true)
                        this.secondShadows.setShadow(boxes);

                    this.secondElevations.setElevation(boxes);
                    if (box.secondElevation.flatGrass === true)
                        this.secondFlatsGrass.setFlatGrass(boxes);
                }

                if (box.secondWallElevation !== false) {
                    if (box.secondWallElevation.shadow === true)
                        this.secondShadows.setShadow(boxes);

                    this.secondWallElevations.setWallElevations(boxes);
                    if (box.secondWallElevation.flatElevation !== false)
                        this.secondFlatElevations.setFlatElevation(
                            boxes,
                            box.secondWallElevation.flatElevation
                        );
                }

                if (box.secondStairElevation !== false) {
                    if (box.secondStairElevation.shadow === true)
                        this.secondShadows.setShadow(boxes);

                    this.secondStairsElevations.setStairsElevations(boxes);

                    if (box.secondStairElevation.flatElevation !== false)
                        this.secondFlatElevations.setFlatElevation(
                            boxes,
                            box.secondStairElevation.flatElevation
                        );
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
        await this.flatsSand.drawFlatsSand();

        await this.shadows.drawShadows();
        await this.elevations.drawElevations();
        await this.flatsGrass.drawFlatsGrass();

        await this.wallElevations.drawWallElevations();
        await this.stairsElevation.drawStairsElevations();
        await this.flatElevations.drawFlatElevations();

        await this.secondElevations.drawElevations();
        await this.secondFlatsGrass.drawFlatsGrass();

        await this.secondWallElevations.drawWallElevations();
        await this.secondStairsElevations.drawStairsElevations();
        await this.secondFlatElevations.drawFlatElevations();

        await this.castles.drawCastles();
    }
}   