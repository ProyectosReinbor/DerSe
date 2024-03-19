
import type { Canvas } from "../../engine/canvas";
import { Coordinate } from "../../engine/coordinate";
import { Element } from "../../engine/element.js";
import { Elements } from "../../engine/elements";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size";
import type { Map } from "../map";

export type GroundPositions = "leftUp" | "up" | "rightUp" |
    "left" | "center" | "right" |
    "leftDown" | "down" | "rightDown" |
    "horizontalLeft" | "horizontalCenter" | "horizontalRight" |
    "verticalUp" | "verticalCenter" | "verticalDown" |
    "only";

export type GroundIndices = {
    [key in GroundPositions]: Plane;
};

export class Ground extends Elements {
    indices: GroundIndices;
    constructor(props: {
        canvas: Canvas;
        route: string;
        indices: GroundIndices;
    }) {
        super({
            initial: new Coordinate({ x: 0, y: 0 }),
            size: new Size({ width: 0, height: 0 }),
            canvas: props.canvas,
            route: props.route,
            element: new Element({
                size: new Size({ width: 64, height: 64 }),
                indices: new Plane({ horizontal: 0, vertical: 0 })
            })
        });
        this.indices = props.indices;
    }

    setElementIndices(position: GroundPositions) {
        const newIndices = this.indices[position];
        this.element.indices = new Plane({
            horizontal: newIndices.horizontal,
            vertical: newIndices.vertical
        });
    }

    drawGround() {
        this.drawElement();
    }
}
