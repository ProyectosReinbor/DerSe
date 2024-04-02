import {
    type FloorMatrix_MapMatrix,
    MapMatrix_ENGINE
} from "./mapMatrix.js";
import { Floor_ENGINE } from "./map/floor.js";
import { Position_ENGINE } from "../engine/position.js";
import { Size_ENGINE } from "../engine/size.js";
import type { Canvas_ENGINE } from "../engine/canvas.js";
import { Coordinate_ENGINE } from "../engine/coordinate.js";
import type { Character_ENGINE } from "../engine/character.js";

export class Map_ENGINE extends Position_ENGINE {

    matrix: FloorMatrix_MapMatrix[] = MapMatrix_ENGINE.get();
    floors: Floor_ENGINE[];
    boxes: Size_ENGINE;
    canvas: Canvas_ENGINE;

    constructor(canvas: Canvas_ENGINE) {
        super(
            new Coordinate_ENGINE(0, 0),
            new Size_ENGINE(100, 100)
        );
        this.canvas = canvas;
        this.boxes = new Size_ENGINE(
            0,
            this.size.height / MapMatrix_ENGINE.length.vertical,
        );
        this.boxes.width = this.canvas.widthInPercentageHeight(this.boxes.height)
        this.floors = this.matrix.map((matrix) => {
            const floor = new Floor_ENGINE(
                this,
                this.canvas,
            );
            floor.pushFloor(matrix);
            return floor;
        });
    }

    indexFloorOn(character: Character_ENGINE) {
        for (
            let floorIndex = this.floors.length - 1;
            floorIndex >= 0;
            floorIndex--
        ) {

            const floor = this.floors[floorIndex];
            if (floor === undefined)
                continue;

            if (floor.aboveFloor(character) === false)
                continue;
        }
    }

    collisionMap(
        character: Position_ENGINE,
        moved: Position_ENGINE,
    ): boolean {
        for (
            let floorIndex = this.floors.length - 1;
            floorIndex >= 0;
            floorIndex--
        ) {
            const floor = this.floors[floorIndex];
            if (floor === undefined)
                continue;

            if (floor.aboveFloor(character) === false)
                continue;

            if (floor.collisionFloor(
                character,
                moved
            ) === true)
                return true;

            const nextFloorIndex = floorIndex + 1;
            const nextFloor = this.floors[nextFloorIndex];
            if (nextFloor === undefined)
                return false;

            const flatSand = floor.flatsSand.collision(character) !== false;
            const elevations = floor.elevations.collision(character) !== false;
            const wallElevations = floor.wallElevations.collision(character) !== false;
            const stairsElevations = floor.stairsElevation.collision(character) !== false;

            const nextFlatSand = nextFloor.flatsSand.collision(moved) !== false;
            const nextElevations = nextFloor.elevations.collision(moved) !== false;
            const nextWallElevations = nextFloor.wallElevations.collision(moved) !== false;
            const nextStairsElevations = nextFloor.stairsElevation.collision(moved) !== false;

            if (flatSand === true) {
                if (nextFlatSand === true)
                    return true;

                if (nextElevations === true)
                    return true;

                if (nextWallElevations === true)
                    return true;

                if (nextStairsElevations === true)
                    return false;
            }

            if (elevations === true) {
                if (nextFlatSand === true)
                    return true;

                if (nextElevations === true)
                    return true;

                if (nextWallElevations === true)
                    return true;

                if (nextStairsElevations === true)
                    return false;
            }

            if (wallElevations === true) {
                if (nextFlatSand === true)
                    return true;

                if (nextElevations === true)
                    return true;

                if (nextWallElevations === true)
                    return true;

                if (nextStairsElevations === true)
                    return false;
            }

            if (stairsElevations === true) {
                if (nextFlatSand === true)
                    return false;

                if (nextElevations === true)
                    return false;

                if (nextWallElevations === true)
                    return false;

                if (nextStairsElevations === true)
                    return false;
            }
            return false;
        }
        return true;
    }

    drawMap() {
        this.floors.forEach(
            floor => floor.drawMap()
        );
    }
}   