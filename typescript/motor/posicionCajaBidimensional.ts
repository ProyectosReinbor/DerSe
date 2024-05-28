import { Medidas2D } from "./medidas2D";

type ValoresVertices = -1 | 0 | 1;
type VerticeX = "izquierda" | "mitad" | "derecha";
type VerticeY = "superior" | "mitad" | "inferior";

const VerticesX: {
    [key in VerticeX]: ValoresVertices;
} = {
    "izquierda": -1,
    "mitad": 0,
    "derecha": 1
};

const VerticesY: {
    [key in VerticeY]: ValoresVertices;
} = {
    "superior": -1,
    "mitad": 0,
    "inferior": 1
}

export class PosicionCajaBidimensional {

    centro: Coordenadas2D;
    medidas: Medidas2D;

    constructor(
        x: number,
        y: number,
        ancho: number,
        alto: number
    ) {
        this.centro = new Coordenadas2D(x, y);
        this.medidas = new Medidas2D(ancho, alto);
    }

    obtenerVertice2D(
        nombreX: VerticeX,
        nombreY: VerticeY,
    ) {
        const verticeX = VerticesX[nombreX];
        const verticeY = VerticesY[nombreY];
        const desplazamientoX = this.medidas.mitad.ancho * verticeX;
        const desplazamientoY = this.medidas.mitad.alto * verticeY;
        const x = this.centro.x + desplazamientoX;
        const y = this.centro.y + desplazamientoY;
        return new Coordenadas2D(x, y);
    }

    posicion2DRelativa(porcentajes: Medidas2D) {
        const porcentaje = this.medidas.porcentaje(porcentajes);
        const izquierdaSuperior = this.obtenerVertice("izquierda", "superior");
        const x = izquierdaSuperior.x + porcentaje.ancho;
        const y = izquierdaSuperior.y + porcentaje.alto;
        return new Coordenadas2D(x, y);
    }

    coordenadas2DAdentro(objetivo: Coordenadas2D) {
        const IzquierdaSuperior = this.obtenerVertice("izquierda", "superior");
        const DerechaInferior = this.obtenerVertice("derecha", "inferior");
        return IzquierdaSuperior.x <= objetivo.x &&
            IzquierdaSuperior.y <= objetivo.y &&
            objetivo.x <= DerechaInferior.x &&
            objetivo.y <= DerechaInferior.y;
    }

    posicionCaja2DAdentro(objetivo: PosicionCaja2D) {
        const izquierdaSuperior = this.obtenerVertice("izquierda", "superior");
        const derechaInferior = this.obtenerVertice("derecha", "inferior");
        const objetivoIzquierdaSuperior = objetivo.obtenerVertice("izquierda", "superior");
        const objetivoDerechaInferior = objetivo.obtenerVertice("derecha", "inferior");
        return izquierdaSuperior.x <= objetivoIzquierdaSuperior.x &&
            izquierdaSuperior.y <= objetivoIzquierdaSuperior.y &&
            objetivoDerechaInferior.x <= derechaInferior.x &&
            objetivoDerechaInferior.y <= derechaInferior.y;
    }

    algunVerticeAdentro(objetivo: PosicionCaja2D): [
        VerticeX,
        VerticeY
    ] | false {
        const izquierdaSuperior = objetivo.obtenerVertice("izquierda", "superior");
        const izquierdaSuperiorAdentro = this.coordenadasAdentro(izquierdaSuperior);
        if (izquierdaSuperiorAdentro) return ["izquierda", "superior"];

        const izquierdaInferior = objetivo.obtenerVertice("izquierda", "inferior");
        const izquierdaInferiorAdentro = this.coordenadasAdentro(izquierdaInferior);
        if (izquierdaInferiorAdentro) return ["izquierda", "inferior"];

        const derechaSuperior = objetivo.obtenerVertice("derecha", "superior");
        const derechaSuperiorAdentro = this.coordenadasAdentro(derechaSuperior);
        if (derechaSuperiorAdentro) return ["derecha", "superior"];

        const derechaInferior = objetivo.obtenerVertice("derecha", "inferior");
        const derechaInferiorAdentro = this.coordenadasAdentro(derechaInferior);
        if (derechaInferiorAdentro) return ["derecha", "inferior"];

        return false;
    }
}
