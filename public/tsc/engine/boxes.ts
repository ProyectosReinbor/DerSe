import { Box_ENGINE } from "./box";
import type { Canvas_ENGINE } from "./canvas";
import type { Character_ENGINE } from "./character";
import { Coordinate_ENGINE } from "./coordinate";
import type { Plane_ENGINE } from "./plane";
import { Position_ENGINE } from "./position";
import { Size_ENGINE } from "./size";

export type OccupiedBoxes = true | boolean[][];

export class Boxes_ENGINE extends Coordinate_ENGINE {

    boxes: Box_ENGINE[][] = [];
    references: Position_ENGINE[] = [];

    canvas: Canvas_ENGINE;
    size: Size_ENGINE;
    length: Plane_ENGINE;
    occupied: OccupiedBoxes;

    constructor(props: {
        x: number;
        y: number;
        canvas: Canvas_ENGINE;
        size: Size_ENGINE;
        length: Plane_ENGINE;
        occupied: OccupiedBoxes;
    }) {
        super(props);
        this.canvas = props.canvas;
        this.size = props.size;
        this.length = props.length;
        this.occupied = props.occupied;
    }

    collision(props: {
        character: Character_ENGINE
    }): Box_ENGINE | false {
        const size = new Size_ENGINE({
            width: this.size.width * props.character.address.x,
            height: this.size.height * props.character.address.y
        });
        const leftUp = new Coordinate_ENGINE({
            x: props.character.leftUp.x + size.width,
            y: props.character.leftUp.y + size.height
        });
        const rightDown = new Coordinate_ENGINE({
            x: props.character.rightDown.x + size.width,
            y: props.character.rightDown.y + size.height
        });
        const boxIndicesLeftUp = this.getBoxIndices({ coordinate: leftUp });
        const boxIndicesRightDown = this.getBoxIndices({ coordinate: rightDown });
        const boxIndices = new Coordinate_ENGINE({ x: 0, y: 0 });
        for (
            boxIndices.y = boxIndicesLeftUp.y;
            boxIndices.y <= boxIndicesRightDown.y;
            boxIndices.y++
        ) {
            for (
                boxIndices.x = boxIndicesLeftUp.x;
                boxIndices.x <= boxIndicesRightDown.x;
                boxIndices.x++
            ) {
                const box = this.getBox({ boxIndices });
                if (box === undefined)
                    continue;

                if (box.someVertexInside({ position: props.character }) === false)
                    continue;

                return box;
            }
        }
        return false;
    }

    getPosition(props: {
        boxIndices: Coordinate_ENGINE
    }): Position_ENGINE {
        return new Position_ENGINE({
            leftUp: new Coordinate_ENGINE({
                x: props.boxIndices.x * this.size.width,
                y: props.boxIndices.y * this.size.height
            }),
            size: new Size_ENGINE({
                width: this.size.width * this.length.horizontal,
                height: this.size.height * this.length.vertical
            })
        });
    }

    getBox(props: {
        boxIndices: Coordinate_ENGINE
    }): Box_ENGINE | undefined {
        const boxesRow = this.boxes[props.boxIndices.y];
        if (boxesRow === undefined)
            return undefined;

        const box = boxesRow[props.boxIndices.x];
        return box;
    }

    getBoxIndices(props: {
        coordinate: Coordinate_ENGINE
    }): Coordinate_ENGINE {
        const boxX = Math.floor(props.coordinate.x / this.size.width);
        const boxY = Math.floor(props.coordinate.y / this.size.height);
        return new Coordinate_ENGINE({ x: boxX, y: boxY });
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