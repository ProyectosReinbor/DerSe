import { Animations } from "./animations";
import { Boxes } from "./boxes";
import type { Coordinate } from "./coordinate";
import { Element } from "./element";
import { Plane } from "./plane";
import { Size } from "./size";

export class AnimationBoxes extends Boxes {
    override references: Animations[] = [];

    pushAnimations(
        boxes: Coordinate,
    ): Animations | undefined {
        const index = this.getBox(boxes);
        if (index !== undefined) return undefined;

        const reference = this.reference(boxes);
        const newAnimations = new Animations({
            initial: reference.initial,
            size: reference.size,
            canvas: this.canvas,
            route: image.route,
            element: new Element({
                size: new Size({
                    width: animationsDefault.element.size.width,
                    height: animationsDefault.element.size.height
                }),
                indices: new Plane({
                    horizontal: 0,
                    vertical: animationsDefault.element.indices.vertical
                })
            }),
            animation: animationsDefault.animation
        });
        this.animationGroup.push(newAnimations);
        const newIndex = this.animationGroup.length - 1;
        this.setBoxIndex(newIndex, boxes);
        return newIndex;
    }

    drawAnimations() {
        this.animationGroup.forEach(
            animations => animations.drawAnimation()
        );
    }
}