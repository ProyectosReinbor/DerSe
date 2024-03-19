import type { Canvas } from "../../engine/canvas.js";
import type { Coordinate } from "../../engine/coordinate";
import { Image } from "../../engine/image.js";
import { Size } from "../../engine/size.js";

export type State = "construction" | "ready" | "destroyed";
export type Color = "blue" | "purple" | "red" | "yellow";

export class Castle extends Image {
    state: State;
    color: Color;
    constructor(props: {
        initial: Coordinate;
        size: Size;
        canvas: Canvas;
        state: State;
        color: Color;
    }) {
        super({
            initial: props.initial,
            size: props.size,
            canvas: props.canvas,
            route: "",
        });
        this.state = props.state;
        this.color = props.color;
        this.imageCastle();
    }

    imageCastle() {
        let file: State | Color = this.state;
        if (this.state === "ready") file = this.color;
        this.image = `images/factions/knights/buildings/castle/${file}.png`;
    }
}