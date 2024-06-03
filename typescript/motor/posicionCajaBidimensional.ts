import { CoordenadaBidimensional } from "./coordenadaBidimensional";
import { MedidaBidimensional } from "./medidaBidimensional";
import { VerticesCajaBidimensional } from "./verticesCajaBidimensional";

export class PosicionCajaBidimensional {

    centro: CoordenadaBidimensional;
    medidas: MedidaBidimensional;

    constructor(
        x: number,
        y: number,
        ancho: number,
        alto: number
    ) {
        this.centro = new CoordenadaBidimensional(x, y);
        this.medidas = new MedidaBidimensional(ancho, alto);
    }

    obtenerVertice(verticesCaja: VerticesCajaBidimensional) {
        const desplazamientoX = this.medidas.mitad.ancho * verticesCaja.xNumero;
        const desplazamientoY = this.medidas.mitad.alto * verticesCaja.yNumero;
        const x = this.centro.x + desplazamientoX;
        const y = this.centro.y + desplazamientoY;
        return new CoordenadaBidimensional(x, y);
    }

    posicionRelativa(partesPorcentaje: MedidaBidimensional) {
        const izquierdaSuperior = this.obtenerVertice(
            new VerticesCajaBidimensional("izquierda", "superior")
        );
        const porcentaje = this.medidas.porcentaje(partesPorcentaje);
        const x = izquierdaSuperior.x + porcentaje.ancho;
        const y = izquierdaSuperior.y + porcentaje.alto;
        return new CoordenadaBidimensional(x, y);
    }

    coordenadaAdentro(objetivo: CoordenadaBidimensional) {
        const IzquierdaSuperior = this.obtenerVertice(
            new VerticesCajaBidimensional("izquierda", "superior")
        );
        const DerechaInferior = this.obtenerVertice(
            new VerticesCajaBidimensional("derecha", "inferior")
        );
        return IzquierdaSuperior.x <= objetivo.x &&
            IzquierdaSuperior.y <= objetivo.y &&
            objetivo.x <= DerechaInferior.x &&
            objetivo.y <= DerechaInferior.y;
    }

    posicionCajaAdentro(objetivo: PosicionCajaBidimensional) {
        const izquierdaSuperior = this.obtenerVertice(
            new VerticesCajaBidimensional("izquierda", "superior")
        );
        const derechaInferior = this.obtenerVertice(
            new VerticesCajaBidimensional("derecha", "inferior")
        );
        const objetivoIzquierdaSuperior = objetivo.obtenerVertice(
            new VerticesCajaBidimensional("izquierda", "superior")
        );
        const objetivoDerechaInferior = objetivo.obtenerVertice(
            new VerticesCajaBidimensional("derecha", "inferior")
        );
        return izquierdaSuperior.x <= objetivoIzquierdaSuperior.x &&
            izquierdaSuperior.y <= objetivoIzquierdaSuperior.y &&
            objetivoDerechaInferior.x <= derechaInferior.x &&
            objetivoDerechaInferior.y <= derechaInferior.y;
    }

    algunVerticeAdentro(objetivo: PosicionCajaBidimensional) {
        const verticesIzquierdaSuperior = new VerticesCajaBidimensional("izquierda", "superior");
        const izquierdaSuperior = objetivo.obtenerVertice(verticesIzquierdaSuperior);
        const izquierdaSuperiorAdentro = this.coordenadaAdentro(izquierdaSuperior);
        if (izquierdaSuperiorAdentro)
            return verticesIzquierdaSuperior;

        const verticesIzquierdaInferior = new VerticesCajaBidimensional("izquierda", "inferior");
        const izquierdaInferior = objetivo.obtenerVertice(verticesIzquierdaInferior);
        const izquierdaInferiorAdentro = this.coordenadaAdentro(izquierdaInferior);
        if (izquierdaInferiorAdentro)
            return verticesIzquierdaInferior;

        const verticesDerechaSuperior = new VerticesCajaBidimensional("derecha", "superior");
        const derechaSuperior = objetivo.obtenerVertice(verticesDerechaSuperior);
        const derechaSuperiorAdentro = this.coordenadaAdentro(derechaSuperior);
        if (derechaSuperiorAdentro)
            return verticesDerechaSuperior;

        const verticesDerechaInferior = new VerticesCajaBidimensional("derecha", "inferior");
        const derechaInferior = objetivo.obtenerVertice(verticesDerechaInferior);
        const derechaInferiorAdentro = this.coordenadaAdentro(derechaInferior);
        if (derechaInferiorAdentro)
            return verticesDerechaInferior;

        return false;
    }
}
