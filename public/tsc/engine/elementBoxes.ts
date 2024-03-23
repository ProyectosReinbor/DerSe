import { type BoxesOccupied } from "./boxes";
import type { Canvas } from "./canvas";
import { Coordinate } from "./coordinate";
import { Elements } from "./elements";
import { Element } from "./element";
import { Plane } from "./plane";
import { Size } from "./size";
import type { ImageRoute } from "./image";
import { ImageBoxes } from "./imageBoxes";

export class ElementBoxes extends ImageBoxes {

    override references: Elements[] = [];
    element: Element;

    constructor(props: {
        x: number;
        y: number;
        canvas: Canvas;
        size: Size;
        length: Plane;
        occupied: BoxesOccupied;
        route: ImageRoute;
        element: Element;
    }) {
        super(props);
        this.route = props.route;
        this.element = props.element;
    }

    override referencePush(indicesBox: Coordinate): Elements | undefined {
        const position = this.getPosition(indicesBox);
        const newElements = new Elements({
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
                    horizontal: this.element.getIndices().horizontal,
                    vertical: this.element.getIndices().vertical
                })
            })
        });

        const indexReference = this.referencesPush(indicesBox, newElements);
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