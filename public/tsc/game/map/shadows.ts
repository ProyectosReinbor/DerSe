import type { Canvas_ENGINE } from "../../engine/canvas";
import type { Image_ENGINE } from "../../engine/image";
import { ImageBoxes_ENGINE } from "../../engine/imageBoxes";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_ENGINE } from "../map";


export class Shadows_ENGINE extends ImageBoxes_ENGINE {
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
            new Plane_ENGINE(3, 3),
            [
                [true, false, false],
                [false, false, false],
                [false, false, false]
            ],
            "images/terrain/ground/shadows.png",
        );
    }

    pushShadow(boxIndices: Plane_ENGINE): Image_ENGINE | undefined {
        const shadow = this.referencePush(boxIndices);
        if (shadow === undefined) return undefined;
        shadow.leftUp.x -= this.size.width;
        shadow.leftUp.y -= this.size.height;
        return shadow;
    }

    drawShadows() {
        this.drawImages();
    }
}           