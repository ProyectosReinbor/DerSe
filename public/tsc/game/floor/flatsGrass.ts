
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Plane } from "../../engine/plane.js";
import { Grounds } from "./grounds";
import type { Map } from "../map";
import { Size } from "../../engine/size.js";
import { Elements } from "../../engine/elements.js";
import { Element } from "../../engine/elements/element.js";

export class FlatsGrass extends Grounds {
    constructor(
        map: Map,
        canvas: Canvas,
    ) {
        const GroundsDefault = (plane: Plane) => new Elements(
            new Coordinate,
            new Size,
            canvas,
            "images/terrain/ground/flat.png",
            new Element(
                new Size(64, 64),
                plane
            )
        );
        super(
            map.initial.x,
            map.initial.y,
            canvas,
            map,
            {
                leftUp: GroundsDefault(new Plane(0, 0)),
                up: GroundsDefault(new Plane(1, 0)),
                rightUp: GroundsDefault(new Plane(2, 0)),
                left: GroundsDefault(new Plane(0, 1)),
                center: GroundsDefault(new Plane(1, 1)),
                right: GroundsDefault(new Plane(2, 1)),
                leftDown: GroundsDefault(new Plane(0, 2)),
                down: GroundsDefault(new Plane(1, 2)),
                rightDown: GroundsDefault(new Plane(2, 2)),
                horizontalLeft: GroundsDefault(new Plane(0, 3)),
                horizontalCenter: GroundsDefault(new Plane(1, 3)),
                horizontalRight: GroundsDefault(new Plane(2, 3)),
                verticalUp: GroundsDefault(new Plane(3, 0)),
                verticalCenter: GroundsDefault(new Plane(3, 1)),
                verticalDown: GroundsDefault(new Plane(3, 2)),
                only: GroundsDefault(new Plane(3, 3))
            }
        );
    }

    setFlatGrass(boxes: Coordinate) {
        this.setGround(boxes);
    }

    async drawFlatsGrass() {
        await this.drawGrounds();
    }
}   