import { Image } from "./image.js";
import { Boxes } from "./boxes.js";

export class ImageBoxes extends Boxes {
    constructor(
        x,
        y,
        canvas,
        factorySizeWidth,
        factorySizeHeight,
        factoryBoxesHorizontal,
        factoryBoxesVertical,
        factoryOccupiedBoxes
    ) {
        super(
            x,
            y,
            canvas,
            factorySizeWidth,
            factorySizeHeight,
            factoryBoxesHorizontal,
            factoryBoxesVertical,
            factoryOccupiedBoxes
        );
        this.images = [];
    }

    setImage(
        boxX,
        boxY,
        route
    ) {
        const index = this.boxIndex(boxX, boxY);
        if (index !== false) return index;
        const coordinateOfBoxes = this.getCoordinateOfBoxes(boxX, boxY);
        const newImage = new Image(
            coordinateOfBoxes,
            {
                width: this.factory.size.width * this.factory.boxesHorizontal,
                height: this.factory.size.height * this.factory.boxesVertical,
            },
            this.canvas,
            route,
        );
        this.images.push(newImage);
        const newIndex = this.images.length - 1;
        this.setBoxIndex(boxX, boxY, newIndex);
        return newIndex;
    }

    drawImages() {
        this.images.forEach((image) => {
            image.drawImage();
        });
    }
}