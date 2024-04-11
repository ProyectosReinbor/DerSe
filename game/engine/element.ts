import { Coordinate_ENGINE } from "./coordinate";
import { Plane_ENGINE } from "./plane";
import { Position_ENGINE } from "./position";
import type { Size_ENGINE } from "./size";

export class Element_ENGINE extends Position_ENGINE {
    constructor(
        size: Size_ENGINE,
        indices: Plane_ENGINE,
    ) {
        super(
            new Coordinate_ENGINE(0, 0),
            size,
        );
        this.setIndices(indices);
    }

    setIndices(newIndices: Plane_ENGINE) {
        this.leftUp.x = this.size.width * newIndices.horizontal;
        this.leftUp.y = this.size.height * newIndices.vertical;
    }

    getIndices(): Plane_ENGINE {
        return new Plane_ENGINE(
            this.leftUp.x / this.size.width,
            this.leftUp.y / this.size.height,
        );
    }

    nextFrame(frames: number) {
        this.setIndices(
            new Plane_ENGINE(
                this.getIndices().horizontal + 1,
                this.getIndices().vertical
            )
        );
        if (this.getIndices().horizontal >= frames)
            this.setIndices(
                new Plane_ENGINE(
                    0,
                    this.getIndices().vertical
                )
            );
    }
}