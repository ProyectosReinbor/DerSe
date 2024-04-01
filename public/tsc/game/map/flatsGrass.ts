import type { Canvas_ENGINE } from "../../engine/canvas";
import type { Elements_ENGINE } from "../../engine/elements";
import { Plane_ENGINE } from "../../engine/plane";
import type { Map_ENGINE } from "../map";
import { Grounds_ENGINE } from "./grounds";

export class FlatsGrass_ENGINE extends Grounds_ENGINE {
    constructor(
        map: Map_ENGINE,
        canvas: Canvas_ENGINE,
    ) {
        super(
            map,
            canvas,
            "images/terrain/ground/flat.png",
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
                horizontalLeft: new Plane_ENGINE(0, 3),
                horizontalCenter: new Plane_ENGINE(1, 3),
                horizontalRight: new Plane_ENGINE(2, 3),
                verticalUp: new Plane_ENGINE(3, 0),
                verticalCenter: new Plane_ENGINE(3, 1),
                verticalDown: new Plane_ENGINE(3, 2),
                only: new Plane_ENGINE(3, 3)
            }
        );
    }

    pushFlatGrass(boxIndices: Plane_ENGINE): Elements_ENGINE | undefined {
        return this.pushGround(boxIndices);
    }

    drawFlatsGrass() {
        this.drawGrounds();
    }
}   