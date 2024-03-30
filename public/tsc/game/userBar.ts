import type { Canvas_ENGINE } from "../engine/canvas";
import { Coordinate_ENGINE } from "../engine/coordinate";
import { Image_ENGINE, type ImagePath } from "../engine/image";
import { Size_ENGINE } from "../engine/size";
import { Square_ENGINE } from "../engine/square";
import { Text_ENGINE } from "../engine/text";
import type { Pawn_ENGINE } from "./pawn";

export class UserBar_ENGINE extends Square_ENGINE {

    pawn: Pawn_ENGINE;
    photo: Image_ENGINE;
    name: Text_ENGINE;

    constructor(props: {
        pawn: Pawn_ENGINE,
        size: Size_ENGINE,
        canvas: Canvas_ENGINE,
        photoRoute: ImagePath,
        nickname: string,
    }) {
        super({
            leftUp: new Coordinate_ENGINE({
                x: 0,
                y: 0
            }),
            size: props.size,
            canvas: props.canvas,
            fillStyle: "#416177",
            strokeStyle: "#fff",
            lineWidth: 0.5,
        });
        this.pawn = props.pawn;
        this.photo = new Image_ENGINE({
            leftUp: new Coordinate_ENGINE({
                x: 0,
                y: 0
            }),
            size: new Size_ENGINE({
                width: this.size.width * 0.3,
                height: this.size.height,
            }),
            canvas: this.canvas,
            route: props.photoRoute,
        });
        this.name = new Text_ENGINE({
            leftUp: new Coordinate_ENGINE({
                x: 0,
                y: 0
            }),
            size: this.size.getPercentages({
                percentages: new Size_ENGINE({
                    width: 70,
                    height: 100
                })
            }),
            canvas: this.canvas,
            value: props.nickname,
            fillStyle: "#fff",
            strokeStyle: false,
            dungeonFont: false,
        });
    }

    drawUserBar() {
        this.leftUp.x = this.pawn.leftUp.x;
        this.leftUp.y = this.pawn.leftUp.y - this.size.height;
        this.photo.leftUp.x = this.leftUp.x;
        this.photo.leftUp.y = this.leftUp.y;
        this.name.leftUp.x = this.leftUp.x + this.photo.size.width;
        this.name.leftUp.y = this.leftUp.y;
        this.drawSquare();
        this.photo.drawImage();
        this.name.drawText();
    }
}