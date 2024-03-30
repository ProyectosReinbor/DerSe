import type { Canvas_ENGINE } from "../../engine/canvas";
import { Element_ENGINE } from "../../engine/element";
import { ElementBoxes_ENGINE } from "../../engine/elementBoxes";
import type { Elements_ENGINE } from "../../engine/elements";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_ENGINE } from "../map";

export type FlatElevationState = "grass" | "sand";
export type FlatElevationElementIndices = {
    [key in FlatElevationState]: Plane_ENGINE;
}

export class FlatElevations_ENGINE extends ElementBoxes_ENGINE {
    elementIndices: FlatElevationElementIndices;
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
            route: "images/terrain/ground/flat.png",
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
            grass: new Plane_ENGINE({
                horizontal: 4,
                vertical: 0
            }),
            sand: new Plane_ENGINE({
                horizontal: 9,
                vertical: 0
            })
        };
    }

    pushFlatElevation(props: {
        boxIndices: Plane_ENGINE;
        state: FlatElevationState;
    }): Elements_ENGINE | undefined {
        const indices = this.elementIndices[props.state];
        this.element.setIndices(
            new Plane_ENGINE({
                horizontal: indices.horizontal,
                vertical: indices.vertical
            })
        );
        return this.referencePush({
            boxIndices: props.boxIndices
        });
    }

    drawFlatElevations(): void {
        this.drawElements();
    }
}           