export type DireccionX = "left" | "right" | "center";
export type DireccionY = "up" | "down" | "center";

export class Direccion {

    x: DireccionX;
    y: DireccionY;

    constructor(
        x: DireccionX,
        y: DireccionY,
    ) {
        this.x = x;
        this.y = y;
    }

    get xNumero() {
        if (this.x === "left")
            return -1;

        if (this.x === "right")
            return 1;

        if (this.x === "center")
            return 0;

        throw new Error("invalid  direction x");
    }

    get yNumero() {
        if (this.y === "up")
            return -1;

        if (this.y === "down")
            return 1;

        if (this.y === "center")
            return 0;

        throw new Error("invalid direction y");
    }

    igualA(direction: Direccion) {
        return this.x === direction.x &&
            this.y === direction.y;
    }
}