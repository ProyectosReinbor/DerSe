import { Boxes_ENGINE, type OccupiedBoxes } from "./boxes";
import type { Canvas_ENGINE } from "./canvas";
import { Image_ENGINE, type ImagePath } from "./image";
import type { Plane_ENGINE } from "./plane";
import type { Size_ENGINE } from "./size";

export class ImageBoxes_ENGINE extends Boxes_ENGINE {
    override references: Image_ENGINE[] = [];
    route: ImagePath;

    constructor(props: {
        x: number;
        y: number;
        canvas: Canvas_ENGINE;
        size: Size_ENGINE;
        length: Plane_ENGINE;
        occupied: OccupiedBoxes;
        route: ImagePath;
    }) {
        super({
            x: props.x,
            y: props.y,
            canvas: props.canvas,
            size: props.size,
            length: props.length,
            occupied: props.occupied,
        });
        this.route = props.route;
    }

    override referencePush(props: {
        boxIndices: Plane_ENGINE;
    }): Image_ENGINE | undefined {
        const position = this.getPosition({
            boxIndices: props.boxIndices
        });
        const reference = new Image_ENGINE({
            leftUp: position.leftUp,
            size: position.size,
            canvas: this.canvas,
            route: this.route,
        });

        const indexReference = this.referencesPush({
            boxIndices: props.boxIndices,
            reference
        });
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