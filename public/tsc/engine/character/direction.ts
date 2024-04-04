export type XDirection_ENGINE = "left" | "right" | "center";
export type YDirection_ENGINE = "up" | "down" | "center";

export class Direction_ENGINE {
    private x: XDirection_ENGINE;
    private y: YDirection_ENGINE;
    constructor(
        x: XDirection_ENGINE,
        y: YDirection_ENGINE,
    ) {
        this.x = x;
        this.y = y;
    }

    getX(): XDirection_ENGINE {
        return this.x;
    }

    getNumberX(): 0 | 1 | -1 {
        if (this.x === "left")
            return -1;

        if (this.x === "right")
            return 1;

        if (this.x === "center")
            return 0;

        throw new Error("invalid  direction x");
    }

    getY(): YDirection_ENGINE {
        return this.y;
    }

    getNumberY(): 0 | 1 | -1 {
        if (this.y === "up")
            return -1;

        if (this.y === "down")
            return 1;

        if (this.y === "center")
            return 0;

        throw new Error("invalid direction y");
    }

    setX(x: XDirection_ENGINE) {
        this.x = x;
    }

    setY(y: YDirection_ENGINE) {
        this.y = y;
    }

    isEqualTo(direction: Direction_ENGINE) {
        return this.x === direction.x &&
            this.y === direction.y;
    }
}