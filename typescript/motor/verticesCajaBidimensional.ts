export type ValoresVerticesCaja = -1 | 0 | 1;
export type NombresXVerticesCaja = "izquierda" | "mitad" | "derecha";
export type NombresYVerticesCaja = "superior" | "mitad" | "inferior";

export class VerticesCajaBidimensional {
    private static valoresX: {
        [nombre in NombresXVerticesCaja]: ValoresVerticesCaja;
    } = {
            "izquierda": -1,
            "mitad": 0,
            "derecha": 1
        };

    private static valoresY: {
        [nombre in NombresYVerticesCaja]: ValoresVerticesCaja;
    } = {
            "superior": -1,
            "mitad": 0,
            "inferior": 1
        }

    readonly nombreX: NombresXVerticesCaja;
    readonly nombreY: NombresYVerticesCaja;

    constructor(
        nombreX: NombresXVerticesCaja,
        nombreY: NombresYVerticesCaja
    ) {
        this.nombreX = nombreX;
        this.nombreY = nombreY;
    }

    get xNumero() {
        return VerticesCajaBidimensional.valoresX[this.nombreX];
    }

    get yNumero() {
        return VerticesCajaBidimensional.valoresY[this.nombreY];
    }
}