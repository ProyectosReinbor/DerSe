import { Animation_ENGINE } from "./animation";
import { Animations_ENGINE } from "./animations";
import type { OccupiedBoxes } from "./boxes";
import type { Canvas_ENGINE } from "./canvas";
import { Element_ENGINE } from "./element";
import { ElementBoxes_ENGINE } from "./elementBoxes";
import type { ImagePath } from "./image";
import { Plane_ENGINE } from "./plane";
import { Size_ENGINE } from "./size";

export class AnimationBoxes_ENGINE extends ElementBoxes_ENGINE {

    override references: Animations_ENGINE[] = [];
    animation: Animation_ENGINE;

    constructor(
        x: number,
        y: number,
        canvas: Canvas_ENGINE,
        size: Size_ENGINE,
        length: Plane_ENGINE,
        occupied: OccupiedBoxes,
        route: ImagePath,
        element: Element_ENGINE,
        animation: Animation_ENGINE,
    ) {
        super(
            x,
            y,
            canvas,
            size,
            length,
            occupied,
            route,
            element
        );
        this.animation = animation;
    }

    override referencePush(boxIndices: Plane_ENGINE): Animations_ENGINE | undefined {
        const position = this.getPosition(boxIndices);
        const reference = new Animations_ENGINE(
            position.leftUp,
            position.size,
            this.canvas,
            this.route,
            new Element_ENGINE(
                new Size_ENGINE(
                    this.element.size.width,
                    this.element.size.height
                ),
                new Plane_ENGINE(
                    0,
                    this.element.getIndices().vertical
                )
            ),
            new Animation_ENGINE(
                this.animation.frames,
                this.animation.framesPerSecond
            )
        );
        const indexReference = this.referencesPush(
            boxIndices,
            reference
        );
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