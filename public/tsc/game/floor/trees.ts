import { AnimationBoxes } from "../../engine/animationBoxes";
import { Animations } from "../../engine/animations";
import { Animation } from "../../engine/animation";
import { Box } from "../../engine/box";
import type { Canvas } from "../../engine/canvas";
import { Coordinate } from "../../engine/coordinate";
import { Element } from "../../engine/element";
import { Plane } from "../../engine/plane";
import { Size } from "../../engine/size";
import { Map } from "../map";

export type TreeState = "motion" | "attacked" | "felled";
export type TreeElementIndices = {
    [key in TreeState]: Plane;
};

export class Trees extends AnimationBoxes {
    elementIndices: TreeElementIndices;
    constructor(props: {
        map: Map,
        canvas: Canvas
    }) {
        super({
            map.initial.x,
            map.initial.y,
            canvas,
            new Box(
                new Size(map.boxes.width, map.boxes.height),
                new Plane(3, 3),
                [
                    [true, false, false],
                    [true, false, false],
                    [false, false, false]
                ]
            )
        });
        const TreesDefault = (
            plane: Plane,
            animation: Animation
        ) => new Animations(
            new Coordinate,
            new Size,
            canvas,
            "images/resources/tree.png",
            new Element(
                new Size(192, 192),
                plane
            ),
            animation
        );

        this.treesDefault = {
            motion: TreesDefault(new Plane, new Animation(4, 4)),
            attacked: TreesDefault(new Plane(0, 1), new Animation(2, 2)),
            felled: TreesDefault(new Plane(0, 2), new Animation(1, 1))
        }
    }

    setTrees(
        boxes: Coordinate,
        animation: "motion" | "attacked" | "felled"
    ) {
        const animations = this.treesDefault[animation];
        this.setAnimations(
            boxes,
            animations
        );
    }

    drawTrees() {
        this.drawAnimations();
    }
}