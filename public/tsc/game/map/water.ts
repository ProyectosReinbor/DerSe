import type { Canvas_ENGINE } from "../../engine/canvas";
import { ImageBoxes_ENGINE } from "../../engine/imageBoxes";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_ENGINE } from "../map";

export class Water_ENGINE extends ImageBoxes_ENGINE {
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
            route: "images/terrain/water/water.png",
        });
    }

    pushWater(props: {
        boxIndices: Plane_ENGINE;
    }) {
        return this.referencePush({
            boxIndices: props.boxIndices
        });
    }

    drawWater() {
        this.drawImages();
    }
}  