import { Coordinate, type Canvas } from "../engine/exports";
import type { Map } from "./map.js";
import {
    Water,
    Foams,
    FlatsSand,
    Elevations,
    FlatsGrass,
    Shadows,
    WallElevations,
    StairsElevations,
    FlatElevations,
    Castles,
} from "./floor/exports.js";
import type { MapFloor } from "./mapMatrix.js";
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
        this.water = new Water(0, 0, this.canvas, this.map);
        this.foams = new Foams(0, 0, this.canvas, this.map);
        this.flatsSand = new FlatsSand(0, 0, this.canvas, this.map);
        this.elevations = new Elevations(0, 0, this.canvas, this.map);
        this.flatsGrass = new FlatsGrass(0, 0, this.canvas, this.map);
        this.shadows = new Shadows(0, 0, this.canvas, this.map);
        this.wallElevations = new WallElevations(0, 0, this.canvas, this.map);
        this.stairsElevation = new StairsElevations(0, 0, this.canvas, this.map);
        this.flatElevations = new FlatElevations(0, 0, this.canvas, this.map);
        this.castles = new Castles(0, 0, this.canvas, this.map);
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
                        box.castle.color,
                        box.castle.state
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
        await this.elevations.drawElevations();
        await this.flatsGrass.drawFlatsGrass();
        await this.wallElevations.drawWallElevations();
        await this.stairsElevation.drawStairsElevations();
        await this.flatElevations.drawFlatElevations();
        await this.castles.drawCastles();
    }
}