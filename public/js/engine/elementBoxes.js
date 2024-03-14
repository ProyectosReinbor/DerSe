import { Elements } from "./elements.js";
import { Boxes } from "./boxes.js";
import { Size } from "./size.js";

export class ElementBoxes extends Boxes {
    constructor(
        x, y,
        canvas,
        factorySizeWidth,
        factorySizeHeight,
        factoryBoxesHorizontal,
        factoryBoxesVertical,
        factoryOccupiedBoxes,
        elementSizeWidth,
        elementSizeHeight,
    ) {
        super(
            x, y,
            canvas,
            factorySizeWidth,
            factorySizeHeight,
            factoryBoxesHorizontal,
            factoryBoxesVertical,
            factoryOccupiedBoxes
        );
        this.groupElements = [];
        this.element = {
            size: new Size(
                elementSizeWidth,
                elementSizeHeight,
            )
        };
    }

    setElements(
        boxX,
        boxY,
        route,
        elementHorizontal,
        elementVertical,
    ) {
        const index = this.boxIndex(boxX, boxY);
        if (index !== false) return index;
        const coordinateOfBoxes = this.getCoordinateOfBoxes(boxX, boxY);
        const newElements = new Elements(
            coordinateOfBoxes.x,
            coordinateOfBoxes.y,
            this.factory.size.width * this.factory.boxesHorizontal,
            this.factory.size.height * this.factory.boxesVertical,
            this.canvas,
            route,
            this.element.size.width,
            this.element.size.height,
            elementHorizontal,
            elementVertical,
        );
        this.groupElements.push(newElements);
        const newIndex = this.groupElements.length - 1;
        this.setBoxIndex(newIndex, boxX, boxY);
        return newIndex;
    }

    async drawElements() {
        for (const elements of this.groupElements) {
            await elements.drawElement();
        }
    }
}