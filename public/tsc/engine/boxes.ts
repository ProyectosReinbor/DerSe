import { Box_ENGINE } from "./box";
import type { Canvas_ENGINE } from "./canvas";
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

    constructor(
        x: number,
        y: number,
        canvas: Canvas_ENGINE,
        size: Size_ENGINE,
        length: Plane_ENGINE,
        occupied: OccupiedBoxes,
    ) {
        super(x, y);
        this.canvas = canvas;
        this.size = size;
        this.length = length;
        this.occupied = occupied;
    }

    collision(coordinate: Coordinate_ENGINE): Box_ENGINE | false {
        const position = new Position_ENGINE(
            coordinate,
            new Size_ENGINE(this.size.width, this.size.height)
        );

        const boxIndicesLeftUp = (() => {
            const coordinate = new Coordinate_ENGINE(
                position.leftUp.x - this.size.width,
                position.leftUp.y - this.size.height
            );
            return this.getBoxIndices(coordinate);
        })();

        const boxIndicesRightDown = (() => {
            const positionRightDown = position.rightDown();
            const coordinate = new Coordinate_ENGINE(
                positionRightDown.x + this.size.width,
                positionRightDown.y + this.size.height
            );
            return this.getBoxIndices(coordinate);
        })();

        const boxIndices = new Plane_ENGINE(0, 0);
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
                const box = this.getBox(boxIndices);
                if (box === undefined)
                    continue;

                if (box.someVertexInside(position) === false)
                    continue;

                return box;
            }
        }
        return false;
    }

    getPosition(boxIndices: Plane_ENGINE): Position_ENGINE {
        const x = boxIndices.horizontal * this.size.width;
        const y = boxIndices.vertical * this.size.height;
        const width = this.size.width * this.length.horizontal;
        const height = this.size.height * this.length.vertical;
        return new Position_ENGINE(
            new Coordinate_ENGINE(x, y),
            new Size_ENGINE(width, height)
        );
    }

    getBox(boxIndices: Plane_ENGINE): Box_ENGINE | undefined {
        const boxesRow = this.boxes[boxIndices.vertical];
        if (boxesRow === undefined)
            return undefined;

        const box = boxesRow[boxIndices.horizontal];
        return box;
    }

    getBoxIndices(coordinate: Coordinate_ENGINE): Plane_ENGINE {
        const horizontal = Math.floor(coordinate.x / this.size.width);
        const vertical = Math.floor(coordinate.y / this.size.height);
        return new Plane_ENGINE(horizontal, vertical);
    }

    private boxesIndices(
        boxIndices: Plane_ENGINE,
        box: Box_ENGINE,
    ) {
        let row = this.boxes[boxIndices.vertical];
        if (row === undefined)
            row = [];

        row[boxIndices.horizontal] = box;
        this.boxes[boxIndices.vertical] = row;
    }

    private setBox(
        boxIndices: Plane_ENGINE,
        referenceIndex: number,
    ) {
        const box = (() => {
            const size = new Size_ENGINE(
                this.size.width,
                this.size.height
            );
            const leftUp = (() => {
                const distanceX = boxIndices.horizontal * size.width;
                const distanceY = boxIndices.vertical * size.height;
                return new Coordinate_ENGINE(
                    this.x + distanceX,
                    this.y + distanceY,
                )
            })();
            return new Box_ENGINE(
                leftUp,
                size,
                referenceIndex
            );
        })();
        this.boxesIndices(
            boxIndices,
            box
        );
    }

    private occupiedBoxes(
        initialReferenceIndices: Plane_ENGINE,
        indexesBoxOccupy: Plane_ENGINE,
        referenceIndex: number,
    ) {
        const boxIndices = (() => {
            const horizontal = initialReferenceIndices.horizontal + indexesBoxOccupy.vertical;
            const vertical = initialReferenceIndices.vertical + indexesBoxOccupy.horizontal;
            return new Plane_ENGINE(horizontal, vertical);
        })();
        let boxesRow = this.boxes[boxIndices.vertical];
        if (boxesRow === undefined)
            boxesRow = [];

        let box = this.getBox(boxIndices);
        if (box !== undefined)
            return;

        this.setBox(
            boxIndices,
            referenceIndex
        );
    }

    referencePush(boxIndices: Plane_ENGINE): Position_ENGINE | undefined {
        const reference = this.getPosition(boxIndices);
        const referenceIndex = this.referencesPush(
            boxIndices,
            reference
        );
        if (referenceIndex === undefined)
            return undefined;

        return this.references[referenceIndex];
    }

    protected referencesPush(
        boxIndices: Plane_ENGINE,
        reference: Position_ENGINE,
    ): number | undefined {
        const box = this.getBox(boxIndices);
        if (box !== undefined)
            return undefined;

        this.references.push(reference);
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
                    const indexesBoxOccupy = new Plane_ENGINE(
                        horizontal,
                        vertical
                    );
                    this.occupiedBoxes(
                        boxIndices,
                        indexesBoxOccupy,
                        referenceIndex,
                    );
                }
            }
        } else {
            this.occupied.forEach((row, vertical) => {
                row.forEach((value, horizontal) => {
                    if (value === false)
                        return;

                    const indexesBoxOccupy = new Plane_ENGINE(
                        horizontal,
                        vertical
                    );
                    this.occupiedBoxes(
                        boxIndices,
                        indexesBoxOccupy,
                        referenceIndex,
                    );
                });
            });
        }
        return referenceIndex;
    }
}