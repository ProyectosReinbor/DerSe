import { type Canvas } from "../engine/canvas.js";
import type { Map } from "./map.js";
import { Water } from "./floor/water.js";
import { Foams } from "./floor/foams.js";
import { FlatsSand } from "./floor/flatsSand.js";
import { Elevations } from "./floor/elevations.js";
import { FlatsGrass } from "./floor/flatsGrass.js";
import { Shadows } from "./floor/shadows.js";
import { WallElevations } from "./floor/wallElevations.js";
import { StairsElevations } from "./floor/stairsElevations.js";
import { FlatElevations } from "./floor/flatElevations.js";
import { Castles } from "./floor/castles.js";
import type { MapFloor } from "./mapMatrix.js";
import { Coordinate } from "../engine/coordinate.js";

export class Floor {
    canvas: Canvas;
    map: Map;
    water: Water;
    foams: Foams;
    flatsSand: FlatsSand;
    elevations: Elevations;
    flatsGrass: FlatsGrass;
    shadows: Shadows;
    wallElevations: WallElevations;
    stairsElevation: StairsElevations;
    flatElevations: FlatElevations;
    castles: Castles;
    constructor(
        canvas: Canvas,
        map: Map,
    ) {
        this.canvas = canvas;
        this.map = map;
        this.water = new Water(this.canvas, this.map);
        this.foams = new Foams(this.canvas, this.map);
        this.flatsSand = new FlatsSand(this.canvas, this.map);
        this.elevations = new Elevations(this.canvas, this.map);
        this.flatsGrass = new FlatsGrass(this.canvas, this.map);
        this.shadows = new Shadows(this.canvas, this.map);
        this.wallElevations = new WallElevations(this.canvas, this.map);
        this.stairsElevation = new StairsElevations(this.canvas, this.map);
        this.flatElevations = new FlatElevations(this.canvas, this.map);
        this.castles = new Castles(this.canvas, this.map);
    }

    setFloor(floor: MapFloor) {
        floor.forEach((row, y) => {
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

                if (box.castle !== false) {
                    this.castles.setCastle(
                        boxes,
                        box.castle.state,
                        box.castle.color,
                    );
                }
            });
        });
    }

    async drawFloor() {
        await this.water.drawWaters();
        await this.foams.drawFoams();
        await this.flatsSand.drawFlatsSand();
        await this.shadows.drawShadows();
        await this.stairsElevation.drawStairsElevations();
        await this.elevations.drawElevations();
        await this.flatsGrass.drawFlatsGrass();
        await this.wallElevations.drawWallElevations();
        await this.flatElevations.drawFlatElevations();
        await this.castles.drawCastles();
    }
}