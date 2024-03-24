import { Coordinate_ENGINE } from "./coordinate";
import { Position_ENGINE } from "./position";
import { Size_ENGINE } from "./size";

export class Camera_ENGINE extends Position_ENGINE {
    constructor(props: { leftUp: Coordinate_ENGINE }) {
        super({
            leftUp: props.leftUp,
            size: new Size_ENGINE({ width: 100, height: 100 })
        });
    }

    positionInsideTheChamber(position: Position_ENGINE) {
        const vision = new Position_ENGINE({
            leftUp: new Coordinate_ENGINE({
                x: this.leftUp.x - position.size.width,
                y: this.leftUp.y - position.size.height,
            }),
            size: new Size_ENGINE({
                width: this.size.width + (position.size.width * 2),
                height: this.size.height + (position.size.height * 2),
            })
        });
        return vision.positionWithinPosition(position);
    }

    positionOnCamera(position: Position_ENGINE) {
        const positionInsideTheChamber = this.positionInsideTheChamber(position);
        if (positionInsideTheChamber === false)
            return false;

        return new Position_ENGINE({
            leftUp: new Coordinate_ENGINE({
                x: position.leftUp.x - this.leftUp.x,
                y: position.leftUp.y - this.leftUp.y,
            }),
            size: new Size_ENGINE({
                width: position.size.width,
                height: position.size.height
            })
        });
    }

    focusPosition(position: Position_ENGINE) {
        let x = position.leftUp.x - (this.size.width / 2);
        x += position.size.width / 2;

        let y = position.leftUp.y - (this.size.height / 2);
        y += position.size.height / 2;

        this.leftUp.x = x;
        this.leftUp.y = y;
    }

}