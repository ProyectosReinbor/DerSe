import type { Canvas_ENGINE } from "../../engine/canvas";
import { Plane_ENGINE } from "../../engine/plane";
import type { Map_ENGINE } from "../map";
import { Grounds_ENGINE } from "./grounds";

export class Elevations_ENGINE extends Grounds_ENGINE {
    constructor(props: {
        map: Map_ENGINE,
        canvas: Canvas_ENGINE,
    }) {
        super({
            canvas: props.canvas,
            map: props.map,
            route: "images/terrain/ground/elevation.png",
            elementIndices: {
                leftUp: new Plane_ENGINE({
                    horizontal: 0,
                    vertical: 0
                }),
                up: new Plane_ENGINE({
                    horizontal: 1,
                    vertical: 0
                }),
                rightUp: new Plane_ENGINE({
                    horizontal: 2,
                    vertical: 0
                }),
                left: new Plane_ENGINE({
                    horizontal: 0,
                    vertical: 1
                }),
                center: new Plane_ENGINE({
                    horizontal: 1,
                    vertical: 1
                }),
                right: new Plane_ENGINE({
                    horizontal: 2,
                    vertical: 1
                }),
                leftDown: new Plane_ENGINE({
                    horizontal: 0,
                    vertical: 2
                }),
                down: new Plane_ENGINE({
                    horizontal: 1,
                    vertical: 2
                }),
                rightDown: new Plane_ENGINE({
                    horizontal: 2,
                    vertical: 2
                }),
                horizontalLeft: new Plane_ENGINE({
                    horizontal: 0,
                    vertical: 4
                }),
                horizontalCenter: new Plane_ENGINE({
                    horizontal: 1,
                    vertical: 4
                }),
                horizontalRight: new Plane_ENGINE({
                    horizontal: 2,
                    vertical: 4
                }),
                verticalUp: new Plane_ENGINE({
                    horizontal: 3,
                    vertical: 0
                }),
                verticalCenter: new Plane_ENGINE({
                    horizontal: 3,
                    vertical: 1
                }),
                verticalDown: new Plane_ENGINE({
                    horizontal: 3,
                    vertical: 2
                }),
                only: new Plane_ENGINE({
                    horizontal: 3,
                    vertical: 4
                })
            }
        });
    }

    pushElevation(props: {
        boxIndices: Plane_ENGINE;
    }) {
        this.pushGround({
            boxIndices: props.boxIndices
        });
    }

    drawElevations() {
        this.drawGrounds();
    }
}
