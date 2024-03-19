import type { Box } from "./box";
import { Boxes } from "./boxes";
import type { Canvas } from "./canvas";
import { Coordinate } from "./coordinate";
import { Elements } from "./elements";
import { Element } from "./element";
import { Plane } from "./plane";
import { Size } from "./size";

export class ElementBoxes extends Boxes {
    groupElements: Elements[];
    constructor(props: {
        x: number,
        y: number,
        canvas: Canvas,
        boxDefault: Box,
    }) {
        super(props);
        this.groupElements = [];
    }

    setElements(
        boxes: Coordinate,
        elementsDefault: Elements
    ) {
        const index = this.boxIndex(boxes);
        if (index !== false) return index;
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
                plane: new Plane({
                    horizontal: elementsDefault.element.horizontal,
                    vertical: elementsDefault.element.vertical
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