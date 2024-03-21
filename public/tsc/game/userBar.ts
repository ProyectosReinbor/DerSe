import { Canvas } from "../engine/canvas";
import { Coordinate } from "../engine/coordinate";
import { Image, type ImageRoute } from "../engine/image";
import { Rect } from "../engine/rect";
import { Size } from "../engine/size";
import { Text } from "../engine/text";

export class UserBar extends Rect {
    photo: Image;
    name: Text;
    constructor(props: {
        size: Size,
        canvas: Canvas,
        photoRoute: ImageRoute,
        nickname: string,
    }) {
        super({
            initial: new Coordinate({ x: 0, y: 0 }),
            size: props.size,
            canvas: props.canvas,
            fillStyle: "#416177",
            strokeStyle: "#fff",
            lineWidth: 0.5,
        });
        this.photo = new Image({
            initial: new Coordinate({ x: 0, y: 0 }),
            size: new Size({
                width: this.size.width * 0.3,
                height: this.size.height,
            }),
            canvas: this.canvas,
            route: props.photoRoute,
        });
        this.name = new Text({
            initial: new Coordinate({ x: 0, y: 0 }),
            size: this.size.percentage(
                new Size({
                    width: 70,
                    height: 100
                })
            ),
            canvas: this.canvas,
            value: props.nickname,
            fillStyle: "#fff",
            strokeStyle: false,
            dungeonFont: false,
        });
    }

    drawUserBar(initial: Coordinate) {
        this.initial.x = initial.x;
        this.initial.y = initial.y - this.size.height;
        this.photo.initial.x = this.initial.x;
        this.photo.initial.y = this.initial.y;
        this.name.initial.x = this.initial.x + this.photo.size.width;
        this.name.initial.y = this.initial.y;
        this.drawRect();
        this.photo.drawImage();
        this.name.drawText();
    }
}