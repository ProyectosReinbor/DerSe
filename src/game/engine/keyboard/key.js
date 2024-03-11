import { Button } from "../button.js";

export class Key extends Button {
    constructor(
        initialX,
        initialY,
        sizeWidth,
        sizeHeight,
        canvas,
        fillStyle,
        strokeStyle,
        lineWidth,
        textSizeHeight,
        textValue,
        textFillStyle,
        textStrokeStyle,
        keyPress,
    ) {
        super(
            initialX,
            initialY,
            sizeWidth,
            sizeHeight,
            canvas,
            fillStyle,
            strokeStyle,
            lineWidth,
            textSizeHeight,
            textValue,
            textFillStyle,
            textStrokeStyle
        );
        this.keyPress = keyPress;
    }

    touchendKey(initialX, initialY) {
        if (this.inside(
            initialX,
            initialY,
            initialX,
            initialY
        ) === false) return false;
        this.keyPress(this.text.value);
        return true;
    }
} 