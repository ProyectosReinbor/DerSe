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

    insideCamera(props: {
        position: Position_ENGINE;
    }) {
        const doubleSize = new Size_ENGINE({
            width: props.position.size.width * 2,
            height: props.position.size.height * 2
        });

        const vision = new Position_ENGINE({
            leftUp: new Coordinate_ENGINE({
                x: this.leftUp.x - props.position.size.width,
                y: this.leftUp.y - props.position.size.height,
            }),
            size: new Size_ENGINE({
                width: this.size.width + doubleSize.width,
                height: this.size.height + doubleSize.height,
            })
        });
        return vision.insidePosition({
            position: props.position
        });
    }

    positionOnCamera(props: {
        position: Position_ENGINE;
    }) {
        const insideCamera = this.insideCamera({
            position: props.position
        });
        if (insideCamera === false)
            return false;

        return new Position_ENGINE({
            leftUp: new Coordinate_ENGINE({
                x: props.position.leftUp.x - this.leftUp.x,
                y: props.position.leftUp.y - this.leftUp.y,
            }),
            size: new Size_ENGINE({
                width: props.position.size.width,
                height: props.position.size.height
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