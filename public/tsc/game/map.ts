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

    collisionMap(
        character: Character,
        movedCharacter: Character,
        floorIndex: number
    ): boolean {
        const floor = this.floors[floorIndex];
        if (floor === undefined)
            return false;

        return floor.collisionFloor(character, movedCharacter);
    }

    drawMap() {
        this.floors.forEach(
            floor => floor.drawMap()
        );
    }
}   