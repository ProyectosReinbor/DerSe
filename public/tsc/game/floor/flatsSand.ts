
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Plane } from "../../engine/plane.js";
import { Grounds } from "./grounds.js";
import type { Map } from "../map.js";
import { Size } from "../../engine/size.js";
import { Elements } from "../../engine/elements.js";
import { Element } from "../../engine/elements/element.js";

export class FlatsSand extends Grounds {
    constructor(
        canvas: Canvas,
        map: Map,
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
                leftUp: GroundsDefault(new Plane(5, 0)),
                up: GroundsDefault(new Plane(6, 0)),
                rightUp: GroundsDefault(new Plane(7, 0)),
                left: GroundsDefault(new Plane(5, 1)),
                center: GroundsDefault(new Plane(6, 1)),
                right: GroundsDefault(new Plane(7, 1)),
                leftDown: GroundsDefault(new Plane(5, 2)),
                down: GroundsDefault(new Plane(6, 2)),
                rightDown: GroundsDefault(new Plane(7, 2)),
                horizontalLeft: GroundsDefault(new Plane(5, 3)),
                horizontalCenter: GroundsDefault(new Plane(6, 3)),
                horizontalRight: GroundsDefault(new Plane(7, 3)),
                verticalUp: GroundsDefault(new Plane(8, 0)),
                verticalCenter: GroundsDefault(new Plane(8, 1)),
                verticalDown: GroundsDefault(new Plane(8, 2)),
                only: GroundsDefault(new Plane(8, 3))
            }
        );
    }

    setFlatSand(boxes: Coordinate) {
        this.setGround(boxes);
    }

    async drawFlatsSand() {
        await this.drawGrounds();
    }
}  