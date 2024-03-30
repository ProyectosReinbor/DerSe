import type { Canvas_ENGINE } from "../../engine/canvas";
import type { Image_ENGINE } from "../../engine/image";
import { ImageBoxes_ENGINE } from "../../engine/imageBoxes";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_ENGINE } from "../map";


export class Shadows_ENGINE extends ImageBoxes_ENGINE {
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
                horizontal: 3,
                vertical: 3
            }),
            occupied: [
                [true, false, false],
                [false, false, false],
                [false, false, false]
            ],
            route: "images/terrain/ground/shadows.png",
        });
    }

    pushShadow(props: {
        boxIndices: Plane_ENGINE;
    }): Image_ENGINE | undefined {
        const shadow = this.referencePush({
            boxIndices: props.boxIndices
        });
        if (shadow === undefined) return undefined;
        shadow.leftUp.x -= this.size.width;
        shadow.leftUp.y -= this.size.height;
        return shadow;
    }

    drawShadows() {
        this.drawImages();
    }
}           