import type { Canvas_ENGINE } from "../../engine/canvas";
import { ImageBoxes_ENGINE } from "../../engine/imageBoxes";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_ENGINE } from "../map";

export class Water_ENGINE extends ImageBoxes_ENGINE {
    constructor(
        map: Map_ENGINE,
        canvas: Canvas_ENGINE,
    ) {
        super(
            map.leftUp.x,
            map.leftUp.y,
            canvas,
            new Size_ENGINE(
                map.boxes.width,
                map.boxes.height
            ),
            new Plane_ENGINE(1, 1),
            true,
            "images/terrain/water/water.png",
        );
    }

    pushWater(boxIndices: Plane_ENGINE) {
        return this.referencePush(boxIndices);
    }

    drawWater() {
        this.drawImages();
    }
}  