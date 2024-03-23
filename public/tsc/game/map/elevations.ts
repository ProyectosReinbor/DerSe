
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Grounds } from "./grounds.js";
import type { Map } from "../map.js";
import { Plane } from "../../engine/plane.js";

export class Elevations extends Grounds {
    constructor(props: {
        map: Map,
        canvas: Canvas,
    }) {
        super({
            canvas: props.canvas,
            map: props.map,
            route: "images/terrain/ground/elevation.png",
            elementIndices: {
                leftUp: new Plane({ horizontal: 0, vertical: 0 }),
                up: new Plane({ horizontal: 1, vertical: 0 }),
                rightUp: new Plane({ horizontal: 2, vertical: 0 }),
                left: new Plane({ horizontal: 0, vertical: 1 }),
                center: new Plane({ horizontal: 1, vertical: 1 }),
                right: new Plane({ horizontal: 2, vertical: 1 }),
                leftDown: new Plane({ horizontal: 0, vertical: 2 }),
                down: new Plane({ horizontal: 1, vertical: 2 }),
                rightDown: new Plane({ horizontal: 2, vertical: 2 }),
                horizontalLeft: new Plane({ horizontal: 0, vertical: 4 }),
                horizontalCenter: new Plane({ horizontal: 1, vertical: 4 }),
                horizontalRight: new Plane({ horizontal: 2, vertical: 4 }),
                verticalUp: new Plane({ horizontal: 3, vertical: 0 }),
                verticalCenter: new Plane({ horizontal: 3, vertical: 1 }),
                verticalDown: new Plane({ horizontal: 3, vertical: 2 }),
                only: new Plane({ horizontal: 3, vertical: 4 })
            }
        });
    }

    pushElevation(indicesBox: Coordinate) {
        this.pushGround(indicesBox);
    }

    drawElevations() {
        this.drawGrounds();
    }
}
