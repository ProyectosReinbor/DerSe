import { TwoDimensionalBoxVertices, type NamesXBoxVertices, type NamesYBoxVertices } from "./twoDimensionalBoxVertices";
import { TwoDimensionalCoordinate } from "./twoDimensionalCoordinate";
import { TwoDimensionalSize } from "./twoDimensionalSize";

export class TwoDimensionalBoxPosition {

    center: TwoDimensionalCoordinate;
    size: TwoDimensionalSize;

    constructor(
        center?: TwoDimensionalCoordinate,
        size?: TwoDimensionalSize,
        x?: number,
        y?: number,
        width?: number,
        height?: number,
    ) {
        if (center instanceof TwoDimensionalCoordinate) this.center = center;
        else if (x === undefined || y === undefined) throw new Error("center is undefined");
        else this.center = new TwoDimensionalCoordinate(x, y);

        if (size instanceof TwoDimensionalSize) this.size = size;
        else if (width === undefined || height === undefined) throw new Error("size is undefined");
        else this.size = new TwoDimensionalSize(width, height)
    }

    getVertex(
        boxVertices?: TwoDimensionalBoxVertices,
        nameX?: NamesXBoxVertices,
        nameY?: NamesYBoxVertices
    ) {
        if (boxVertices === undefined) {
            if (nameX === undefined || nameY === undefined) throw new Error("boxVertices is undefined");
            boxVertices = new TwoDimensionalBoxVertices(nameX, nameY);
        }
        const halfSize = this.size.split(2);
        const xDisplacement = halfSize.width * boxVertices.numberX;
        const yDisplacement = halfSize.height * boxVertices.numberY;
        const x = this.center.x + xDisplacement;
        const y = this.center.y + yDisplacement;
        return new TwoDimensionalCoordinate(x, y);
    }

    posicionRelativa(partesPorcentaje: MedidaBidimensional) {
        const izquierdaSuperior = this.obtenerVertice("izquierda", "superior");
        const porcentaje = this.medida.porcentaje(partesPorcentaje);
        const x = izquierdaSuperior.x + porcentaje.ancho;
        const y = izquierdaSuperior.y + porcentaje.alto;
        return new CoordenadaBidimensional(x, y);
    }

    coordenadaAdentro(objetivo: CoordenadaBidimensional) {
        const IzquierdaSuperior = this.obtenerVertice("izquierda", "superior");
        const DerechaInferior = this.obtenerVertice("derecha", "inferior");
        return IzquierdaSuperior.x <= objetivo.x &&
            IzquierdaSuperior.y <= objetivo.y &&
            objetivo.x <= DerechaInferior.x &&
            objetivo.y <= DerechaInferior.y;
    }

    posicionCajaAdentro(objetivo: PosicionCajaBidimensional) {
        const izquierdaSuperior = this.obtenerVertice("izquierda", "superior");
        const derechaInferior = this.obtenerVertice("derecha", "inferior");
        const objetivoIzquierdaSuperior = objetivo.obtenerVertice("izquierda", "superior");
        const objetivoDerechaInferior = objetivo.obtenerVertice("derecha", "inferior");
        return izquierdaSuperior.x <= objetivoIzquierdaSuperior.x &&
            izquierdaSuperior.y <= objetivoIzquierdaSuperior.y &&
            objetivoDerechaInferior.x <= derechaInferior.x &&
            objetivoDerechaInferior.y <= derechaInferior.y;
    }

    algunVerticeAdentro(objetivo: PosicionCajaBidimensional) {
        const verticesIzquierdaSuperior = new VerticesCajaBidimensional("izquierda", "superior");
        const izquierdaSuperior = objetivo.obtenerVertice(
            verticesIzquierdaSuperior.nombreX,
            verticesIzquierdaSuperior.nombreY
        );
        const izquierdaSuperiorAdentro = this.coordenadaAdentro(izquierdaSuperior);
        if (izquierdaSuperiorAdentro)
            return verticesIzquierdaSuperior;

        const verticesIzquierdaInferior = new VerticesCajaBidimensional("izquierda", "inferior");
        const izquierdaInferior = objetivo.obtenerVertice(
            verticesIzquierdaInferior.nombreX,
            verticesIzquierdaInferior.nombreY
        );
        const izquierdaInferiorAdentro = this.coordenadaAdentro(izquierdaInferior);
        if (izquierdaInferiorAdentro)
            return verticesIzquierdaInferior;

        const verticesDerechaSuperior = new VerticesCajaBidimensional("derecha", "superior");
        const derechaSuperior = objetivo.obtenerVertice(
            verticesDerechaSuperior.nombreX,
            verticesDerechaSuperior.nombreY
        );
        const derechaSuperiorAdentro = this.coordenadaAdentro(derechaSuperior);
        if (derechaSuperiorAdentro)
            return verticesDerechaSuperior;

        const verticesDerechaInferior = new VerticesCajaBidimensional("derecha", "inferior");
        const derechaInferior = objetivo.obtenerVertice(
            verticesDerechaInferior.nombreX,
            verticesDerechaInferior.nombreY
        );
        const derechaInferiorAdentro = this.coordenadaAdentro(derechaInferior);
        if (derechaInferiorAdentro)
            return verticesDerechaInferior;

        return false;
    }
}
