import { Animation_ENGINE } from "./animation";
import { Animations_ENGINE } from "./animations";
import type { Canvas_ENGINE } from "./canvas";
import type { Coordinate_ENGINE } from "./coordinate";
import { Element_ENGINE } from "./element";
import { ElementBoxes } from "./elementBoxes";
import type { ImagePath } from "./image";
import type { Plane_ENGINE } from "./plane";
import type { Size_ENGINE } from "./size";

export class AnimationBoxes_ENGINE extends ElementBoxes {

    override references: Animations_ENGINE[] = [];
    animation: Animation_ENGINE;

    constructor(props: {
        x: number;
        y: number;
        canvas: Canvas_ENGINE;
        size: Size_ENGINE;
        length: Plane_ENGINE;
        occupied: BoxesOccupied;
        route: ImagePath;
        element: Element_ENGINE;
        animation: Animation_ENGINE;
    }) {
        super(props);
        this.animation = props.animation;
    }

    override referencePush(
        indicesBox: Coordinate_ENGINE
    ): Animations_ENGINE | undefined {
        const position = this.getPosition(indicesBox);
        const newAnimations = new Animations_ENGINE({
            leftUp: position.leftUp,
            size: position.size,
            canvas: this.canvas,
            route: this.route,
            element: new Element({
                size: new Size({
                    width: this.element.size.width,
                    height: this.element.size.height
                }),
                indices: new Plane({
                    horizontal: 0,
                    vertical: this.element.getIndices().vertical
                })
            }),
            animation: new Animation({
                frames: this.animation.frames,
                framesPerSecond: this.animation.framesPerSecond
            })
        });
        const indexReference = this.referencesPush(indicesBox, newAnimations);
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