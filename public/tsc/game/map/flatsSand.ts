import type { Canvas_ENGINE } from "../../engine/canvas";
import { Plane_ENGINE } from "../../engine/plane";
import type { Map_GAME } from "../map";
import { Grounds_FLOOR } from "./grounds";


export class FlatsSand_FLOOR extends Grounds_FLOOR {
    constructor(props: {
        map: Map_GAME,
        canvas: Canvas_ENGINE
    }) {
        super({
            canvas: props.canvas,
            map: props.map,
            route: "images/terrain/ground/flat.png",
            elementIndices: {
                leftUp: new Plane_ENGINE({
                    horizontal: 5,
                    vertical: 0
                }),
                up: new Plane_ENGINE({
                    horizontal: 6,
                    vertical: 0
                }),
                rightUp: new Plane_ENGINE({
                    horizontal: 7,
                    vertical: 0
                }),
                left: new Plane_ENGINE({
                    horizontal: 5,
                    vertical: 1
                }),
                center: new Plane_ENGINE({
                    horizontal: 6,
                    vertical: 1
                }),
                right: new Plane_ENGINE({
                    horizontal: 7,
                    vertical: 1
                }),
                leftDown: new Plane_ENGINE({
                    horizontal: 5,
                    vertical: 2
                }),
                down: new Plane_ENGINE({
                    horizontal: 6,
                    vertical: 2
                }),
                rightDown: new Plane_ENGINE({
                    horizontal: 7,
                    vertical: 2
                }),
                horizontalLeft: new Plane_ENGINE({
                    horizontal: 5,
                    vertical: 3
                }),
                horizontalCenter: new Plane_ENGINE({
                    horizontal: 6,
                    vertical: 3
                }),
                horizontalRight: new Plane_ENGINE({
                    horizontal: 7,
                    vertical: 3
                }),
                verticalUp: new Plane_ENGINE({
                    horizontal: 8,
                    vertical: 0
                }),
                verticalCenter: new Plane_ENGINE({
                    horizontal: 8,
                    vertical: 1
                }),
                verticalDown: new Plane_ENGINE({
                    horizontal: 8,
                    vertical: 2
                }),
                only: new Plane_ENGINE({
                    horizontal: 8,
                    vertical: 3
                })
            }
        });
    }

    pushFlatSand(props: {
        boxIndices: Plane_ENGINE;
    }) {
        return this.pushGround({
            boxIndices: props.boxIndices
        });
    }

    drawFlatsSand() {
        this.drawGrounds();
    }
}  