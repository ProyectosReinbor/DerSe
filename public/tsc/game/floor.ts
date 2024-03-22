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

export class Floor {
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
    constructor(props: {
        canvas: Canvas,
        map: Map,
    }) {
        this.water = new Water({
            map: props.map,
            canvas: props.canvas
        });
        this.foams = new Foams({
            map: props.map,
            canvas: props.canvas
        });
        this.flatsSand = new FlatsSand({
            map: props.map,
            canvas: props.canvas
        });
        this.elevations = new Elevations({
            map: props.map,
            canvas: props.canvas
        });
        this.flatsGrass = new FlatsGrass({
            map: props.map,
            canvas: props.canvas
        });
        this.shadows = new Shadows({
            map: props.map,
            canvas: props.canvas
        });
        this.wallElevations = new WallElevations({
            map: props.map,
            canvas: props.canvas
        });
        this.stairsElevation = new StairsElevations({
            map: props.map,
            canvas: props.canvas
        });
        this.flatElevations = new FlatElevations({
            map: props.map,
            canvas: props.canvas
        });
        this.castles = new Castles({
            map: props.map,
            canvas: props.canvas
        });
        this.trees = new Trees({
            map: props.map,
            canvas: props.canvas
        });
    }

    pushFloor(floor: MapFloor) {
        floor.forEach((row, y) => {
            row.forEach((box, x) => {
                const indicesBox = new Coordinate({ x, y });
                if (box.water === true)
                    this.water.pushWater(indicesBox);

                if (box.foam !== false) {
                    this.foams.pushFoam(indicesBox);
                    if (box.foam.flatSand === true)
                        this.flatsSand.setFlatSand(indicesBox);
                }

                if (box.elevation !== false) {
                    if (box.elevation.shadow === true)
                        this.shadows.pushShadow(indicesBox);

                    if (box.elevation.flatGrass === true)
                        this.flatsGrass.pushFlatGrass(indicesBox);

                    this.elevations.setElevation(indicesBox);
                }

                if (box.wallElevation !== false) {
                    if (box.wallElevation.shadow === true)
                        this.shadows.pushShadow(indicesBox);

                    this.wallElevations.pushWallElevation(indicesBox);
                    if (box.wallElevation.flatElevation !== false)
                        this.flatElevations.setFlatElevation(
                            indicesBox,
                            box.wallElevation.flatElevation
                        );
                }

                if (box.stairElevation !== false) {
                    if (box.stairElevation.shadow === true)
                        this.shadows.pushShadow(indicesBox);

                    this.stairsElevation.setStairsElevations(indicesBox);

                    if (box.stairElevation.flatElevation !== false)
                        this.flatElevations.setFlatElevation(
                            indicesBox,
                            box.stairElevation.flatElevation
                        );
                }

                if (box.castle !== false) {
                    this.castles.castlePush(
                        indicesBox,
                        box.castle.state,
                        box.castle.color,
                    );
                }

                if (box.trees !== false) {
                    this.trees.pushTree(
                        indicesBox,
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