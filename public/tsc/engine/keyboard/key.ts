import { Button_ENGINE } from "../button";
import type { Canvas_ENGINE } from "../canvas";
import type { FillStyle, StrokeStyle } from "../context";
import type { Coordinate_ENGINE } from "../coordinate";
import type { Size_ENGINE } from "../size";
import type { Text_ENGINE } from "../text";

export type KeyPress_KEY = (character: string) => void;

export class Key_KEYBOARD extends Button_ENGINE {

    keyPress: KeyPress_KEY

    constructor(props: {
        leftUp: Coordinate_ENGINE;
        size: Size_ENGINE;
        canvas: Canvas_ENGINE;
        fillStyle: FillStyle;
        strokeStyle: StrokeStyle;
        lineWidth: number;
        text: Text_ENGINE;
        keyPress: KeyPress_KEY;
    }) {
        super(props);
        this.keyPress = props.keyPress;
    }

    touchendKey(props: {
        touch: Coordinate_ENGINE;
    }) {
        if (this.insidePositionCoordinate({
            coordinate: props.touch
        }) === false)
            return false;

        this.keyPress(this.text.value);
        return true;
    }
} 