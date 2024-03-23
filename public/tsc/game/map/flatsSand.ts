
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Grounds } from "./grounds.js";
import type { Map } from "../map.js";
import { Plane } from "../../engine/plane.js";

export class FlatsSand extends Grounds {
    constructor(props: {
        map: Map,
        canvas: Canvas,
    }) {
        super({
            canvas: props.canvas,
            map: props.map,
            route: "images/terrain/ground/flat.png",
            elementIndices: {
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

    pushFlatSand(indicesBox: Coordinate) {
        return this.pushGround(indicesBox);
    }

    drawFlatsSand() {
        this.drawGrounds();
    }
}  