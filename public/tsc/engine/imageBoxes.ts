import type { Box } from "./box";
import { Boxes } from "./boxes";
import type { Canvas } from "./canvas";
import { Coordinate } from "./coordinate";
import { Image } from "./image";
import { Size } from "./size";

export class ImageBoxes extends Boxes {
    images: Image[] = [];
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        boxDefault: Box,
    ) {
        super(
            x,
            y,
            canvas,
            boxDefault
        );
    }

    setImage(
        boxes: Coordinate,
        imageDefault: Image
    ) {
        const index = this.boxIndex(boxes);
        if (index !== false) return false;
        const coordinateOfBoxes = this.getCoordinateOfBoxes(boxes);
        const newImage = new Image(
            new Coordinate(
                coordinateOfBoxes.x,
                coordinateOfBoxes.y
            ),
            new Size(
                this.boxDefault.size.width * this.boxDefault.length.horizontal,
                this.boxDefault.size.height * this.boxDefault.length.vertical,
            ),
            this.canvas,
            imageDefault.route,
        );
        this.images.push(newImage);
        const newIndex = this.images.length - 1;
        this.setBoxIndex(newIndex, boxes);
        return newIndex;
    }

    drawImages() {
        this.images.forEach(
            image => image.drawImage()
        );
    }
}