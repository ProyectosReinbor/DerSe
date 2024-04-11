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

    positionInsideTheChamber(
        position: Position_ENGINE
    ): boolean {
        const doubleSize = new Size_ENGINE(
            position.getSize().getWidth() * 2,
            position.getSize().getHeight() * 2
        );

        const vision = new Position_ENGINE(
            new Coordinate_ENGINE(
                this.getLeftUp().getX() - position.getSize().getWidth(),
                this.getLeftUp().getY() - position.getSize().getHeight(),
            ),
            new Size_ENGINE(
                this.getSize().getWidth() + doubleSize.getWidth(),
                this.getSize().getHeight() + doubleSize.getHeight(),
            )
        );
        return vision.positionWithinPosition(
            position
        );
    }

    positionOnCamera(
        position: Position_ENGINE
    ): Position_ENGINE | false {
        if (this.positionInsideTheChamber(position) === false)
            return false;

        return new Position_ENGINE(
            new Coordinate_ENGINE(
                position.getLeftUp().getX() - this.getLeftUp().getX(),
                position.getLeftUp().getY() - this.getLeftUp().getY(),
            ),
            new Size_ENGINE(
                position.getSize().getWidth(),
                position.getSize().getHeight()
            )
        );
    }

    focusPosition(
        position: Position_ENGINE
    ): void {
        let x = position.getLeftUp().getX() - (this.getSize().getWidth() / 2);
        x += position.getSize().getWidth() / 2;

        let y = position.getLeftUp().getY() - (this.getSize().getHeight() / 2);
        y += position.getSize().getHeight() / 2;

        this.getLeftUp().setX(x);
        this.getLeftUp().setY(y);
    }

}