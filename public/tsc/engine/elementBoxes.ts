import type { OccupiedBoxes } from "./boxes";
import type { Canvas_ENGINE } from "./canvas";
import { Element_ENGINE } from "./element";
import { Elements_ENGINE } from "./elements";
import type { ImagePath } from "./image";
import { ImageBoxes_ENGINE } from "./imageBoxes";
import { Plane_ENGINE } from "./plane";
import { Size_ENGINE } from "./size";

export class ElementBoxes_ENGINE extends ImageBoxes_ENGINE {

    override references: Elements_ENGINE[] = [];
    element: Element_ENGINE;

    constructor(props: {
        x: number;
        y: number;
        canvas: Canvas_ENGINE;
        size: Size_ENGINE;
        length: Plane_ENGINE;
        occupied: OccupiedBoxes;
        route: ImagePath;
        element: Element_ENGINE;
    }) {
        super({
            x: props.x,
            y: props.y,
            canvas: props.canvas,
            size: props.size,
            length: props.length,
            occupied: props.occupied,
            route: props.route,
        });
        this.element = props.element;
    }

    override referencePush(props: {
        boxIndices: Plane_ENGINE;
    }): Elements_ENGINE | undefined {
        const position = this.getPosition({
            boxIndices: props.boxIndices
        });
        const reference = new Elements_ENGINE({
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
                    horizontal: this.element.getIndices().horizontal,
                    vertical: this.element.getIndices().vertical
                })
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

    drawElements() {
        this.references.forEach(
            elements => elements.drawElement()
        );
    }
}