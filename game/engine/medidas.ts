export class Medidas {

    ancho: number;
    alto: number;

    constructor(
        ancho: number,
        alto: number,
    ) {
        this.ancho = ancho;
        this.alto = alto;
    }

    get unPorciento(): Medidas {
        return new Medidas(
            this.ancho / 100,
            this.alto / 100,
        )
    }

    porcentaje(
        porcentajes: Medidas
    ): Medidas {
        return new Medidas(
            this.unPorciento.ancho * porcentajes.ancho,
            this.unPorciento.alto * porcentajes.alto,
        );
    }

    get mitad(): Medidas {
        return new Medidas(
            this.ancho / 2,
            this.alto / 2,
        );
    }
}