import type { Canvas } from "../engine/canvas";
import type { Coordinate } from "../engine/coordinate";
import { Plane } from "../engine/plane";
import { Grounds } from "./grounds";
import type { Map } from "./map";

export class FlatsGrass extends Grounds {
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        map: Map,
    ) {
        super(
            x, y,
            canvas,
            map,
            {
                leftUp: new Plane(0, 0),
                up: new Plane(1, 0),
                rightUp: new Plane(2, 0),
                left: new Plane(0, 1),
                center: new Plane(1, 1),
                right: new Plane(2, 1),
                leftDown: new Plane(0, 2),
                down: new Plane(1, 2),
                rightDown: new Plane(2, 2),
                horizontalLeft: new Plane(0, 3),
                horizontalCenter: new Plane(1, 3),
                horizontalRight: new Plane(2, 3),
                verticalUp: new Plane(3, 0),
                verticalCenter: new Plane(3, 1),
                verticalDown: new Plane(3, 2),
                only: new Plane(3, 3)
            }
        );
    }

    setFlatGrass(boxes: Coordinate) {
        const route = `images/terrain/ground/flat.png`;
        this.setGround(
            boxes,
            route
        );
    }

    async drawFlatsGrass() {
        await this.drawGrounds();
    }
}   