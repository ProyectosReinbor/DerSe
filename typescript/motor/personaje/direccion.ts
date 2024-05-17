export type DireccionX = "izquierda" | "derecha" | "centro";
export type DireccionY = "arriba" | "abajo" | "centro";

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
        if (this.x === "izquierda")
            return -1;

        if (this.x === "derecha")
            return 1;

        if (this.x === "centro")
            return 0;

        throw new Error("invalid  direction x");
    }

    get yNumero() {
        if (this.y === "arriba")
            return -1;

        if (this.y === "abajo")
            return 1;

        if (this.y === "centro")
            return 0;

        throw new Error("invalid direction y");
    }

    igualA(direction: Direccion) {
        return this.x === direction.x &&
            this.y === direction.y;
    }
}