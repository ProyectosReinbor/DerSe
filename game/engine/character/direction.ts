export type XDirection_ENGINE = "left" | "right" | "center";
export type YDirection_ENGINE = "up" | "down" | "center";

export class Direction_ENGINE {

    x: XDirection_ENGINE;
    y: YDirection_ENGINE;

    constructor(
        _x: XDirection_ENGINE,
        _y: YDirection_ENGINE,
    ) {
        this.x = _x;
        this.y = _y;
    }

    get numberX(): 0 | 1 | -1 {
        if (this.x === "left")
            return -1;

        if (this.x === "right")
            return 1;

        if (this.x === "center")
            return 0;

        throw new Error("invalid  direction x");
    }

    get numberY(): 0 | 1 | -1 {
        if (this.y === "up")
            return -1;

        if (this.y === "down")
            return 1;

        if (this.y === "center")
            return 0;

        throw new Error("invalid direction y");
    }

    isEqualTo(
        direction: Direction_ENGINE
    ): boolean {
        return this.x === direction.x &&
            this.y === direction.y;
    }
}