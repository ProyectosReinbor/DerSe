import { AnimationBoxes } from "../../engine/animationBoxes";
import { Animations } from "../../engine/animations";
import { Animation } from "../../engine/animations/animation";
import { Box } from "../../engine/box";
import type { Canvas } from "../../engine/canvas";
import { Coordinate } from "../../engine/coordinate";
import { Element } from "../../engine/elements/element";
import { Plane } from "../../engine/plane";
import { Size } from "../../engine/size";
import { Map } from "../map";

export class Trees extends AnimationBoxes {
    treesDefault: {
        quitle: Animations,
        motion: Animations,
        felled: Animations,
    }
    constructor(
        map: Map,
        canvas: Canvas
    ) {
        super(
            map.initial.x,
            map.initial.y,
            canvas,
            new Box(
                new Size(map.boxes.width, map.boxes.height),
                new Plane(1, 1),
                true,
            ),
            new Animations(
                new Coordinate,
                new Size,
                canvas,
                "images/terrain/ground/trees.png",
                new Element(
                    new Size(64, 64),
                    new Plane
                ),
                new Animation(8, 8)
            )
        );
        this.treesDefault = {
            quitle: new Animations(
                new Coordinate,
                new Size,
                canvas,
                "images/terrain/ground/trees.png",
                new Element(
                    new Size(64, 64),
                    new Plane
                ),
                new Animation(4, 4)
            ),
            motion: new Animations(
                new Coordinate,
                new Size,
                canvas,
                "images/terrain/ground/trees.png",
                new Element(
                    new Size(64, 64),
                    new Plane(0, 1)
                ),
                new Animation(2, 2)
            ),
            felled: new Animations(
                new Coordinate,
                new Size,
                canvas,
                "images/terrain/ground/trees.png",
                new Element(
                    new Size(64, 64),
                    new Plane(0, 3)
                ),
                new Animation(1, 1)
            )
        }
    }

    setTrees(
        boxes: Coordinate,
        animation: "quitle" | "motion" | "felled"
    ) {
        const animations = this.treesDefault[animation];
        this.setAnimations(
            boxes,
            animations
        );
    }

    async drawTrees() {
        await this.drawAnimations();
    }
}