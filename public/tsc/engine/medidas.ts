export class Medidas {

    ancho: number;
    alto: number;

    constructor(parametros: {
        ancho: number;
        alto: number;
    }) {
        this.ancho = parametros.ancho;
        this.alto = parametros.alto;
    }

    get unPorciento() {
        return new Medidas({
            ancho: this.ancho / 100,
            alto: this.alto / 100,
        });
    }

    porcentaje(porcentajes: Medidas) {
        return new Medidas({
            ancho: this.unPorciento.ancho * porcentajes.ancho,
            alto: this.unPorciento.alto * porcentajes.alto,
        });
    }
}