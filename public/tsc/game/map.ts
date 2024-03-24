import {
    GetMapMatrix,
    MapLength,
    type MapFloorMatrix,
} from "./mapMatrix.js";
import { Position } from "../engine/position.js";
import { Size } from "../engine/size.js";
import type { Canvas } from "../engine/canvas.js";
import { Coordinate } from "../engine/coordinate.js";
import { Floor } from "./map/floor.js";
import type { Character } from "../engine/character.js";

export class Map extends Position {
    matrix: MapFloorMatrix[] = GetMapMatrix();
    floors: Floor[];
    boxes: Size;
    canvas: Canvas;

    constructor(props: { canvas: Canvas }) {
        super({
            initial: new Coordinate({ x: 0, y: 0 }),
            size: new Size({
                width: 100,
                height: 100
            })
        });
        this.canvas = props.canvas;
        this.boxes = new Size({
            width: this.size.width / MapLength.horizontal,
            height: this.size.height / MapLength.vertical,
        });
        this.floors = this.matrix.map((matrix) => {
            const floor = new Floor({
                map: this,
                canvas: this.canvas,
            });
            floor.pushFloor(matrix);
            return floor;
        });
    }

    indexFloorOn(
        coordinate: Coordinate
    ) {
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

    boxesInsideCoordinate(
        coordinate: Coordinate
    ) {
        this.floor
    }

    collisionMap(
        character: Character,
        movedCharacter: Character,
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

            if (floor.collisionFloor(character, movedCharacter) === true)
                return true;

            const nextFloorIndex = floorIndex + 1;
            const nextFloor = this.floors[nextFloorIndex];
            if (nextFloor === undefined)
                return false;

            const flatSand = floor.flatsSand.collision(character) !== false;
            const elevations = floor.elevations.collision(character) !== false;
            const wallElevations = floor.wallElevations.collision(character) !== false;
            const stairsElevations = floor.stairsElevation.collision(character) !== false;

            const nextFlatSand = nextFloor.flatsSand.collision(movedCharacter) !== false;
            const nextElevations = nextFloor.elevations.collision(movedCharacter) !== false;
            const nextWallElevations = nextFloor.wallElevations.collision(movedCharacter) !== false;
            const nextStairsElevations = nextFloor.stairsElevation.collision(movedCharacter) !== false;

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