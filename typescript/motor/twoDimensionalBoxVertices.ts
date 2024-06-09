export type ValuesBoxVertices = -1 | 0 | 1;
export type NamesXBoxVertices = "left" | "half" | "right";
export type NamesYBoxVertices = "top" | "half" | "lower";
export class TwoDimensionalBoxVertices {
    private static xValues: {
        [name in NamesXBoxVertices]: ValuesBoxVertices;
    } = {
            "left": -1,
            "half": 0,
            "right": 1
        };

    private static yValues: {
        [name in NamesYBoxVertices]: ValuesBoxVertices;
    } = {
            "top": -1,
            "half": 0,
            "lower": 1
        }

    readonly nameX: NamesXBoxVertices;
    readonly nameY: NamesYBoxVertices;

    constructor(
        nameX: NamesXBoxVertices,
        nameY: NamesYBoxVertices
    ) {
        this.nameX = nameX;
        this.nameY = nameY;
    }

    get numberX() {
        return TwoDimensionalBoxVertices.xValues[this.nameX];
    }

    get numberY() {
        return TwoDimensionalBoxVertices.yValues[this.nameY];
    }
}