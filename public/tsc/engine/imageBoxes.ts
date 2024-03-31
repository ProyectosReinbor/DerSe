import { Boxes_ENGINE, type OccupiedBoxes } from "./boxes";
import type { Canvas_ENGINE } from "./canvas";
import { Image_ENGINE, type ImagePath } from "./image";
import type { Plane_ENGINE } from "./plane";
import type { Size_ENGINE } from "./size";

export class ImageBoxes_ENGINE extends Boxes_ENGINE {
    override references: Image_ENGINE[] = [];
    route: ImagePath;

    constructor(
        x: number,
        y: number,
        canvas: Canvas_ENGINE,
        size: Size_ENGINE,
        length: Plane_ENGINE,
        occupied: OccupiedBoxes,
        route: ImagePath,
    ) {
        super(
            x,
            y,
            canvas,
            size,
            length,
            occupied,
        );
        this.route = route;
    }

    override referencePush(boxIndices: Plane_ENGINE): Image_ENGINE | undefined {
        const position = this.getPosition(boxIndices);
        const reference = new Image_ENGINE(
            position.leftUp,
            position.size,
            this.canvas,
            this.route,
        );

        const indexReference = this.referencesPush(
            boxIndices,
            reference
        );
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