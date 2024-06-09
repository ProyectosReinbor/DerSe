import {
    TwoDimensionalBoxVertices,
    type NamesXBoxVertices,
    type NamesYBoxVertices,
    type ValuesBoxVertices
} from "./twoDimensionalBoxVertices";

export type NamesZBoxVertices = "back" | "half" | "forward";
export class ThreeDimensionalBoxVertices extends TwoDimensionalBoxVertices {
    private static zValues: {
        [name in NamesZBoxVertices]: ValuesBoxVertices;
    } = {
            "back": -1,
            "half": 0,
            "forward": 1
        };

    readonly nameZ: NamesZBoxVertices;

    constructor(
        nameX: NamesXBoxVertices,
        nameY: NamesYBoxVertices,
        nameZ: NamesZBoxVertices,
    ) {
        super(nameX, nameY);
        this.nameZ = nameZ;
    }

    get zNumber() {
        return ThreeDimensionalBoxVertices.zValues[this.nameZ];
    }
}