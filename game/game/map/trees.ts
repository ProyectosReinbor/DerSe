import { Animation_ENGINE } from "../../engine/animation";
import { AnimationBoxes_ENGINE } from "../../engine/animationBoxes";
import type { Animations_ENGINE } from "../../engine/animations";
import type { Canvas_ENGINE } from "../../engine/canvas";
import { Element_ENGINE } from "../../engine/element";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_ENGINE } from "../map";

export type TreeState = "motion" | "attacked" | "felled";
export type TreeStates = {
    [key in TreeState]: {
        animation: Animation_ENGINE;
        element: {
            indices: Plane_ENGINE;
        }
    };
};

export class Trees_ENGINE extends AnimationBoxes_ENGINE {

    states: TreeStates;

    constructor(
        map: Map_ENGINE,
        canvas: Canvas_ENGINE
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
                [true, false, false],
                [false, false, false]
            ],
            "images/resources/tree.png",
            new Element_ENGINE(
                new Size_ENGINE(192, 192),
                new Plane_ENGINE(0, 0)
            ),
            new Animation_ENGINE(4, 4)
        );
        this.states = {
            motion: {
                animation: new Animation_ENGINE(4, 4),
                element: {
                    indices: new Plane_ENGINE(0, 0)
                }
            },
            attacked: {
                animation: new Animation_ENGINE(2, 2),
                element: {
                    indices: new Plane_ENGINE(0, 1)
                }
            },
            felled: {
                animation: new Animation_ENGINE(1, 1),
                element: {
                    indices: new Plane_ENGINE(0, 2)
                }
            }
        }
    }

    pushTree(
        boxIndices: Plane_ENGINE,
        state: TreeState
    ): Animations_ENGINE | undefined {
        const tree = this.states[state];
        const animations = this.referencePush(boxIndices);
        if (animations === undefined) return undefined;
        animations.element.setIndices(
            new Plane_ENGINE(
                tree.element.indices.horizontal,
                tree.element.indices.vertical
            )
        );
        animations.animation = new Animation_ENGINE(
            tree.animation.frames,
            tree.animation.framesPerSecond
        );
        return animations;
    }

    drawTrees() {
        this.drawAnimations();
    }
}