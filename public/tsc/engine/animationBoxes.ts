import { Animation_ENGINE } from "./animation";
import { Animations_ENGINE } from "./animations";
import type { OccupiedBoxes } from "./boxes";
import type { Canvas_ENGINE } from "./canvas";
import { Element_ENGINE } from "./element";
import { ElementBoxes } from "./elementBoxes";
import type { ImagePath } from "./image";
import { Plane_ENGINE } from "./plane";
import { Size_ENGINE } from "./size";

export class AnimationBoxes_ENGINE extends ElementBoxes {

    override references: Animations_ENGINE[] = [];
    animation: Animation_ENGINE;

    constructor(props: {
        x: number;
        y: number;
        canvas: Canvas_ENGINE;
        size: Size_ENGINE;
        length: Plane_ENGINE;
        occupied: OccupiedBoxes;
        route: ImagePath;
        element: Element_ENGINE;
        animation: Animation_ENGINE;
    }) {
        super({
            x: props.x,
            y: props.y,
            canvas: props.canvas,
            size: props.size,
            length: props.length,
            occupied: props.occupied,
            route: props.route,
            element: props.element,
        });
        this.animation = props.animation;
    }

    override referencePush(props: {
        boxIndices: Plane_ENGINE;
    }): Animations_ENGINE | undefined {
        const position = this.getPosition({
            boxIndices: props.boxIndices
        });
        const reference = new Animations_ENGINE({
            leftUp: position.leftUp,
            size: position.size,
            canvas: this.canvas,
            route: this.route,
            element: new Element_ENGINE({
                size: new Size_ENGINE({
                    width: this.element.size.width,
                    height: this.element.size.height
                }),
                indices: new Plane_ENGINE({
                    horizontal: 0,
                    vertical: this.element.getIndices().vertical
                })
            }),
            animation: new Animation_ENGINE({
                frames: this.animation.frames,
                framesPerSecond: this.animation.framesPerSecond
            })
        });
        const indexReference = this.referencesPush({
            boxIndices: props.boxIndices,
            reference
        });
        if (indexReference === undefined)
            return undefined;

        return this.references[indexReference];
    }

    drawAnimations() {
        this.references.forEach(
            animations => animations.drawAnimation()
        );
    }
}