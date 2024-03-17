
import { Box } from "../../engine/box.js";
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { ElementBoxes } from "../../engine/elementBoxes.js";
import { Elements } from "../../engine/elements.js";
import { Element } from "../../engine/elements/element.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

export class FlatElevations extends ElementBoxes {
    flatElevationsDefault: {
        grass: Elements;
        sand: Elements;
    };
    constructor(
        map: Map,
        canvas: Canvas,
    ) {
        super(
            map.initial.x,
            map.initial.y,
            canvas,
            new Box(
                new Size(map.boxes.width, map.boxes.height),
                new Plane(1, 1),
                true,
            ),
        );
        const FlatElevationsDefault = (plane: Plane) => new Elements(
            new Coordinate,
            new Size,
            canvas,
            "images/terrain/ground/flat.png",
            new Element(
                new Size(64, 64),
                plane
            )
        );
        this.flatElevationsDefault = {
            grass: FlatElevationsDefault(new Plane(4, 0)),
            sand: FlatElevationsDefault(new Plane(9, 0))
        };
    }

    setFlatElevation(
        boxes: Coordinate,
        plane: "grass" | "sand"
    ) {
        const elementsDefault = this.flatElevationsDefault[plane];
        this.setElements(
            boxes,
            elementsDefault
        );
    }

    async drawFlatElevations() {
        await this.drawElements();
    }
}           