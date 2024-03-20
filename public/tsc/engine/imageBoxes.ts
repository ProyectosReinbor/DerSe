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

    override referencePush(indicesBox: Coordinate): Image | undefined {
        const position = this.getPosition(indicesBox);
        const newReference = new Image({
            initial: position.initial,
            size: position.size,
            canvas: this.canvas,
            route: this.route,
        });

        const indexReference = this.referencesPush(indicesBox, newReference);
        if (indexReference === undefined)
            return undefined;

        return this.references[indexReference];
    }

    drawImages() {
        this.references.forEach(
            image => image.drawImage()
        );
    }
}