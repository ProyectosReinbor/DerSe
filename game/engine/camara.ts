import { Coordenadas } from "./coordenadas";
import { Medidas } from "./medidas";
import { Objeto } from "./objeto";

export class Camara extends Objeto {
    constructor(izquierdaSuperior: Coordenadas) {
        super(
            izquierdaSuperior,
            new Medidas(100, 100)
        );
    }

    objetoAdentroDeCamara(objeto: Objeto): boolean {
        const dobleDeMedidas = new Medidas(
            objeto.medidas.ancho * 2,
            objeto.medidas.alto * 2
        );

        const vision = new Objeto(
            new Coordenadas(
                this.izquierdaSuperior.x - objeto.medidas.ancho,
                this.izquierdaSuperior.y - objeto.medidas.alto,
            ),
            new Medidas(
                this.medidas.ancho + dobleDeMedidas.ancho,
                this.medidas.alto + dobleDeMedidas.alto
            )
        );
        return vision.objetoAdentro(objeto);
    }

    objetoEnCamara(objeto: Objeto): Objeto | false {
        if (this.objetoAdentroDeCamara(objeto) === false)
            return false;

        return new Objeto(
            new Coordenadas(
                objeto.izquierdaSuperior.x - this.izquierdaSuperior.x,
                objeto.izquierdaSuperior.y - this.izquierdaSuperior.y,
            ),
            new Medidas(
                objeto.medidas.ancho,
                objeto.medidas.alto
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