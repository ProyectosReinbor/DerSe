import type { Canvas } from "../../engine/canvas";
import { Castles } from "./castles";
import { Elevations } from "./elevations";
import { FlatElevations } from "./flatElevations";
import { FlatsGrass } from "./flatsGrass";
import { Shadows } from "./shadows";
import { StairsElevations } from "./stairsElevations";
import { Trees } from "./trees";
import { WallElevations } from "./wallElevations";
import type { Map } from "../map";
import type { MapFloorMatrix } from "../mapMatrix";
import { Coordinate } from "../../engine/coordinate";
import type { Character } from "../../engine/character";
import { Water } from "./water";
import { Foams } from "./foams";
import { FlatsSand } from "./flatsSand";

export class Floor {
    map: Map;
    canvas: Canvas;

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
        map: Map,
        canvas: Canvas,
    }) {
        this.map = props.map;
        this.canvas = props.canvas;

        this.water = new Water({
            map: this.map,
            canvas: this.canvas
        });

        this.foams = new Foams({
            map: this.map,
            canvas: this.canvas
        });

        this.flatsSand = new FlatsSand({
            map: this.map,
            canvas: this.canvas
        })

        this.elevations = new Elevations({
            map: this.map,
            canvas: this.canvas,
        });

        this.flatsGrass = new FlatsGrass({
            map: this.map,
            canvas: this.canvas,
        });

        this.shadows = new Shadows({
            map: this.map,
            canvas: this.canvas,
        });

        this.wallElevations = new WallElevations({
            map: this.map,
            canvas: this.canvas,
        });

        this.stairsElevation = new StairsElevations({
            map: this.map,
            canvas: this.canvas,
        });

        this.flatElevations = new FlatElevations({
            map: this.map,
            canvas: this.canvas,
        });

        this.castles = new Castles({
            map: this.map,
            canvas: this.canvas,
        });

        this.trees = new Trees({
            map: this.map,
            canvas: this.canvas,
        });
    }

    pushFloor(matrix: MapFloorMatrix) {
        matrix.forEach((row, y) => {
            row.forEach((box, x) => {
                const indicesBox = new Coordinate({ x, y });

                if (box.water === true)
                    this.water.pushWater(indicesBox);

                if (box.foam !== false) {
                    this.foams.pushFoam(indicesBox);
                    if (box.foam.flatSand === true)
                        this.flatsSand.pushFlatSand(indicesBox);
                }

                if (box.elevation !== false) {
                    if (box.elevation.shadow === true)
                        this.shadows.pushShadow(indicesBox);

                    if (box.elevation.flatGrass === true)
                        this.flatsGrass.pushFlatGrass(indicesBox);

                    this.elevations.pushElevation(indicesBox);
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

    aboveFloor(character: Character): boolean {
        const flatSand = this.flatsSand.collision(character) !== false;
        const elevations = this.elevations.collision(character) !== false;
        const stairsElevations = this.stairsElevation.collision(character) !== false;

        if (flatSand === true)
            return true;

        if (elevations === true)
            return true;

        if (stairsElevations === true)
            return true;

        return false;
    }

    collisionFloor(character: Character, movedCharacter: Character): boolean {
        const flatSand = this.flatsSand.collision(character) !== false;
        const elevations = this.elevations.collision(character) !== false;
        const wallElevations = this.wallElevations.collision(character) !== false;
        const stairsElevations = this.stairsElevation.collision(character) !== false;

        const nextFlatSand = this.flatsSand.collision(movedCharacter) !== false;
        const nextElevations = this.elevations.collision(movedCharacter) !== false;
        const nextWallElevations = this.wallElevations.collision(movedCharacter) !== false;
        const nextStairsElevations = this.stairsElevation.collision(movedCharacter) !== false;

        if (flatSand === true) {
            if (nextFlatSand === true)
                return false;

            if (nextElevations === true)
                return true;

            if (nextWallElevations === true)
                return true;

            if (nextStairsElevations === true)
                return false;
            return true;
        }

        if (elevations === true) {
            if (nextElevations === true) {
                return false;
            }

            if (nextWallElevations === true)
                return true;

            if (nextStairsElevations === true)
                return false;

            return true;
        }
        if (wallElevations === true) {
            return true;
        }
        else if (stairsElevations === true) {

            if (nextElevations === true)
                return false;

            if (nextWallElevations === true)
                return true;

            if (nextStairsElevations === true)
                return false;

            return true;
        }

        return true;
    }

    drawMap() {
        this.water.drawWater();
        this.foams.drawFoams();
        this.flatsSand.drawFlatsSand();
        this.shadows.drawShadows();
        this.elevations.drawElevations();
        this.wallElevations.drawWallElevations();
        this.flatsGrass.drawFlatsGrass();
        this.stairsElevation.drawStairsElevations();
        this.flatElevations.drawFlatElevations();
        this.castles.drawCastles();
        this.trees.drawTrees();
    }
}