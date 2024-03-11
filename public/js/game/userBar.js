import { Rect } from "../engine/rect.js";
import { Image } from "../engine/image.js";

export class UserBar extends Rect {
    constructor(
        initialX,
        initialY,
        sizeWidth,
        sizeHeight,
        canvas,
        photoRoute
    ) {
        super(
            initialX,
            initialY,
            sizeWidth,
            sizeHeight,
            canvas,
            "#416177",
            "#fff",
            0.5,
        );
        this.photo = new Image(
            initialX,
            initialY,
            this.size.width * 0.3,
            this.size.height,
            this.canvas,
            photoRoute,
        );
    }

    drawUserBar(initialX, initialY) {
        this.initial.x = initialX;
        this.initial.y = initialY - this.size.height;
        this.photo.initial.x = this.initial.x;
        this.photo.initial.y = this.initial.y;
        this.drawRect();
        this.photo.drawImage();
    }
}