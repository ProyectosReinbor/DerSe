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

    constructor(props: {
        canvas: Canvas_ENGINE
    }) {
        super({
            leftUp: new Coordinate_ENGINE({ x: 0, y: 0 }),
            size: new Size_ENGINE({
                width: 100,
                height: 100
            })
        });
        this.canvas = props.canvas;
        this.boxes = new Size_ENGINE({
            width: this.size.width / MapMatrix_ENGINE.length.horizontal,
            height: this.size.height / MapMatrix_ENGINE.length.vertical,
        });
        this.floors = this.matrix.map((matrix) => {
            const floor = new Floor_ENGINE({
                map: this,
                canvas: this.canvas,
            });
            floor.pushFloor(matrix);
            return floor;
        });
    }

    indexFloorOn(props: {
        character: Character_ENGINE
    }) {
        for (
            let floorIndex = this.floors.length - 1;
            floorIndex >= 0;
            floorIndex--
        ) {

            const floor = this.floors[floorIndex];
            if (floor === undefined)
                continue;

            if (floor.aboveFloor({
                character: props.character
            }) === false)
                continue;
        }
    }

    // boxesInsideCoordinate(
    //     coordinate: Coordinate_ENGINE
    // ) {
    //     this.floor
    // }

    collisionMap(props: {
        character: Character_ENGINE,
        moved: Character_ENGINE,
    }): boolean {
        for (
            let floorIndex = this.floors.length - 1;
            floorIndex >= 0;
            floorIndex--
        ) {
            const floor = this.floors[floorIndex];
            if (floor === undefined)
                continue;

            if (floor.aboveFloor({
                character: props.character
            }) === false)
                continue;

            if (floor.collisionFloor({
                character: props.character,
                moved: props.moved
            }) === true)
                return true;

            const nextFloorIndex = floorIndex + 1;
            const nextFloor = this.floors[nextFloorIndex];
            if (nextFloor === undefined)
                return false;

            const flatSand = floor.flatsSand.collision({
                character: props.character
            }) !== false;
            const elevations = floor.elevations.collision({
                character: props.character
            }) !== false;
            const wallElevations = floor.wallElevations.collision({
                character: props.character
            }) !== false;
            const stairsElevations = floor.stairsElevation.collision({
                character: props.character
            }) !== false;

            const nextFlatSand = nextFloor.flatsSand.collision({
                character: props.moved
            }) !== false;
            const nextElevations = nextFloor.elevations.collision({
                character: props.moved
            }) !== false;
            const nextWallElevations = nextFloor.wallElevations.collision({
                character: props.moved
            }) !== false;
            const nextStairsElevations = nextFloor.stairsElevation.collision({
                character: props.moved
            }) !== false;

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