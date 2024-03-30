import type { Canvas_ENGINE } from "../../engine/canvas";
import { Element_ENGINE } from "../../engine/element";
import { ElementBoxes_ENGINE } from "../../engine/elementBoxes";
import type { Elements_ENGINE } from "../../engine/elements";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_ENGINE } from "../map";

export type WallElevationState = "left" | "center" | "right" | "only";

export type WallElevationElementIndices = {
    [key in WallElevationState]: Plane_ENGINE;
};

export class WallElevations_ENGINE extends ElementBoxes_ENGINE {

    elementIndices: WallElevationElementIndices;

    constructor(props: {
        map: Map_ENGINE,
        canvas: Canvas_ENGINE,
    }) {
        super({
            x: props.map.leftUp.x,
            y: props.map.leftUp.y,
            canvas: props.canvas,
            size: new Size_ENGINE({
                width: props.map.boxes.width,
                height: props.map.boxes.height
            }),
            length: new Plane_ENGINE({
                horizontal: 1,
                vertical: 1
            }),
            occupied: true,
            route: "images/terrain/ground/elevation.png",
            element: new Element_ENGINE({
                size: new Size_ENGINE({
                    width: 64,
                    height: 64
                }),
                indices: new Plane_ENGINE({
                    horizontal: 0,
                    vertical: 0
                })
            })
        });
        this.elementIndices = {
            left: new Plane_ENGINE({
                horizontal: 0,
                vertical: 3
            }),
            center: new Plane_ENGINE({
                horizontal: 1,
                vertical: 3
            }),
            right: new Plane_ENGINE({
                horizontal: 2,
                vertical: 3
            }),
            only: new Plane_ENGINE({
                horizontal: 3,
                vertical: 5
            })
        };
    }

    wallElevationPosition(props: {
        boxIndices: Plane_ENGINE;
    }): WallElevationState {
        const leftBoxes = new Plane_ENGINE({
            horizontal: props.boxIndices.horizontal - 1,
            vertical: props.boxIndices.vertical,
        });
        const rightBoxes = new Plane_ENGINE({
            horizontal: props.boxIndices.horizontal + 1,
            vertical: props.boxIndices.vertical,
        });
        const left = this.getBox({
            boxIndices: leftBoxes
        }) !== undefined;
        const right = this.getBox({
            boxIndices: rightBoxes
        }) !== undefined;

        const isLeft = !left && right;
        if (isLeft) return "left";

        const isCenter = left && right;
        if (isCenter) return "center";

        const isRight = left && !right;
        if (isRight) return "right";

        const isVertical = !left && !right;
        if (isVertical) return "only";

        throw new Error("invalid element");
    }

    refreshElements() {
        this.references.forEach(elements => {
            const boxIndices = this.getBoxIndices({
                coordinate: elements.leftUp
            });
            const position = this.wallElevationPosition({
                boxIndices
            });
            const indices = this.elementIndices[position];
            elements.element.setIndices(
                new Plane_ENGINE({
                    horizontal: indices.horizontal,
                    vertical: indices.vertical
                })
            );
        });
    }

    pushWallElevation(props: {
        boxIndices: Plane_ENGINE;
    }): Elements_ENGINE | undefined {
        const wallElevation = this.referencePush({
            boxIndices: props.boxIndices
        });
        if (wallElevation === undefined)
            return undefined;

        this.refreshElements();
        return wallElevation;
    }

    drawWallElevations() {
        this.drawElements();
    }
} 