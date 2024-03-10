import { Elements } from "./elements.js";
import { Boxes } from "./boxes.js";
import { Canvas } from "./canvas.js";

export class ElementBoxes extends Boxes {

    elements: Elements[] = [];
    element: {
        size: {
            width: number;
            height: number;
        };
    }

    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        factory: {
            size: {
                width: number;
                height: number;
            },
            boxesHorizontal: number;
            boxesVertical: number;
            occupiedBoxes: boolean[][] | true;
        },
        element: {
            size: {
                width: number;
                height: number;
            };
        }
    ) {
        super(
            x,
            y,
            canvas,
            factory,
        );
        this.element = element;
    }

    setElements(
        boxX: number,
        boxY: number,
        route: string,
        element: {
            horizontal: number;
            vertical: number;
        },
    ): number {
        const index = this.boxIndex(boxX, boxY);
        if (index !== false) return index;
        const coordinateOfBoxes = this.getCoordinateOfBoxes(boxX, boxY);
        const newElements = new Elements(
            coordinateOfBoxes,
            {
                width: this.factory.size.width * this.factory.boxesHorizontal,
                height: this.factory.size.height * this.factory.boxesVertical,
            },
            this.canvas,
            route,
            {
                size: this.element.size,
                horizontal: element.horizontal,
                vertical: element.vertical,
            },
        );
        this.elements.push(newElements);
        const newIndex = this.elements.length - 1;
        this.setBoxIndex(boxX, boxY, newIndex);
        return newIndex;
    }

    drawElements() {
        this.elements.forEach((elements) => {
            elements.drawElement();
        });
    }
}