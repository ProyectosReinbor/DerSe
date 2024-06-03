import { CoordenadaTridimensional } from "./coordenadaTridimensional";
import { MedidaTridimensional } from "./medidaTridimensional";
import { PosicionCajaTridimensional } from "./posicionCajaTridimensional";
import { VerticesCajaTridimensional } from "./verticesCajaTridimensional";

export class Camara extends PosicionCajaTridimensional {
    constructor(centro: CoordenadaTridimensional) {
        super(
            centro,
            new MedidaTridimensional(100, 100, 100)
        );
    }

    cajaVisible(objetivo: PosicionCajaTridimensional) {
        const objetivoMedidasDoble = objetivo.medidas.multiplicar(2);
        const izquierdaSuperiorAtras = this.obtenerVertice(
            new VerticesCajaTridimensional("izquierda", "superior", "atras")
        );
        const vision = new PosicionCajaTridimensional(
            new CoordenadaTridimensional(
                izquierdaSuperiorAtras.x - objetivo.medidas.ancho,
                izquierdaSuperiorAtras.y - objetivo.medidas.alto,
                izquierdaSuperiorAtras.z - objetivo.medidas.profundidad,
            ),
            new MedidaTridimensional(
                this.medidas.ancho + objetivoMedidasDoble.ancho,
                this.medidas.alto + objetivoMedidasDoble.alto,
                this.medidas.profundidad + objetivoMedidasDoble.profundidad
            )
        );
        return vision.posicionCajaAdentro(objetivo);
    }

    objetoEnCamara(objeto: Objeto) {
        if (this.objetoAdentroDeCamara(objeto) === false)
            return false;

        return new Objeto(
            new Coordenadas(
                objeto.izquierdaSuperior.x - this.izquierdaSuperior.x,
                objeto.izquierdaSuperior.y - this.izquierdaSuperior.y,
                objeto.izquierdaSuperior.z - this.izquierdaSuperior.z,
            ),
            new Medidas(
                objeto.medidas.ancho,
                objeto.medidas.alto,
                objeto.medidas.profundidad
            )
        );
    }

    enfocar(objeto: Objeto): void {
        this.izquierdaSuperior.x = objeto.izquierdaSuperior.x - this.medidas.mitad.ancho
            + objeto.medidas.mitad.ancho;

        this.izquierdaSuperior.y = objeto.izquierdaSuperior.y - this.medidas.mitad.alto
            + objeto.medidas.mitad.alto;
    }

}