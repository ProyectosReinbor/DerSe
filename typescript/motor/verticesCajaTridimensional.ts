import {
    VerticesCajaBidimensional,
    type NombresXVerticesCaja,
    type NombresYVerticesCaja,
    type ValoresVerticesCaja
} from "./verticesCajaBidimensional";

export type NombresZVerticesCaja = "atras" | "mitad" | "adelante";
export class VerticesCajaTridimensional extends VerticesCajaBidimensional {
    private static valoresZ: {
        [nombre in NombresZVerticesCaja]: ValoresVerticesCaja;
    } = {
            "atras": -1,
            "mitad": 0,
            "adelante": 1
        };

    readonly nombreZ: NombresZVerticesCaja;

    constructor(
        nombreX: NombresXVerticesCaja,
        nombreY: NombresYVerticesCaja,
        nombreZ: NombresZVerticesCaja,
    ) {
        super(nombreX, nombreY);
        this.nombreZ = nombreZ;
    }

    get numeroZ() {
        return VerticesCajaTridimensional.valoresZ[this.nombreZ];
    }
}