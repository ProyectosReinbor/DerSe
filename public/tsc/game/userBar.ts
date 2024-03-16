import { Canvas } from "../engine/canvas";
import { Coordinate } from "../engine/coordinate";
import { Image } from "../engine/image";
import { Rect } from "../engine/rect";
import { Size } from "../engine/size";
import { Text } from "../engine/text";

export class UserBar extends Rect {
    photo: Image;
    name: Text;
    constructor(
        size: Size,
        canvas: Canvas,
        photoRoute: string,
        nickname: string,
    ) {
        super(
            new Coordinate,
            size,
            canvas,
            "#416177",
            "#fff",
            0.5,
        );
        this.photo = new Image(
            new Coordinate,
            new Size(
                this.size.width * 0.3,
                this.size.height,
            ),
            this.canvas,
            photoRoute,
        );
        this.name = new Text(
            new Coordinate,
            new Size(
                this.size.width * 0.7,
                9,
            ),
            this.canvas,
            nickname,
            "#fff",
        );
    }

    async drawUserBar(initial: Coordinate) {
        this.initial.x = initial.x;
        this.initial.y = initial.y - this.size.height;
        this.photo.initial.x = this.initial.x;
        this.photo.initial.y = this.initial.y;
        this.name.initial.x = this.initial.x + this.photo.size.width;
        this.name.initial.y = this.initial.y;
        this.drawRect();
        await this.photo.drawImage();
        this.name.drawText();
    }
}