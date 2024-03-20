import type { Canvas } from "../../engine/canvas";
import { Plane } from "../../engine/plane";
import type { Map } from "../map";
import { Ground } from "./ground";

export class FlatSand extends Ground {
    constructor(props: {
        map: Map,
        canvas: Canvas,
    }) {
        super({
            canvas: props.canvas,
            route: "images/terrain/ground/flat.png",
            indices: {
                leftUp: new Plane({
                    horizontal: 5,
                    vertical: 0
                }),
                up: new Plane({
                    horizontal: 6,
                    vertical: 0
                }),
                rightUp: new Plane({
                    horizontal: 7,
                    vertical: 0
                }),
                left: new Plane({
                    horizontal: 5,
                    vertical: 1
                }),
                center: new Plane({
                    horizontal: 6,
                    vertical: 1
                }),
                right: new Plane({
                    horizontal: 7,
                    vertical: 1
                }),
                leftDown: new Plane({
                    horizontal: 5,
                    vertical: 2
                }),
                down: new Plane({
                    horizontal: 6,
                    vertical: 2
                }),
                rightDown: new Plane({
                    horizontal: 7,
                    vertical: 2
                }),
                horizontalLeft: new Plane({
                    horizontal: 5,
                    vertical: 3
                }),
                horizontalCenter: new Plane({
                    horizontal: 6,
                    vertical: 3
                }),
                horizontalRight: new Plane({
                    horizontal: 7,
                    vertical: 3
                }),
                verticalUp: new Plane({
                    horizontal: 8,
                    vertical: 0
                }),
                verticalCenter: new Plane({
                    horizontal: 8,
                    vertical: 1
                }),
                verticalDown: new Plane({
                    horizontal: 8,
                    vertical: 2
                }),
                only: new Plane({
                    horizontal: 8,
                    vertical: 3
                })
            }
        });
    }
}