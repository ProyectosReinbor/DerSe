import type { Canvas_ENGINE } from "../../engine/canvas";
import { Element_ENGINE } from "../../engine/element";
import { ElementBoxes_ENGINE } from "../../engine/elementBoxes";
import type { Elements_ENGINE } from "../../engine/elements";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_ENGINE } from "../map";

export type StairElevationState = "left" | "center" | "right" | "only";
export type StairElevationElementIndices = {
    [key in StairElevationState]: Plane_ENGINE;
};

export class StairsElevations_ENGINE extends ElementBoxes_ENGINE {

    elementIndices: StairElevationElementIndices;

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
                vertical: 7
            }),
            center: new Plane_ENGINE({
                horizontal: 1,
                vertical: 7
            }),
            right: new Plane_ENGINE({
                horizontal: 2,
                vertical: 7
            }),
            only: new Plane_ENGINE({
                horizontal: 3,
                vertical: 7
            })
        };
    }

    positionStairElevation(props: {
        boxIndices: Plane_ENGINE;
    }): StairElevationState {
        const leftBoxIndices = new Plane_ENGINE({
            horizontal: props.boxIndices.horizontal - 1,
            vertical: props.boxIndices.vertical,
        });
        const rightBoxIndices = new Plane_ENGINE({
            horizontal: props.boxIndices.horizontal + 1,
            vertical: props.boxIndices.vertical,
        });

        const left = this.getBox({
            boxIndices: leftBoxIndices
        }) !== undefined;
        const right = this.getBox({
            boxIndices: rightBoxIndices
        }) !== undefined;

        const isLeft = !left && right;
        if (isLeft) return "left";

        const isCenter = left && right;
        if (isCenter) return "center";

        const isRight = left && !right;
        if (isRight) return "right";

        const isOnly = !left && !right;
        if (isOnly) return "only";

        throw new Error("invalid element");
    }

    refreshElements(): void {
        this.references.forEach(elements => {
            const boxIndices = this.getBoxIndices({
                coordinate: elements.leftUp
            });
            const position = this.positionStairElevation({
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

    setStairsElevations(props: {
        boxIndices: Plane_ENGINE;
    }): Elements_ENGINE | undefined {
        const stairElevation = this.referencePush({
            boxIndices: props.boxIndices
        });
        if (stairElevation === undefined)
            return undefined;

        this.refreshElements();
        return stairElevation;
    }

    drawStairsElevations(): void {
        this.drawElements();
    }
}