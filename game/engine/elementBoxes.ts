import type { OccupiedBoxes } from "./boxes";
import type { Canvas_ENGINE } from "./canvas";
import { Element_ENGINE } from "./element";
import { Elements_ENGINE } from "./elements";
import type { PathImage_ENGINE } from "./image";
import { ImageBoxes_ENGINE } from "./imageBoxes";
import { Plane_ENGINE } from "./plane";
import { Size_ENGINE } from "./size";

export class ElementBoxes_ENGINE extends ImageBoxes_ENGINE {

    override references: Elements_ENGINE[] = [];
    element: Element_ENGINE;

    constructor(
        x: number,
        y: number,
        canvas: Canvas_ENGINE,
        size: Size_ENGINE,
        length: Plane_ENGINE,
        occupied: OccupiedBoxes,
        route: PathImage_ENGINE | false,
        element: Element_ENGINE,
    ) {
        super(
            x,
            y,
            canvas,
            size,
            length,
            occupied,
            route,
        );
        this.element = element;
    }

    override referencePush(boxIndices: Plane_ENGINE): Elements_ENGINE | undefined {
        const position = this.getPosition(boxIndices);
        const reference = new Elements_ENGINE(
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
                    this.element.getIndices().horizontal,
                    this.element.getIndices().vertical
                )
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

    drawElements() {
        this.references.forEach(
            elements => elements.drawElement()
        );
    }
}