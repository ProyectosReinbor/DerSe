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

    get unPorcientoBidimensional() {
        return new MedidaBidimensional(
            this.ancho / 100,
            this.alto / 100,
        );
    }

    porcentajeBidimensional(porcentajes: MedidaBidimensional) {
        return new MedidaBidimensional(
            this.unPorcientoBidimensional.ancho * porcentajes.ancho,
            this.unPorcientoBidimensional.alto * porcentajes.alto,
        );
    }

    get mitadBidimensional() {
        return new MedidaBidimensional(
            this.ancho / 2,
            this.alto / 2,
        );
    }
}