
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Plane } from "../../engine/plane.js";
import { Grounds } from "./grounds";
import type { Map } from "../map";
import type { Elements } from "../../engine/elements.js";

export class FlatsGrass extends Grounds {
    constructor(props: {
        map: Map,
        canvas: Canvas,
    }) {
        super({
            canvas: props.canvas,
            map: props.map,
            route: "images/terrain/ground/flat.png",
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
                horizontalLeft: new Plane({ horizontal: 0, vertical: 3 }),
                horizontalCenter: new Plane({ horizontal: 1, vertical: 3 }),
                horizontalRight: new Plane({ horizontal: 2, vertical: 3 }),
                verticalUp: new Plane({ horizontal: 3, vertical: 0 }),
                verticalCenter: new Plane({ horizontal: 3, vertical: 1 }),
                verticalDown: new Plane({ horizontal: 3, vertical: 2 }),
                only: new Plane({ horizontal: 3, vertical: 3 })
            }
        });
    }

    pushFlatGrass(indicesBox: Coordinate): Elements | undefined {
        return this.pushGround(indicesBox);
    }

    drawFlatsGrass() {
        this.drawGrounds();
    }
}   