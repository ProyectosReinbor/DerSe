import { Image } from "./image.js";
import { Boxes } from "./boxes.js";
import type { Canvas } from "./canvas.js";
import { Size } from "./size.js";
import type { Coordinate } from "./coordinate.js";

export class ImageBoxes extends Boxes {
    images: Image[] = [];
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        boxesParameters: {
            size: Size;
            boxesHorizontal: number;
            boxesVertical: number;
            occupiedBoxes: true | boolean[][];
        }
    ) {
        super(
            x,
            y,
            canvas,
            boxesParameters
        );
    }

    setImage(
        boxes: Coordinate,
        route: string
    ) {
        const index = this.boxIndex(boxes);
        if (index !== false) return index;
        const coordinateOfBoxes = this.getCoordinateOfBoxes(boxes);
        const newImage = new Image(
            coordinateOfBoxes,
            new Size(
                this.boxesParameters.size.width * this.boxesParameters.boxesHorizontal,
                this.boxesParameters.size.height * this.boxesParameters.boxesVertical,
            ),
            this.canvas,
            route,
        );
        this.images.push(newImage);
        const newIndex = this.images.length - 1;
        this.setBoxIndex(newIndex, boxes);
        return newIndex;
    }

    async drawImages() {
        for (const image of this.images) {
            await image.drawImage();
        }
    }
}