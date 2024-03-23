import type { Canvas } from "../../engine/canvas.js";
import type { Coordinate } from "../../engine/coordinate";
import { Image } from "../../engine/image.js";
import { Size } from "../../engine/size.js";

export type CastleState = "construction" | "ready" | "destroyed";
export type CastleColor = "blue" | "purple" | "red" | "yellow";

export class Castle extends Image {
    state: CastleState = "construction";
    color: CastleColor = "blue";
    constructor(props: {
        initial: Coordinate;
        size: Size;
        canvas: Canvas;
        state: CastleState;
        color: CastleColor;
    }) {
        super({
            initial: props.initial,
            size: props.size,
            canvas: props.canvas,
            route: false,
        });
        this.imageCastle(
            props.state,
            props.color
        );
    }

    imageCastle(
        newState: CastleState,
        newColor: CastleColor
    ) {
        this.state = newState;
        this.color = newColor;
        let file: CastleState | CastleColor = this.state;
        if (this.state === "ready") file = this.color;
        this.image = `images/factions/knights/buildings/castle/${file}.png`;
    }
}