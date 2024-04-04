import type { FloorMatrix_MapMatrix } from "../mapMatrix";
import type { Map_ENGINE } from "../map";
import type { Canvas_ENGINE } from "../../engine/canvas";
import { Plane_ENGINE } from "../../engine/plane";
import { FlatsSand_ENGINE } from "./flatsSand";
import { Elevations_ENGINE } from "./elevations";
import { WallElevations_ENGINE } from "./wallElevations";
import { Castles_ENGINE } from "./castles";
import { Water_ENGINE } from "./water";
import { Foams_ENGINE } from "./foams";
import { FlatsGrass_ENGINE } from "./flatsGrass";
import { Shadows_ENGINE } from "./shadows";
import { StairsElevations_ENGINE } from "./stairsElevations";
import { FlatElevations_ENGINE } from "./flatElevations";
import { Trees_ENGINE } from "./trees";
import { Coordinate_ENGINE } from "../../engine/coordinate";
import { Direction_ENGINE } from "../../engine/character/direction";

export class Floor_ENGINE {

    map: Map_ENGINE;
    canvas: Canvas_ENGINE;
    water: Water_ENGINE;
    foams: Foams_ENGINE;
    flatsSand: FlatsSand_ENGINE;
    elevations: Elevations_ENGINE;
    flatsGrass: FlatsGrass_ENGINE;
    shadows: Shadows_ENGINE;
    wallElevations: WallElevations_ENGINE;
    stairsElevation: StairsElevations_ENGINE;
    flatElevations: FlatElevations_ENGINE;
    castles: Castles_ENGINE;
    trees: Trees_ENGINE;

    constructor(
        map: Map_ENGINE,
        canvas: Canvas_ENGINE,
    ) {
        this.map = map;
        this.canvas = canvas;

        this.water = new Water_ENGINE(this.map, this.canvas);
        this.foams = new Foams_ENGINE(this.map, this.canvas);
        this.flatsSand = new FlatsSand_ENGINE(this.map, this.canvas);
        this.elevations = new Elevations_ENGINE(this.map, this.canvas);
        this.flatsGrass = new FlatsGrass_ENGINE(this.map, this.canvas);
        this.shadows = new Shadows_ENGINE(this.map, this.canvas);
        this.wallElevations = new WallElevations_ENGINE(this.map, this.canvas);
        this.stairsElevation = new StairsElevations_ENGINE(this.map, this.canvas);
        this.flatElevations = new FlatElevations_ENGINE(this.map, this.canvas);
        this.castles = new Castles_ENGINE(this.map, this.canvas);
        this.trees = new Trees_ENGINE(this.map, this.canvas);
    }

    pushFloor(matrix: FloorMatrix_MapMatrix) {
        matrix.forEach((row, vertical) => {
            row.forEach((box, horizontal) => {
                const boxIndices = new Plane_ENGINE(
                    horizontal,
                    vertical
                );

                if (box.water === true)
                    this.water.pushWater(boxIndices);

                if (box.foam !== false) {
                    this.foams.pushFoam(boxIndices);
                    if (box.foam.flatSand === true)
                        this.flatsSand.pushFlatSand(boxIndices);
                }

                if (box.elevation !== false) {
                    if (box.elevation.shadow === true)
                        this.shadows.pushShadow(boxIndices);

                    if (box.elevation.flatGrass === true)
                        this.flatsGrass.pushFlatGrass(boxIndices);

                    this.elevations.pushElevation(boxIndices);
                }

                if (box.wallElevation !== false) {
                    if (box.wallElevation.shadow === true)
                        this.shadows.pushShadow(boxIndices);

                    this.wallElevations.pushWallElevation(boxIndices);
                    if (box.wallElevation.flatElevation !== false)
                        this.flatElevations.pushFlatElevation(
                            boxIndices,
                            box.wallElevation.flatElevation
                        );
                }

                if (box.stairElevation !== false) {
                    if (box.stairElevation.shadow === true)
                        this.shadows.pushShadow(boxIndices);

                    this.stairsElevation.setStairsElevations(boxIndices);

                    if (box.stairElevation.flatElevation !== false)
                        this.flatElevations.pushFlatElevation(
                            boxIndices,
                            box.stairElevation.flatElevation
                        );
                }

                if (box.castle !== false) {
                    this.castles.castlePush(
                        boxIndices,
                        box.castle.state,
                        box.castle.color,
                    );
                }

                if (box.trees !== false) {
                    this.trees.pushTree(
                        boxIndices,
                        box.trees.animation
                    );
                }
            });
        });
    }

    aboveFloor(coordinate: Coordinate_ENGINE): boolean {
        const flatSand = this.flatsSand.collision(coordinate) !== false;
        const elevations = this.elevations.collision(coordinate) !== false;
        const stairsElevations = this.stairsElevation.collision(coordinate) !== false;

        if (flatSand === true)
            return true;

        if (elevations === true)
            return true;

        if (stairsElevations === true)
            return true;

        return false;
    }

    collisionFloor(
        coordinate: Coordinate_ENGINE,
        lastCoordinate: Coordinate_ENGINE,
    ): boolean {
        if (coordinate.x === lastCoordinate.x && coordinate.y === lastCoordinate.y)
            return false;

        const flatSand = this.flatsSand.collision(coordinate) !== false;
        const elevations = this.elevations.collision(coordinate) !== false;
        const wallElevations = this.wallElevations.collision(coordinate) !== false;
        const stairsElevations = this.stairsElevation.collision(coordinate) !== false;

        let direction = new Direction_ENGINE("center", "center");
        if (coordinate.x > lastCoordinate.x)
            direction.setX("left");
        else if (coordinate.x < lastCoordinate.x)
            direction.setX("right");

        if (coordinate.y > lastCoordinate.y)
            direction.setY("up");
        else if (coordinate.y < lastCoordinate.y)
            direction.setY("down");
        let nextCoordinate = new Coordinate_ENGINE(coordinate.x, coordinate.y);

        const collisionNextCoordinate = (
            nextCoordinate: Coordinate_ENGINE
        ): boolean => {
            const nextFlatSand = this.flatsSand.collision(nextCoordinate) !== false;
            const nextElevations = this.elevations.collision(nextCoordinate) !== false;
            const nextWallElevations = this.wallElevations.collision(nextCoordinate) !== false;
            const nextStairsElevations = this.stairsElevation.collision(nextCoordinate) !== false;

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

            throw new Error("invalid coordinate collision");
        }

        for (

        )
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