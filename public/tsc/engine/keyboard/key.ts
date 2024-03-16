import {
    type Canvas,
    type Coordinate,
    type Size,
    Button
} from "../exports.js";

export class Key extends Button {
    keyPress: (character: string) => void;
    constructor(
        initial: Coordinate,
        size: Size,
        canvas: Canvas,
        fillStyle: string = "",
        strokeStyle: string = "",
        lineWidth: number = 0,
        textParameters: {
            size: Size;
            value: string;
            fillStyle: string;
            strokeStyle: string;
        },
        keyPress: (character: string) => void,
    ) {
        super(
            initial,
            size,
            canvas,
            fillStyle,
            strokeStyle,
            lineWidth,
            textParameters,
        );
        this.keyPress = keyPress;
    }

    touchendKey(touch: Coordinate) {
        if (this.insideCoordinate(touch) === false) return false;
        this.keyPress(this.text.value);
        return true;
    }
} 