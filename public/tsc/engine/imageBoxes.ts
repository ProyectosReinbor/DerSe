import { Boxes, type BoxesOccupied } from "./boxes";
import type { Canvas } from "./canvas";
import { Coordinate } from "./coordinate";
import { Image, type ImageRoute } from "./image";
import type { Plane } from "./plane";
import { Size } from "./size";

export class ImageBoxes extends Boxes {
    override references: Image[] = [];
    route: ImageRoute;

    constructor(props: {
        x: number;
        y: number;
        canvas: Canvas;
        size: Size;
        length: Plane;
        occupied: BoxesOccupied;
        route: ImageRoute;
    }) {
        super(props);
        this.route = props.route;
    }

    pushImage(indicesBox: Coordinate): Image | undefined {
        const box = this.getBox(indicesBox);
        if (box !== undefined)
            return undefined;

        const reference = this.reference(indicesBox);
        const newReference = new Image({
            initial: reference.initial,
            size: reference.size,
            canvas: this.canvas,
            route: this.route,
        });

        const indexReference = this.pushReference(indicesBox, newReference);
        return this.references[indexReference];
    }

    drawImages() {
        this.references.forEach(
            image => image.drawImage()
        );
    }
}