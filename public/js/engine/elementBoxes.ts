import { Elements } from "./elements.js";
import { Boxes } from "./boxes.js";
import { Size } from "./size.js";
import type { Canvas } from "./canvas.js";
import type { Plane } from "./plane.js";
import type { Coordinate } from "./coordinate.js";

export class ElementBoxes extends Boxes {
    groupElements: Elements[];
    elementsParameters: {
        element: {
            size: Size;
        }
    };
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        boxesParameters: {
            size: Size;
            boxesHorizontal: number;
            boxesVertical: number;
            occupiedBoxes: true | boolean[][];
        },
        elementsParameters: {
            element: {
                size: Size;
            }
        }
    ) {
        super(
            x, y,
            canvas,
            boxesParameters
        );
        this.groupElements = [];
        this.elementsParameters = elementsParameters;
    }

    setElements(
        boxes: Coordinate,
        route: string,
        elementsParameters: {
            element: {
                plane: Plane;
            }
        },
    ) {
        const index = this.boxIndex(boxes);
        if (index !== false) return index;
        const coordinateOfBoxes = this.getCoordinateOfBoxes(boxes);
        const newElements = new Elements(
            coordinateOfBoxes,
            new Size(
                this.boxesParameters.size.width * this.boxesParameters.boxesHorizontal,
                this.boxesParameters.size.height * this.boxesParameters.boxesVertical,
            ),
            this.canvas,
            route,
            {
                size: this.elementsParameters.element.size,
                plane: elementsParameters.element.plane,
            }
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