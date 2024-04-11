import type { Canvas_ENGINE } from "../../engine/canvas";
import { Plane_ENGINE } from "../../engine/plane";
import type { Map_ENGINE } from "../map";
import { Grounds_ENGINE } from "./grounds";


export class FlatsSand_ENGINE extends Grounds_ENGINE {
    constructor(
        map: Map_ENGINE,
        canvas: Canvas_ENGINE
    ) {
        super(
            map,
            canvas,
            "images/terrain/ground/flat.png",
            {
                leftUp: new Plane_ENGINE(5, 0),
                up: new Plane_ENGINE(6, 0),
                rightUp: new Plane_ENGINE(7, 0),
                left: new Plane_ENGINE(5, 1),
                center: new Plane_ENGINE(6, 1),
                right: new Plane_ENGINE(7, 1),
                leftDown: new Plane_ENGINE(5, 2),
                down: new Plane_ENGINE(6, 2),
                rightDown: new Plane_ENGINE(7, 2),
                horizontalLeft: new Plane_ENGINE(5, 3),
                horizontalCenter: new Plane_ENGINE(6, 3),
                horizontalRight: new Plane_ENGINE(7, 3),
                verticalUp: new Plane_ENGINE(8, 0),
                verticalCenter: new Plane_ENGINE(8, 1),
                verticalDown: new Plane_ENGINE(8, 2),
                only: new Plane_ENGINE(8, 3)
            }
        );
    }

    pushFlatSand(boxIndices: Plane_ENGINE) {
        return this.pushGround(boxIndices);
    }

    drawFlatsSand() {
        this.drawGrounds();
    }
}  