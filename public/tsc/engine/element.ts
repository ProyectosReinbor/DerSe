import { Coordinate_ENGINE } from "./coordinate";
import { Plane_ENGINE } from "./plane";
import { Position_ENGINE } from "./position";
import type { Size_ENGINE } from "./size";

export class Element_ENGINE extends Position_ENGINE {
    constructor(props: {
        size: Size_ENGINE,
        indices: Plane_ENGINE,
    }) {
        super({
            leftUp: new Coordinate_ENGINE({ x: 0, y: 0 }),
            size: props.size,
        });
        this.setIndices(props.indices);
    }

    setIndices(newIndices: Plane_ENGINE) {
        this.leftUp.x = this.size.width * newIndices.horizontal;
        this.leftUp.y = this.size.height * newIndices.vertical;
    }

    getIndices(): Plane_ENGINE {
        return new Plane_ENGINE({
            horizontal: this.leftUp.x / this.size.width,
            vertical: this.leftUp.y / this.size.height,
        });
    }

    nextFrame(frames: number) {
        this.setIndices(
            new Plane_ENGINE({
                horizontal: this.getIndices().horizontal + 1,
                vertical: this.getIndices().vertical
            })
        );
        if (this.getIndices().horizontal >= frames)
            this.setIndices(
                new Plane_ENGINE({
                    horizontal: 0,
                    vertical: this.getIndices().vertical
                })
            );
    }
}