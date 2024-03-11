import { Animations } from "./animations.js";
import { Boxes } from "./boxes.js";
import { Size } from "./size.js";

export class AnimationBoxes extends Boxes {
    constructor(
        x, y,
        canvas,
        factorySizeWidth,
        factorySizeHeight,
        factoryBoxesHorizontal,
        factoryBoxesVertical,
        factoryOccupiedBoxes,
        animationsElementSizeWidth,
        animationsElementSizeHeight,
        animationsElementHorizontal,
        animationsAnimationFrames,
        animationsAnimationFramesPerSecond,
    ) {
        super(
            x, y,
            canvas,
            factorySizeWidth,
            factorySizeHeight,
            factoryBoxesHorizontal,
            factoryBoxesVertical,
            factoryOccupiedBoxes
        );
        this.animationGroup = [];
        this.animations = {
            element: {
                size: new Size(
                    animationsElementSizeWidth,
                    animationsElementSizeHeight,
                ),
                horizontal: animationsElementHorizontal,
            },
            animation: {
                frames: animationsAnimationFrames,
                framesPerSecond: animationsAnimationFramesPerSecond,
            }
        };
    }

    setAnimations(
        boxX,
        boxY,
        route,
        elementVertical
    ) {
        const index = this.boxIndex(boxX, boxY);
        if (index !== false) return index;
        const coordinateOfBoxes = this.getCoordinateOfBoxes(boxX, boxY);
        const newAnimations = new Animations(
            coordinateOfBoxes.x,
            coordinateOfBoxes.y,
            this.factory.size.width * this.factory.boxesHorizontal,
            this.factory.size.height * this.factory.boxesVertical,
            this.canvas,
            route,
            this.animations.element.size.width,
            this.animations.element.size.height,
            this.animations.element.horizontal,
            elementVertical,
            this.animations.animation.frames,
            this.animations.animation.framesPerSecond
        );
        this.animationGroup.push(newAnimations);
        const newIndex = this.animationGroup.length - 1;
        this.setBoxIndex(newIndex, boxX, boxY);
        return newIndex;
    }

    drawAnimations() {
        this.animationGroup.forEach((animations) => {
            animations.drawAnimation();
        });
    }
}