import { CoordenadaTridimensional } from "./coordenadaTridimensional";
import { MedidaTridimensional } from "./medidaTridimensional";
import { PosicionCajaTridimensional } from "./posicionCajaTridimensional";
import { VerticesCajaTridimensional } from "./verticesCajaTridimensional";

export class Camara extends PosicionCajaTridimensional {
    constructor(
        centro?: CoordenadaTridimensional,
        x?: number,
        y?: number,
        z?: number
    ) {
        super(
            centro,
            new MedidaTridimensional(100, 100, 100),
            x,
            y,
            z
        );
    }

    esVisible(objetivo: PosicionCajaTridimensional) {
        const objetivoMedidasDoble = objetivo.medida.multiplicar(2);
        const izquierdaSuperiorAtras = this.obtenerVertice(
            new VerticesCajaTridimensional("izquierda", "superior", "atras")
        );
        const visor = new PosicionCajaTridimensional(
            new CoordenadaTridimensional(
                izquierdaSuperiorAtras.x - objetivo.medida.ancho,
                izquierdaSuperiorAtras.y - objetivo.medida.alto,
                izquierdaSuperiorAtras.z - objetivo.medida.profundidad,
            ),
            new MedidaTridimensional(
                this.medida.ancho + objetivoMedidasDoble.ancho,
                this.medida.alto + objetivoMedidasDoble.alto,
                this.medida.profundidad + objetivoMedidasDoble.profundidad
            )
        );
        return visor.posicionCajaAdentro(objetivo);
    }

    posicionCajaEnVisor(posicionCaja: PosicionCajaTridimensional) {
        if (!this.esVisible(posicionCaja))
            return false;

        return new PosicionCajaTridimensional(
            undefined,
            undefined,
            posicionCaja.centro.x - this.centro.x,
            posicionCaja.centro.y - this.centro.y,
            posicionCaja.centro.z - this.centro.z,
            posicionCaja.medida.ancho,
            posicionCaja.medida.alto,
            posicionCaja.medida.profundidad
        );
    }

    enfocar(posicionCaja: PosicionCajaTridimensional) {
        const medidaMitad = this.medida.dividir(2);
        const posicionCajaMedidaMitad = posicionCaja.medida.dividir(2);

        this.centro.x = posicionCaja.centro.x - medidaMitad.ancho
            + posicionCajaMedidaMitad.ancho;

        this.centro.y = posicionCaja.centro.y - medidaMitad.alto
            + posicionCajaMedidaMitad.alto;
    }

}