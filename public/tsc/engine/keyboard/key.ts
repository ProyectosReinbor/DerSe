import { Button } from "../button";
import type { Canvas } from "../canvas";
import type { FillStyle, StrokeStyle } from "../context";
import type { Coordinate } from "../coordinate";
import type { Size } from "../size";
import type { Text } from "../text";


export class Key extends Button {
    keyPress: (character: string) => void;
    constructor(props: {
        initial: Coordinate;
        size: Size;
        canvas: Canvas;
        fillStyle: FillStyle;
        strokeStyle: StrokeStyle;
        lineWidth: number;
        text: Text;
        keyPress: (character: string) => void;
    }) {
        super(props);
        this.keyPress = props.keyPress;
    }

    touchendKey(touch: Coordinate) {
        if (this.insideCoordinate(touch) === false) return false;
        this.keyPress(this.text.value);
        return true;
    }
} 