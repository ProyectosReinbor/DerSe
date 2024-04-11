import { Button_ENGINE } from "../button";
import type { Canvas_ENGINE } from "../canvas";
import type { FillStyle, StrokeStyle } from "../context";
import type { Coordinate_ENGINE } from "../coordinate";
import type { Size_ENGINE } from "../size";
import type { Text_ENGINE } from "../text";

export type KeyPress = (character: string) => void;

export class Key_ENGINE extends Button_ENGINE {

    keyPress: KeyPress

    constructor(
        leftUp: Coordinate_ENGINE,
        size: Size_ENGINE,
        canvas: Canvas_ENGINE,
        fillStyle: FillStyle,
        strokeStyle: StrokeStyle,
        lineWidth: number,
        text: Text_ENGINE,
        keyPress: KeyPress
    ) {
        super(
            leftUp,
            size,
            canvas,
            fillStyle,
            strokeStyle,
            lineWidth,
            text,
        );
        this.keyPress = keyPress;
    }

    touchendKey(touch: Coordinate_ENGINE) {
        if (this.insidePositionCoordinate(touch) === false)
            return false;

        this.keyPress(this.text.value);
        return true;
    }
} 