import { Animation_ENGINE } from "../../engine/animation";
import { AnimationBoxes_ENGINE } from "../../engine/animationBoxes";
import type { Animations_ENGINE } from "../../engine/animations";
import type { Canvas_ENGINE } from "../../engine/canvas";
import { Element_ENGINE } from "../../engine/element";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_GAME } from "../map";


export class Foams_FLOOR extends AnimationBoxes_ENGINE {
    constructor(props: {
        map: Map_GAME,
        canvas: Canvas_ENGINE,
    }) {
        super({
            x: props.map.leftUp.x,
            y: props.map.leftUp.y,
            canvas: props.canvas,
            size: new Size_ENGINE({
                width: props.map.boxes.width,
                height: props.map.boxes.height
            }),
            length: new Plane_ENGINE({
                horizontal: 3,
                vertical: 3
            }),
            occupied: [
                [true, false, false],
                [false, false, false],
                [false, false, false]
            ],
            route: "images/terrain/water/foam.png",
            element: new Element_ENGINE({
                size: new Size_ENGINE({
                    width: 192,
                    height: 192
                }),
                indices: new Plane_ENGINE({
                    horizontal: 0,
                    vertical: 0
                })
            }),
            animation: new Animation_ENGINE({
                frames: 8,
                framesPerSecond: 8
            })
        });
    }

    pushFoam(props: {
        boxIndices: Plane_ENGINE;
    }): Animations_ENGINE | undefined {
        const foam = this.referencePush({
            boxIndices: props.boxIndices
        });
        if (foam === undefined)
            return undefined;

        foam.leftUp.x -= this.size.width;
        foam.leftUp.y -= this.size.height;
        return foam;
    }

    drawFoams() {
        this.drawAnimations();
    }
}