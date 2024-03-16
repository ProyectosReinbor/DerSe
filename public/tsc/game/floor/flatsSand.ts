
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Plane } from "../../engine/plane.js";
import { Grounds } from "./grounds.js";
import type { Map } from "../map.js";

export class FlatsSand extends Grounds {
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
                leftUp: new Plane(5, 0),
                up: new Plane(6, 0),
                rightUp: new Plane(7, 0),
                left: new Plane(5, 1),
                center: new Plane(6, 1),
                right: new Plane(7, 1),
                leftDown: new Plane(5, 2),
                down: new Plane(6, 2),
                rightDown: new Plane(7, 2),
                horizontalLeft: new Plane(5, 3),
                horizontalCenter: new Plane(6, 3),
                horizontalRight: new Plane(7, 3),
                verticalUp: new Plane(8, 0),
                verticalCenter: new Plane(8, 1),
                verticalDown: new Plane(8, 2),
                only: new Plane(8, 3)
            }
        );
    }

    setFlatSand(boxes: Coordinate) {
        const route = `images/terrain/ground/flat.png`;
        this.setGround(
            boxes,
            route
        );
    }

    async drawFlatsSand() {
        await this.drawGrounds();
    }
}  