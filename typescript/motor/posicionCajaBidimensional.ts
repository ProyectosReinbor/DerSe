import { CoordenadaBidimensional } from "./coordenadaBidimensional";
import { MedidaBidimensional } from "./medidaBidimensional";
import { VerticesCajaBidimensional, type NombresXVerticesCaja, type NombresYVerticesCaja } from "./verticesCajaBidimensional";

export class PosicionCajaBidimensional {

    centro: CoordenadaBidimensional;
    medidas: MedidaBidimensional;

    constructor(
        x: number | CoordenadaBidimensional,
        ancho: number | MedidaBidimensional,
        alto?: number,
        y?: number,
    ) {
        this.centro = new CoordenadaBidimensional(x, y);
        this.medidas = new MedidaBidimensional(ancho, alto);
    }

    obtenerVertice(
        nombreX: VerticesCajaBidimensional | NombresXVerticesCaja,
        nombreY?: NombresYVerticesCaja
    ) {
        let verticesCaja: VerticesCajaBidimensional;
        if (nombreX instanceof VerticesCajaBidimensional) {
            verticesCaja = nombreX;
        } else {
            if (nombreY === undefined)
                throw new Error("nombreY is undefined");

            verticesCaja = new VerticesCajaBidimensional(nombreX, nombreY);
        }
        const medidasMitad = this.medidas.dividir(2);
        const desplazamientoX = medidasMitad.ancho * verticesCaja.numeroX;
        const desplazamientoY = medidasMitad.alto * verticesCaja.numeroY;
        const x = this.centro.x + desplazamientoX;
        const y = this.centro.y + desplazamientoY;
        return new CoordenadaBidimensional(x, y);
    }

    posicionRelativa(partesPorcentaje: MedidaBidimensional) {
        const izquierdaSuperior = this.obtenerVertice("izquierda", "superior");
        const porcentaje = this.medidas.porcentaje(partesPorcentaje);
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
