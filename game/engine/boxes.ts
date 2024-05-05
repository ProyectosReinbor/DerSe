import { Box_ENGINE } from "./box";

export type OccupiedBoxes = true | boolean[][];

export class Boxes_ENGINE extends Coordinate_ENGINE {

    boxes: Box_ENGINE[][] = [];
    references: Position_ENGINE[] = [];
    boxSize: Size_ENGINE;
    length: Plane_ENGINE;
    occupied: OccupiedBoxes;

    constructor(
        x: number,
        y: number,
        boxSize: Size_ENGINE,
        length: Plane_ENGINE,
        occupied: OccupiedBoxes,
    ) {
        super(x, y);
        this.boxSize = boxSize;
        this.length = length;
        this.occupied = occupied;
    }

    collision(
        coordinate: Coordinate_ENGINE
    ): Box_ENGINE | false {
        const position = new Position_ENGINE(
            coordinate,
            new Size_ENGINE(
                this.boxSize.width,
                this.boxSize.height
            )
        );

        const positionLeftUp = position.leftUp;
        const boxIndicesLeftUp = this.getBoxIndices(
            new Coordinate_ENGINE(
                positionLeftUp.x,
                positionLeftUp.y
            )
        );

        const positionRightDown = position.rightDown;
        const boxIndicesRightDown = this.getBoxIndices(
            new Coordinate_ENGINE(
                positionRightDown.x,
                positionRightDown.y
            )
        );

        const boxIndices = new Plane_ENGINE(
            boxIndicesLeftUp.vertical,
            boxIndicesLeftUp.horizontal
        );
        for (;
            boxIndices.vertical <= boxIndicesRightDown.vertical;
            boxIndices.vertical++
        ) {
            for (;
                boxIndices.horizontal <= boxIndicesRightDown.horizontal;
                boxIndices.horizontal++
            ) {
                const box = this.getBox(boxIndices);
                if (box === undefined)
                    continue;

                if (box.someVertexWithinPosition(position) === false)
                    continue;

                return box;
            }
        }
        return false;
    }

    getPosition(boxIndices: Plane_ENGINE): Position_ENGINE {
        const x = boxIndices.horizontal * this.boxSize.width;
        const y = boxIndices.vertical * this.boxSize.height;
        const width = this.boxSize.width * this.length.horizontal;
        const height = this.boxSize.height * this.length.vertical;
        return new Position_ENGINE(
            new Coordinate_ENGINE(x, y),
            new Size_ENGINE(
                width,
                height
            )
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
        const horizontal = Math.floor(coordinate.x / this.boxSize.width);
        const vertical = Math.floor(coordinate.y / this.boxSize.height);
        return new Plane_ENGINE(horizontal, vertical);
    }

    boxesIndices(
        boxIndices: Plane_ENGINE,
        box: Box_ENGINE,
    ) {
        let row = this.boxes[boxIndices.vertical];
        if (row === undefined)
            row = [];

        row[boxIndices.horizontal] = box;
        this.boxes[boxIndices.vertical] = row;
    }

    setBox(
        boxIndices: Plane_ENGINE,
        referenceIndex: number,
    ) {
        const box = (() => {
            const size = new Size_ENGINE(
                this.boxSize.width,
                this.boxSize.height
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

    occupiedBoxes(
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

    referencesPush(
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