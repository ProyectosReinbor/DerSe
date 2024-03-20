import { Animation } from "./animation";
import { Animations } from "./animations";
import type { BoxesOccupied } from "./boxes";
import type { Canvas } from "./canvas";
import type { Coordinate } from "./coordinate";
import { Element } from "./element";
import { ElementBoxes } from "./elementBoxes";
import type { ImageRoute } from "./image";
import { Plane } from "./plane";
import { Size } from "./size";

export class AnimationBoxes extends ElementBoxes {
    override references: Animations[] = [];
    animation: Animation;

    constructor(props: {
        x: number;
        y: number;
        canvas: Canvas;
        size: Size;
        length: Plane;
        occupied: BoxesOccupied;
        route: ImageRoute;
        element: Element;
        animation: Animation;
    }) {
        super(props);
        this.animation = props.animation;
    }

    override referencePush(indicesBox: Coordinate): Animations | undefined {
        const position = this.getPosition(indicesBox);
        const newAnimations = new Animations({
            initial: position.initial,
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
                    vertical: this.element.indices.vertical
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