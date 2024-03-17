import type { Box } from "./box";
import { Boxes } from "./boxes";
import type { Canvas } from "./canvas";
import type { Coordinate } from "./coordinate";
import { Elements } from "./elements";
import { Element } from "./elements/element";
import { Plane } from "./plane";
import { Size } from "./size";


export class ElementBoxes extends Boxes {
    groupElements: Elements[];
    elementsDefault: Elements;
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        boxDefault: Box,
        elementsDefault: Elements,
    ) {
        super(
            x, y,
            canvas,
            boxDefault
        );
        this.groupElements = [];
        this.elementsDefault = elementsDefault;
    }

    setElements(
        boxes: Coordinate,
        elementsDefault: Elements
    ) {
        const index = this.boxIndex(boxes);
        if (index !== false) return index;
        const coordinateOfBoxes = this.getCoordinateOfBoxes(boxes);
        const newElements = new Elements(
            coordinateOfBoxes,
            new Size(
                this.boxDefault.size.width * this.boxDefault.length.horizontal,
                this.boxDefault.size.height * this.boxDefault.length.vertical,
            ),
            this.canvas,
            elementsDefault.route,
            new Element(
                new Size(
                    this.elementsDefault.element.size.width,
                    this.elementsDefault.element.size.height
                ),
                new Plane(
                    elementsDefault.element.horizontal,
                    elementsDefault.element.vertical
                )
            )
        );
        this.groupElements.push(newElements);
        const newIndex = this.groupElements.length - 1;
        this.setBoxIndex(newIndex, boxes);
        return newIndex;
    }

    async drawElements() {
        for (const elements of this.groupElements) {
            await elements.drawElement();
        }
    }
}