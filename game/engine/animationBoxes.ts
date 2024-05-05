import type { Animacion } from "./animacion";
import type { Animaciones } from "./animaciones";
import type { OccupiedBoxes } from "./boxes";
import { ElementBoxes_ENGINE } from "./elementBoxes";

export class CasillasConAnimacion extends ElementBoxes_ENGINE {

    override referencias: Animaciones[] = [];
    animation: Animacion;

    constructor(
        x: number,
        y: number,
        canvas: Canvas_ENGINE,
        size: Size_ENGINE,
        length: Plane_ENGINE,
        occupied: OccupiedBoxes,
        route: PathImage_ENGINE,
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