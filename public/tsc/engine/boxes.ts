import { Box_ENGINE } from "./box";
import type { Canvas_ENGINE } from "./canvas";
import type { Character_ENGINE } from "./character";
import { Coordinate_ENGINE } from "./coordinate";
import { Plane_ENGINE } from "./plane";
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
        super({
            x: props.x,
            y: props.y,
        });
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
        const boxIndicesLeftUp = this.getBoxIndices({
            coordinate: leftUp
        });
        const boxIndicesRightDown = this.getBoxIndices({
            coordinate: rightDown
        });
        const boxIndices = new Plane_ENGINE({
            horizontal: 0,
            vertical: 0
        });
        for (
            boxIndices.vertical = boxIndicesLeftUp.vertical;
            boxIndices.vertical <= boxIndicesRightDown.vertical;
            boxIndices.vertical++
        ) {
            for (
                boxIndices.horizontal = boxIndicesLeftUp.horizontal;
                boxIndices.horizontal <= boxIndicesRightDown.horizontal;
                boxIndices.horizontal++
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
        boxIndices: Plane_ENGINE
    }): Position_ENGINE {
        return new Position_ENGINE({
            leftUp: new Coordinate_ENGINE({
                x: props.boxIndices.horizontal * this.size.width,
                y: props.boxIndices.vertical * this.size.height
            }),
            size: new Size_ENGINE({
                width: this.size.width * this.length.horizontal,
                height: this.size.height * this.length.vertical
            })
        });
    }

    getBox(props: {
        boxIndices: Plane_ENGINE
    }): Box_ENGINE | undefined {
        const boxesRow = this.boxes[props.boxIndices.vertical];
        if (boxesRow === undefined)
            return undefined;

        const box = boxesRow[props.boxIndices.horizontal];
        return box;
    }

    getBoxIndices(props: {
        coordinate: Coordinate_ENGINE;
    }): Plane_ENGINE {
        const horizontal = Math.floor(props.coordinate.x / this.size.width);
        const vertical = Math.floor(props.coordinate.y / this.size.height);
        return new Plane_ENGINE({
            horizontal,
            vertical
        });
    }

    private boxesIndices(props: {
        boxIndices: Plane_ENGINE;
        box: Box_ENGINE;
    }) {
        let row = this.boxes[props.boxIndices.vertical];
        if (row === undefined)
            row = [];

        row[props.boxIndices.horizontal] = props.box;
        this.boxes[props.boxIndices.vertical] = row;
    }

    private setBox(props: {
        boxIndices: Plane_ENGINE;
        referenceIndex: number;
    }) {
        const size = new Size_ENGINE({
            width: this.size.width,
            height: this.size.height
        });
        const distanceX = props.boxIndices.horizontal * size.width;
        const distanceY = props.boxIndices.vertical * size.height;
        const box = new Box_ENGINE({
            leftUp: new Coordinate_ENGINE({
                x: this.x + distanceX,
                y: this.y + distanceY,
            }),
            size,
            referenceIndex: props.referenceIndex
        });
        this.boxesIndices({
            boxIndices: props.boxIndices,
            box
        });
    }

    private occupiedBoxes(props: {
        boxIndices: Plane_ENGINE,
        occupiedIndices: Plane_ENGINE,
        referenceIndex: number,
    }) {
        const boxIndices = new Plane_ENGINE({
            horizontal: props.boxIndices.horizontal + props.occupiedIndices.vertical,
            vertical: props.boxIndices.vertical + props.occupiedIndices.horizontal
        });
        let boxesRow = this.boxes[boxIndices.vertical];
        if (boxesRow === undefined)
            boxesRow = [];

        let box = this.getBox({ boxIndices });
        if (box !== undefined)
            return;

        this.setBox({
            boxIndices,
            referenceIndex: props.referenceIndex
        });
    }

    referencePush(props: {
        boxIndices: Plane_ENGINE;
    }): Position_ENGINE | undefined {
        const reference = this.getPosition({
            boxIndices: props.boxIndices
        });
        const referenceIndex = this.referencesPush({
            boxIndices: props.boxIndices,
            reference
        });
        if (referenceIndex === undefined)
            return undefined;

        return this.references[referenceIndex];
    }

    protected referencesPush(props: {
        boxIndices: Plane_ENGINE,
        reference: Position_ENGINE
    }): number | undefined {
        const box = this.getBox({
            boxIndices: props.boxIndices
        });
        if (box !== undefined)
            return undefined;

        this.references.push(props.reference);
        const referenceIndex = this.references.length - 1;

        if (this.occupied === true) {
            for (
                let vertical = 0;
                vertical < this.length.vertical;
                vertical++
            ) {
                for (
                    let horizontal = 0;
                    horizontal < this.length.horizontal;
                    horizontal++
                ) {
                    this.occupiedBoxes({
                        boxIndices: props.boxIndices,
                        occupiedIndices: new Plane_ENGINE({
                            horizontal,
                            vertical
                        }),
                        referenceIndex,
                    });
                }
            }
        } else {
            this.occupied.forEach((row, vertical) => {
                row.forEach((value, horizontal) => {
                    if (value === false)
                        return;

                    this.occupiedBoxes({
                        boxIndices: props.boxIndices,
                        occupiedIndices: new Plane_ENGINE({
                            horizontal,
                            vertical
                        }),
                        referenceIndex,
                    });
                });
            });
        }
        return referenceIndex;
    }
}