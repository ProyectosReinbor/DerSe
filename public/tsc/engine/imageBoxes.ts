import { Boxes_ENGINE, type OccupiedSquares } from "./boxes";
import type { Canvas_ENGINE } from "./canvas";
import type { ImagePath, Image_ENGINE } from "./image";
import type { Plane_ENGINE } from "./plane";
import type { Size_ENGINE } from "./size";

export class ImageBoxes extends Boxes_ENGINE {
    override references: Image_ENGINE[] = [];
    route: ImagePath;

    constructor(props: {
        x: number;
        y: number;
        canvas: Canvas_ENGINE;
        size: Size_ENGINE;
        length: Plane_ENGINE;
        occupied: OccupiedSquares;
        route: ImagePath;
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