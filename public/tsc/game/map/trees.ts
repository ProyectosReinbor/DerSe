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

    constructor(props: {
        map: Map_ENGINE,
        canvas: Canvas_ENGINE
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
                [true, false, false],
                [false, false, false]
            ],
            route: "images/resources/tree.png",
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
                frames: 4,
                framesPerSecond: 4
            })
        });
        this.states = {
            motion: {
                animation: new Animation_ENGINE({
                    frames: 4,
                    framesPerSecond: 4
                }),
                element: {
                    indices: new Plane_ENGINE({ horizontal: 0, vertical: 0 })
                }
            },
            attacked: {
                animation: new Animation_ENGINE({
                    frames: 2,
                    framesPerSecond: 2
                }),
                element: {
                    indices: new Plane_ENGINE({ horizontal: 0, vertical: 1 })
                }
            },
            felled: {
                animation: new Animation_ENGINE({
                    frames: 1,
                    framesPerSecond: 1
                }),
                element: {
                    indices: new Plane_ENGINE({ horizontal: 0, vertical: 2 })
                }
            }
        }
    }

    pushTree(props: {
        boxIndices: Plane_ENGINE,
        state: TreeState
    }): Animations_ENGINE | undefined {
        const tree = this.states[props.state];
        const animations = this.referencePush({
            boxIndices: props.boxIndices
        });
        if (animations === undefined) return undefined;
        animations.element.setIndices(
            new Plane_ENGINE({
                horizontal: tree.element.indices.horizontal,
                vertical: tree.element.indices.vertical
            })
        );
        animations.animation = new Animation_ENGINE({
            frames: tree.animation.frames,
            framesPerSecond: tree.animation.framesPerSecond
        });
        return animations;
    }

    drawTrees() {
        this.drawAnimations();
    }
}