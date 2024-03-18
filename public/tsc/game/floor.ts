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
import { Trees } from "./floor/trees.js";
import { Position } from "../engine/position.js";

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
    trees: Trees;
    constructor(
        canvas: Canvas,
        map: Map,
    ) {
        this.canvas = canvas;
        this.map = map;
        this.water = new Water(this.map, this.canvas);
        this.foams = new Foams(this.map, this.canvas);
        this.flatsSand = new FlatsSand(this.map, this.canvas);
        this.elevations = new Elevations(this.map, this.canvas);
        this.flatsGrass = new FlatsGrass(this.map, this.canvas);
        this.shadows = new Shadows(this.map, this.canvas);
        this.wallElevations = new WallElevations(this.map, this.canvas);
        this.stairsElevation = new StairsElevations(this.map, this.canvas);
        this.flatElevations = new FlatElevations(this.map, this.canvas);
        this.castles = new Castles(this.map, this.canvas);
        this.trees = new Trees(this.map, this.canvas);
    }

    insideFloor(initial: Coordinate) {
        const flatSandInside = this.flatsSand.insideAnElements(initial);
        const elevationInside = this.elevations.insideAnElements(initial);
        const stairElevationInside = this.stairsElevation.insideAnElements(initial);
        return flatSandInside === true ||
            elevationInside === true ||
            stairElevationInside === true;
    }

    collision(initial: Coordinate, nextInitial: Coordinate) {
        const flatSandInside = this.flatsSand.insideAnElements(initial);
        const elevationInside = this.elevations.insideAnElements(initial);
        const wallElevationInside = this.wallElevations.insideAnElements(initial);
        const stairElevationInside = this.stairsElevation.insideAnElements(initial);
        const nextFlatSandInside = this.flatsSand.insideAnElements(nextInitial);
        const nextElevationInside = this.elevations.insideAnElements(nextInitial);
        const nextWallElevationInside = this.wallElevations.insideAnElements(nextInitial);
        const nextStairElevationInside = this.stairsElevation.insideAnElements(nextInitial);

        if (flatSandInside === true) {
            if (nextFlatSandInside === true) return false;
            if (nextElevationInside === true) return true;
            if (nextWallElevationInside === true) return true;
            if (nextStairElevationInside === true) return false;
        }
        if (elevationInside === true) {
            if (nextFlatSandInside === true) return true;
            if (nextElevationInside === true) return false;
            if (nextWallElevationInside === true) return true;
            if (nextStairElevationInside === true) return false;
        }
        if (wallElevationInside === true) throw new Error("inside wall elevation");
        if (stairElevationInside === true) {
            if (nextFlatSandInside === true) return false;
            if (nextElevationInside === true) return false;
            if (nextWallElevationInside === true) return true;
            if (nextStairElevationInside === true) return false;
        }

        throw new Error("no exits collision");
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

                if (box.trees !== false) {
                    this.trees.setTrees(
                        boxes,
                        box.trees.animation
                    );
                }
            });
        });
    }

    drawFloor() {
        this.water.drawWaters();
        this.foams.drawFoams();
        this.flatsSand.drawFlatsSand();
        this.shadows.drawShadows();
        this.stairsElevation.drawStairsElevations();
        this.elevations.drawElevations();
        this.flatsGrass.drawFlatsGrass();
        this.wallElevations.drawWallElevations();
        this.flatElevations.drawFlatElevations();
        this.castles.drawCastles();
        this.trees.drawTrees();
    }
}