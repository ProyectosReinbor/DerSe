import {
    type FloorMatrix_MapMatrix,
    MapMatrix_ENGINE
} from "./mapMatrix.js";
import { Floor_ENGINE } from "./map/floor.js";
import { Position_ENGINE } from "../engine/position.js";
import { Size_ENGINE } from "../engine/size.js";
import type { Canvas_ENGINE } from "../engine/canvas.js";
import { Coordinate_ENGINE } from "../engine/coordinate.js";
import { Direction_ENGINE } from "../engine/character/direction.js";

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

    indexFloorOn(coordinate: Coordinate_ENGINE) {
        for (
            let floorIndex = this.floors.length - 1;
            floorIndex >= 0;
            floorIndex--
        ) {

            const floor = this.floors[floorIndex];
            if (floor === undefined)
                continue;

            if (floor.aboveFloor(coordinate) === false)
                continue;
        }
    }

    collisionMap(
        coordinate: Coordinate_ENGINE,
        lastCoordinate: Coordinate_ENGINE,
    ):
        Coordinate_ENGINE {

        console.log(coordinate, lastCoordinate);

        for (
            let floorIndex = this.floors.length - 1;
            floorIndex >= 0;
            floorIndex--
        ) {
            const floor = this.floors[floorIndex];
            if (floor === undefined)
                continue;

            if (floor.aboveFloor(coordinate) === false)
                continue;

            const collisionFloor = floor.collisionFloor(coordinate, lastCoordinate);

            const nextFloorIndex = floorIndex + 1;
            const nextFloor = this.floors[nextFloorIndex];
            if (nextFloor === undefined)
                return collisionFloor;

            const flatSand = floor.flatsSand.collision(coordinate) !== false;
            const elevations = floor.elevations.collision(coordinate) !== false;
            const wallElevations = floor.wallElevations.collision(coordinate) !== false;
            const stairsElevations = floor.stairsElevation.collision(coordinate) !== false;

            const direction = (() => {
                const value = new Direction_ENGINE("center", "center");
                if (coordinate.x > lastCoordinate.x)
                    value.setX("left");
                else if (coordinate.x < lastCoordinate.x)
                    value.setX("right");

                if (coordinate.y > lastCoordinate.y)
                    value.setY("up");
                else if (coordinate.y < lastCoordinate.y)
                    value.setY("down");

                return value;
            })();

            const nextCoordinate = new Coordinate_ENGINE(coordinate.x, coordinate.y);
            let newCoordinate = new Coordinate_ENGINE(coordinate.x, coordinate.y);

            const collisionNextCoordinate = (): boolean => {
                const nextFlatSand = nextFloor.flatsSand.collision(nextCoordinate) !== false;
                const nextElevations = nextFloor.elevations.collision(nextCoordinate) !== false;
                const nextWallElevations = nextFloor.wallElevations.collision(nextCoordinate) !== false;
                const nextStairsElevations = nextFloor.stairsElevation.collision(nextCoordinate) !== false;

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
                return true;
            }

            const conditionInX = () => {
                const directionX = direction.getX();
                if (directionX === "left")
                    return lastCoordinate.x < nextCoordinate.x;

                else if (directionX === "right")
                    return nextCoordinate.x < lastCoordinate.x;

                return false;
            };

            const conditionInY = () => {
                const directionY = direction.getY();
                if (directionY === "up")
                    return lastCoordinate.y < nextCoordinate.y;

                else if (directionY === "down") {
                    return nextCoordinate.y < lastCoordinate.y;
                }

                return false;
            };

            while (
                conditionInX() ||
                conditionInY()
            ) {
                nextCoordinate.x += this.boxes.width * direction.getNumberX();
                nextCoordinate.y += this.boxes.height * direction.getNumberY();
                const collision = collisionNextCoordinate();
                if (collision === true)
                    return newCoordinate;

                newCoordinate = new Coordinate_ENGINE(
                    nextCoordinate.x,
                    nextCoordinate.y
                );
            }
        }
        throw new Error("no floors");
    }

    drawMap() {
        this.floors.forEach(
            floor => floor.drawMap()
        );
    }
}