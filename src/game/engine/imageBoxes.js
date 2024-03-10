import { Image } from "./image.js";
import { Boxes } from "./boxes.js";
import { Canvas } from "./canvas.js";

export class ImageBoxes extends Boxes {

    images: Image[] = [];

    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        factory: {
            size: {
                width: number;
                height: number;
            };
            boxesHorizontal: number;
            boxesVertical: number;
            occupiedBoxes: boolean[][] | true;
        },
    ) {
        super(
            x,
            y,
            canvas,
            factory
        );
    }

    setImage(
        boxX: number,
        boxY: number,
        route: string
    ): number {
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