import type { Canvas_ENGINE } from "../engine/canvas";
import { Coordinate_ENGINE } from "../engine/coordinate";
import { Image_ENGINE, type PathImage_ENGINE } from "../engine/image";
import { Size_ENGINE } from "../engine/size";
import { Square_ENGINE } from "../engine/square";
import { Text_ENGINE } from "../engine/text";
import type { Pawn_ENGINE } from "./pawn";

export class UserBar_ENGINE extends Square_ENGINE {

    pawn: Pawn_ENGINE;
    photo: Image_ENGINE;
    name: Text_ENGINE;

    constructor(
        pawn: Pawn_ENGINE,
        size: Size_ENGINE,
        canvas: Canvas_ENGINE,
        photoRoute: PathImage_ENGINE | false,
        nickname: string,
    ) {
        super(
            new Coordinate_ENGINE(0, 0),
            size,
            canvas,
            "#416177",
            "#fff",
            0.5,
        );
        this.pawn = pawn;
        this.photo = new Image_ENGINE(
            new Coordinate_ENGINE(0, 0),
            new Size_ENGINE(
                this.size.width * 0.3,
                this.size.height,
            ),
            this.canvas,
            photoRoute,
        );
        this.name = new Text_ENGINE(
            new Coordinate_ENGINE(0, 0),
            this.size.getPercentages(
                new Size_ENGINE(70, 100)
            ),
            this.canvas,
            nickname,
            "#fff",
            false,
            false,
        );
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