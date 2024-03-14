import { Rect } from "../engine/rect.js";
import { Image } from "../engine/image.js";
import { Text } from "../engine/text.js";

export class UserBar extends Rect {
    constructor(
        initialX,
        initialY,
        sizeWidth,
        sizeHeight,
        canvas,
        photoRoute,
        nickname,
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
        this.name = new Text(
            initialX,
            initialY,
            this.size.width * 0.7,
            9,
            this.canvas,
            nickname,
            "#fff",
        );
    }

    async drawUserBar(initialX, initialY) {
        this.initial.x = initialX;
        this.initial.y = initialY - this.size.height;
        this.photo.initial.x = this.initial.x;
        this.photo.initial.y = this.initial.y;
        this.name.initial.x = this.initial.x + this.photo.size.width;
        this.name.initial.y = this.initial.y;
        this.drawRect();
        await this.photo.drawImage();
        this.name.drawText();
    }
}