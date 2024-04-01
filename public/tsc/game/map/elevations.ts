import type { Canvas_ENGINE } from "../../engine/canvas";
import { Plane_ENGINE } from "../../engine/plane";
import type { Map_ENGINE } from "../map";
import { Grounds_ENGINE } from "./grounds";

export class Elevations_ENGINE extends Grounds_ENGINE {
    constructor(
        canvas: Canvas_ENGINE,
        map: Map_ENGINE,
    ) {
        super(
            map,
            canvas,
            "images/terrain/ground/elevation.png",
            {
                leftUp: new Plane_ENGINE(0, 0),
                up: new Plane_ENGINE(1, 0),
                rightUp: new Plane_ENGINE(2, 0),
                left: new Plane_ENGINE(0, 1),
                center: new Plane_ENGINE(1, 1),
                right: new Plane_ENGINE(2, 1),
                leftDown: new Plane_ENGINE(0, 2),
                down: new Plane_ENGINE(1, 2),
                rightDown: new Plane_ENGINE(2, 2),
                horizontalLeft: new Plane_ENGINE(0, 4),
                horizontalCenter: new Plane_ENGINE(1, 4),
                horizontalRight: new Plane_ENGINE(2, 4),
                verticalUp: new Plane_ENGINE(3, 0),
                verticalCenter: new Plane_ENGINE(3, 1),
                verticalDown: new Plane_ENGINE(3, 2),
                only: new Plane_ENGINE(3, 4)
            }
        );
    }

    pushElevation(boxIndices: Plane_ENGINE) {
        this.pushGround(boxIndices);
    }

    drawElevations() {
        this.drawGrounds();
    }
}
