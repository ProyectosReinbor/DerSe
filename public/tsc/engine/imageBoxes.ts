import {
    type Canvas,
    type Coordinate,
    type Plane,
    Size,
    Boxes,
    Image
} from "./exports.js";

export class ImageBoxes extends Boxes {
    images: Image[] = [];
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        boxesParameters: {
            size: Size;
            length: Plane;
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
                this.boxParameters.size.width * this.boxParameters.length.horizontal,
                this.boxParameters.size.height * this.boxParameters.length.vertical,
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