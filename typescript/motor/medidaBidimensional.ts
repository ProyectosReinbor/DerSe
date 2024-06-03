export class MedidaBidimensional {

    ancho: number;
    alto: number;

    constructor(
        ancho: number,
        alto: number,
    ) {
        this.ancho = ancho;
        this.alto = alto;
    }

    get unPorciento() {
        return new MedidaBidimensional(
            this.ancho / 100,
            this.alto / 100,
        );
    }

    porcentaje(numerador: MedidaBidimensional) {
        return new MedidaBidimensional(
            this.unPorciento.ancho * numerador.ancho,
            this.unPorciento.alto * numerador.alto,
        );
    }

    get mitad() {
        return new MedidaBidimensional(
            this.ancho / 2,
            this.alto / 2,
        );
    }
}