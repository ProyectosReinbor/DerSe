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

    porcentaje(numerador: MedidaBidimensional) {
        const unPorciento = this.dividir(100);
        return new MedidaBidimensional(
            unPorciento.ancho * numerador.ancho,
            unPorciento.alto * numerador.alto,
        );
    }

    dividir(divisor: number) {
        return new MedidaBidimensional(
            this.ancho / divisor,
            this.alto / divisor,
        );
    }

    multiplicar(multiplicador: number) {
        return new MedidaBidimensional(
            this.ancho * multiplicador,
            this.alto * multiplicador
        );
    }
}