import { Position_ENGINE } from "./position";
import type { Size_ENGINE } from "./size";

export class Element extends Position_ENGINE {
    constructor(props: {
        size: Size_ENGINE,
        indices: Plane_engine,
    }) {
        super({
            initial: new Coordinate({ x: 0, y: 0 }),
            size: props.size,
        });
        this.setIndices(props.indices);
    }

    setIndices(newIndices: Plane) {
        this.initial.x = this.size.width * newIndices.horizontal;
        this.initial.y = this.size.height * newIndices.vertical;
    }

    getIndices(): Plane {
        return new Plane({
            horizontal: this.initial.x / this.size.width,
            vertical: this.initial.y / this.size.height,
        });
    }

    nextFrame(frames: number) {
        this.setIndices(
            new Plane({
                horizontal: this.getIndices().horizontal + 1,
                vertical: this.getIndices().vertical
            })
        );
        if (this.getIndices().horizontal >= frames)
            this.setIndices(
                new Plane({
                    horizontal: 0,
                    vertical: this.getIndices().vertical
                })
            );
    }
}