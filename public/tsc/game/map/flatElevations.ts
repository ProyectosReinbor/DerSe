
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { ElementBoxes } from "../../engine/elementBoxes.js";
import { Elements } from "../../engine/elements.js";
import { Element } from "../../engine/element.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

export type FlatElevationState = "grass" | "sand";
export type FlatElevationElementIndices = {
    [key in FlatElevationState]: Plane;
}

export class FlatElevations extends ElementBoxes {
    elementIndices: FlatElevationElementIndices;
    constructor(props: {
        map: Map,
        canvas: Canvas,
    }) {
        super({
            x: props.map.initial.x,
            y: props.map.initial.y,
            canvas: props.canvas,
            size: new Size({
                width: props.map.boxes.width,
                height: props.map.boxes.height
            }),
            length: new Plane({
                horizontal: 1,
                vertical: 1
            }),
            occupied: true,
            route: "images/terrain/ground/flat.png",
            element: new Element({
                size: new Size({ width: 64, height: 64 }),
                indices: new Plane({ horizontal: 0, vertical: 0 })
            })
        });
        this.elementIndices = {
            grass: new Plane({ horizontal: 4, vertical: 0 }),
            sand: new Plane({ horizontal: 9, vertical: 0 })
        };
    }

    setFlatElevation(
        indicesBox: Coordinate,
        state: FlatElevationState
    ): Elements | undefined {
        const indices = this.elementIndices[state];
        this.element.setIndices(
            new Plane({
                horizontal: indices.horizontal,
                vertical: indices.vertical
            })
        );
        return this.referencePush(indicesBox);
    }

    drawFlatElevations(): void {
        this.drawElements();
    }
}           