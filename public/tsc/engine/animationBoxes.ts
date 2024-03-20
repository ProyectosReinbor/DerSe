import { Animations } from "./animations";
import { Boxes } from "./boxes";
import type { Coordinate } from "./coordinate";
import { Element } from "./element";
import { Plane } from "./plane";
import { Size } from "./size";

export class AnimationBoxes extends Boxes {
    animationGroup: Animations[] = [];

    setAnimations(
        boxes: Coordinate,
        animationsDefault: Animations
    ) {
        const index = this.boxIndex(boxes);
        if (index !== false) return false;
        const coordinateOfBoxes = this.getCoordinateOfBoxes(boxes);
        const newAnimations = new Animations({
            initial: coordinateOfBoxes,
            size: new Size({
                width: this.default.size.width * this.default.length.horizontal,
                height: this.default.size.height * this.default.length.vertical,
            }),
            canvas: this.canvas,
            route: animationsDefault.route,
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