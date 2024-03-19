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
            coordinateOfBoxes,
            new Size(
                this.boxDefault.size.width * this.boxDefault.length.horizontal,
                this.boxDefault.size.height * this.boxDefault.length.vertical,
            ),
            this.canvas,
            animationsDefault.route,
            new Element(
                new Size(
                    animationsDefault.element.size.width,
                    animationsDefault.element.size.height
                ),
                new Plane(
                    0,
                    animationsDefault.element.vertical
                ),
            ),
            animationsDefault.animation
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