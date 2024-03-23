import { Box } from "./box";
import type { Canvas } from "./canvas";
import type { Character } from "./character";
import { Coordinate } from "./coordinate";
import type { Plane } from "./plane";
import { Position } from "./position";
import { Size } from "./size";

export type BoxesOccupied = true | boolean[][];

export class Boxes extends Coordinate {

    boxes: Box[][] = [];
    references: Position[] = [];

    canvas: Canvas;
    size: Size;
    length: Plane;
    occupied: BoxesOccupied;

    constructor(props: {
        x: number;
        y: number;
        canvas: Canvas;
        size: Size;
        length: Plane;
        occupied: BoxesOccupied;
    }) {
        super(props);
        this.canvas = props.canvas;
        this.size = props.size;
        this.length = props.length;
        this.occupied = props.occupied;
    }

    collision(
        character: Character
    ): Box | false {
        const size = new Size({
            width: this.size.width * character.address.x,
            height: this.size.height * character.address.y
        });
        const initial = new Coordinate({
            x: character.initial.x + size.width,
            y: character.initial.y + size.height
        });
        const end = new Coordinate({
            x: character.end.x + size.width,
            y: character.end.y + size.height
        });
        const indicesBoxInitial = this.indicesBox(initial);
        const indicesBoxEnd = this.indicesBox(end);
        // if (indicesBoxInitial.x - indicesBoxEnd.x === 1) {
        //     const box = this.getBox(indicesBoxInitial);
        //     if (box === undefined)
        //         return false;

        //     if (box.collision(position) === false)
        //         return false;

        //     return box;
        // }
        const indicesBox = new Coordinate({ x: 0, y: 0 });
        for (
            indicesBox.y = indicesBoxInitial.y;
            indicesBox.y <= indicesBoxEnd.y;
            indicesBox.y++
        ) {
            for (
                indicesBox.x = indicesBoxInitial.x;
                indicesBox.x <= indicesBoxEnd.x;
                indicesBox.x++
            ) {
                const box = this.getBox(indicesBox);
                if (box === undefined)
                    continue;

                if (box.collision(character) === false)
                    continue;

                return box;
            }
        }
        return false;
    }

    getPosition(indicesBox: Coordinate): Position {
        return new Position({
            initial: new Coordinate({
                x: indicesBox.x * this.size.width,
                y: indicesBox.y * this.size.height
            }),
            size: new Size({
                width: this.size.width * this.length.horizontal,
                height: this.size.height * this.length.vertical
            })
        });
    }

    getBox(indicesBox: Coordinate): Box | undefined {
        const boxesRow = this.boxes[indicesBox.y];
        if (boxesRow === undefined)
            return undefined;

        const box = boxesRow[indicesBox.x];
        return box;
    }

    indicesBox(coordinate: Coordinate) {
        const boxX = Math.floor(coordinate.x / this.size.width);
        const boxY = Math.floor(coordinate.y / this.size.height);
        return new Coordinate({ x: boxX, y: boxY });
    }

    private boxesIndices(
        indicesBox: Coordinate,
        box: Box
    ) {
        let row = this.boxes[indicesBox.y];
        if (row === undefined) row = [];
        row[indicesBox.x] = box;
        this.boxes[indicesBox.y] = row;
    }

    private setBox(
        indicesBox: Coordinate,
        referenceIndex: number,
    ) {
        const size = new Size({
            width: this.size.width,
            height: this.size.height
        });
        const distanceX = indicesBox.x * size.width;
        const distanceY = indicesBox.y * size.height;
        const box = new Box({
            initial: new Coordinate({
                x: this.x + distanceX,
                y: this.y + distanceY,
            }),
            size,
            referenceIndex
        });
        this.boxesIndices(indicesBox, box);
    }

    private occupiedBoxes(
        indicesBoxInitial: Coordinate,
        indicesOccupied: Coordinate,
        referenceIndex: number,
    ) {
        const indicesBox = new Coordinate({
            x: indicesBoxInitial.x + indicesOccupied.y,
            y: indicesBoxInitial.y + indicesOccupied.x
        });
        let boxesRow = this.boxes[indicesBox.y];
        if (boxesRow === undefined)
            boxesRow = [];

        let box = this.getBox(indicesBox);
        if (box !== undefined)
            return;

        this.setBox(indicesBox, referenceIndex);
    }

    referencePush(indicesBox: Coordinate): Position | undefined {
        const position = this.getPosition(indicesBox);
        const referenceIndex = this.referencesPush(indicesBox, position);
        if (referenceIndex === undefined)
            return undefined;

        return this.references[referenceIndex];
    }

    protected referencesPush(
        indicesBoxInitial: Coordinate,
        reference: Position
    ): number | undefined {
        const box = this.getBox(indicesBoxInitial);
        if (box !== undefined)
            return undefined;

        const referenceIndex = this.references.push(reference) - 1;
        if (this.occupied === true) {
            for (let y = 0; y < this.length.vertical; y++) {
                for (let x = 0; x < this.length.horizontal; x++) {
                    this.occupiedBoxes(
                        indicesBoxInitial,
                        new Coordinate({ x, y }),
                        referenceIndex,
                    );
                }
            }
        } else {
            this.occupied.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value === false) return;
                    this.occupiedBoxes(
                        indicesBoxInitial,
                        new Coordinate({ x, y }),
                        referenceIndex,
                    );
                });
            });
        }
        return referenceIndex;
    }
}