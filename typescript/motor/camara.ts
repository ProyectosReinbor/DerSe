
export class Camara extends Posicion {
    constructor(izquierdaSuperior: Coordenadas) {
        super(
            izquierdaSuperior,
            new Medidas(100, 100, 100)
        );
    }

    objetoAdentroDeCamara(objeto: Objeto) {
        const dobleDeMedidas = new Medidas(
            objeto.medidas.ancho * 2,
            objeto.medidas.alto * 2,
            objeto.medidas.profundidad * 2
        );

        const vision = new Objeto(
            new Coordenadas(
                this.izquierdaSuperior.x - objeto.medidas.ancho,
                this.izquierdaSuperior.y - objeto.medidas.alto,
                this.izquierdaSuperior.z - objeto.medidas.profundidad,
            ),
            new Medidas(
                this.medidas.ancho + dobleDeMedidas.ancho,
                this.medidas.alto + dobleDeMedidas.alto,
                this.medidas.profundidad + dobleDeMedidas.profundidad
            )
        );
        return vision.objetoAdentro(objeto);
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