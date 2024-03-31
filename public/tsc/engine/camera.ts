import { Coordinate_ENGINE } from "./coordinate";
import { Position_ENGINE } from "./position";
import { Size_ENGINE } from "./size";

export class Camera_ENGINE extends Position_ENGINE {
    constructor(
        leftUp: Coordinate_ENGINE,
    ) {
        super(
            leftUp,
            new Size_ENGINE(100, 100)
        );
    }

    insideCamera(
        position: Position_ENGINE
    ) {
        const doubleSize = new Size_ENGINE(
            position.size.width * 2,
            position.size.height * 2
        );

        const vision = new Position_ENGINE(
            new Coordinate_ENGINE(
                this.leftUp.x - position.size.width,
                this.leftUp.y - position.size.height,
            ),
            new Size_ENGINE(
                this.size.width + doubleSize.width,
                this.size.height + doubleSize.height,
            )
        );
        return vision.insidePosition(
            position
        );
    }

    positionOnCamera(
        position: Position_ENGINE
    ) {
        const insideCamera = this.insideCamera(position);
        if (insideCamera === false)
            return false;

        return new Position_ENGINE(
            new Coordinate_ENGINE(
                position.leftUp.x - this.leftUp.x,
                position.leftUp.y - this.leftUp.y,
            ),
            new Size_ENGINE(
                position.size.width,
                position.size.height
            )
        );
    }

    focusPosition(
        position: Position_ENGINE
    ) {
        let x = position.leftUp.x - (this.size.width / 2);
        x += position.size.width / 2;

        let y = position.leftUp.y - (this.size.height / 2);
        y += position.size.height / 2;

        this.leftUp.x = x;
        this.leftUp.y = y;
    }

}