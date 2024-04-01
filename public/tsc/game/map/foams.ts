import { Animation_ENGINE } from "../../engine/animation";
import { AnimationBoxes_ENGINE } from "../../engine/animationBoxes";
import type { Animations_ENGINE } from "../../engine/animations";
import type { Canvas_ENGINE } from "../../engine/canvas";
import { Element_ENGINE } from "../../engine/element";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_ENGINE } from "../map";


export class Foams_ENGINE extends AnimationBoxes_ENGINE {
    constructor(
        map: Map_ENGINE,
        canvas: Canvas_ENGINE,
    ) {
        super(
            map.leftUp.x,
            map.leftUp.y,
            canvas,
            new Size_ENGINE(
                map.boxes.width,
                map.boxes.height
            ),
            new Plane_ENGINE(3, 3),
            [
                [true, false, false],
                [false, false, false],
                [false, false, false]
            ],
            "images/terrain/water/foam.png",
            new Element_ENGINE(
                new Size_ENGINE(192, 192),
                new Plane_ENGINE(0, 0)
            ),
            new Animation_ENGINE(8, 8)
        );
    }

    pushFoam(boxIndices: Plane_ENGINE): Animations_ENGINE | undefined {
        const foam = this.referencePush(boxIndices);
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