import type { Canvas } from "../engine/canvas.js";
import type { Coordinate } from "../engine/coordinate.js";
import { Plane } from "../engine/plane.js";
import { Grounds } from "./grounds.js";
import type { Map } from "./map.js";

export class Elevations extends Grounds {
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
                horizontalLeft: new Plane(0, 4),
                horizontalCenter: new Plane(1, 4),
                horizontalRight: new Plane(2, 4),
                verticalUp: new Plane(3, 0),
                verticalCenter: new Plane(3, 1),
                verticalDown: new Plane(3, 2),
                only: new Plane(3, 4)
            }
        );
    }

    setElevation(boxes: Coordinate) {
        const route = "images/terrain/ground/elevation.png";
        this.setGround(
            boxes,
            route,
        );
    }

    async drawElevations() {
        await this.drawGrounds();
    }
}
