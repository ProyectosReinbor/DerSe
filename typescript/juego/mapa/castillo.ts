export type CastleState = "construction" | "ready" | "destroyed";
export type CastleColor = "blue" | "purple" | "red" | "yellow";

export class Castle_ENGINE extends Image_ENGINE {

    state: CastleState = "construction";
    color: CastleColor = "blue";

    constructor(
        leftUp: Coordinate_ENGINE,
        size: Size_ENGINE,
        canvas: Canvas_ENGINE,
        state: CastleState,
        color: CastleColor,
    ) {
        super(
            leftUp,
            size,
            canvas,
            false,
        );
        this.imageCastle(
            state,
            color
        );
    }

    imageCastle(
        newState: CastleState,
        newColor: CastleColor
    ) {
        this.state = newState;
        this.color = newColor;
        let file: CastleState | CastleColor = this.state;
        if (this.state === "ready")
            file = this.color;

        this.route = `images/factions/knights/buildings/castle/${file}.png`;
    }
}