import { AnimationBoxes } from "../../engine/animationBoxes";
import { Animation } from "../../engine/animation";
import type { Canvas } from "../../engine/canvas";
import { Coordinate } from "../../engine/coordinate";
import { Element } from "../../engine/element";
import { Plane } from "../../engine/plane";
import { Size } from "../../engine/size";
import { Map } from "../map";
import type { Animations } from "../../engine/animations";

export type TreeState = "motion" | "attacked" | "felled";
export type TreeStates = {
    [key in TreeState]: {
        animation: Animation;
        element: {
            indices: Plane;
        }
    };
};

export class Trees extends AnimationBoxes {
    states: TreeStates;
    constructor(props: {
        map: Map,
        canvas: Canvas
    }) {
        super({
            x: props.map.initial.x,
            y: props.map.initial.y,
            canvas: props.canvas,
            size: new Size({
                width: props.map.boxes.width,
                height: props.map.boxes.height
            }),
            length: new Plane({
                horizontal: 3,
                vertical: 3
            }),
            occupied: [
                [true, false, false],
                [true, false, false],
                [false, false, false]
            ],
            route: "images/resources/tree.png",
            element: new Element({
                size: new Size({ width: 192, height: 192 }),
                indices: new Plane({ horizontal: 0, vertical: 0 })
            }),
            animation: new Animation({ frames: 4, framesPerSecond: 4 })
        });
        this.states = {
            motion: {
                animation: new Animation({
                    frames: 4,
                    framesPerSecond: 4
                }),
                element: {
                    indices: new Plane({ horizontal: 0, vertical: 0 })
                }
            },
            attacked: {
                animation: new Animation({
                    frames: 2,
                    framesPerSecond: 2
                }),
                element: {
                    indices: new Plane({ horizontal: 0, vertical: 1 })
                }
            },
            felled: {
                animation: new Animation({
                    frames: 1,
                    framesPerSecond: 1
                }),
                element: {
                    indices: new Plane({ horizontal: 0, vertical: 2 })
                }
            }
        }
    }

    pushTree(
        indicesBox: Coordinate,
        state: TreeState
    ): Animations | undefined {
        const tree = this.states[state];
        const animations = this.referencePush(indicesBox);
        if (animations === undefined) return undefined;
        animations.element.setIndices(
            new Plane({
                horizontal: tree.element.indices.horizontal,
                vertical: tree.element.indices.vertical
            })
        );
        animations.animation = new Animation({
            frames: tree.animation.frames,
            framesPerSecond: tree.animation.framesPerSecond
        });
        return animations;
    }

    drawTrees() {
        this.drawAnimations();
    }
}