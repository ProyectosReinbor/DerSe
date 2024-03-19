import { Boxes } from "./boxes";
import { Coordinate } from "./coordinate";
import { Image } from "./image";
import { Size } from "./size";

export class ImageBoxes extends Boxes {
    images: Image[] = [];

    setImage(
        boxes: Coordinate,
        imageDefault: Image
    ) {
        const index = this.boxIndex(boxes);
        if (index !== false) return false;
        const coordinateOfBoxes = this.getCoordinateOfBoxes(boxes);
        const newImage = new Image({
            initial: coordinateOfBoxes,
            size: new Size({
                width: this.boxDefault.size.width * this.boxDefault.length.horizontal,
                height: this.boxDefault.size.height * this.boxDefault.length.vertical,
            }),
            canvas: this.canvas,
            route: imageDefault.route,
        });
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