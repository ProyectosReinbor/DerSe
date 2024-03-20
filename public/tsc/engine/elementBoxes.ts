import { type BoxesOccupied } from "./boxes";
import type { Canvas } from "./canvas";
import { Coordinate } from "./coordinate";
import { Elements } from "./elements";
import { Element } from "./element";
import { Plane } from "./plane";
import { Size } from "./size";
import { ImageBoxes } from "./imageBoxes";
import type { ImageRoute } from "./image";

export class ElementBoxes extends ImageBoxes {
    override references: Elements[] = [];

    constructor(props: {
        x: number;
        y: number;
        canvas: Canvas;
        size: Size;
        length: Plane;
        occupied: BoxesOccupied;
        route: ImageRoute;
    }) {
        super(props);
    }

    pushElements(indicesBox: Coordinate) {
        const index = this.getBox(indicesBox);
        if (index !== undefined) return index;
        const coordinateOfBoxes = this.getCoordinateOfBoxes(boxes);
        const newElements = new Elements({
            initial: coordinateOfBoxes,
            size: new Size({
                width: this.boxDefault.size.width * this.boxDefault.length.horizontal,
                height: this.boxDefault.size.height * this.boxDefault.length.vertical,
            }),
            canvas: this.canvas,
            route: elementsDefault.route,
            element: new Element({
                size: new Size({
                    width: elementsDefault.element.size.width,
                    height: elementsDefault.element.size.height
                }),
                indices: new Plane({
                    horizontal: elementsDefault.element.indices.horizontal,
                    vertical: elementsDefault.element.indices.vertical
                })
            })
        });
        this.groupElements.push(newElements);
        const newIndex = this.groupElements.length - 1;
        this.setBoxIndex(newIndex, boxes);
        return newIndex;
    }

    drawElements() {
        this.groupElements.forEach(
            elements => elements.drawElement()
        );
    }
}