import { MedidaBidimensional } from "./medidaBidimensional";

export class MedidaTridimensional extends MedidaBidimensional {

    profundidad: number;

    constructor(
        ancho: number,
        alto: number,
        profundidad: number,
    ) {
        super(ancho, alto);
        this.profundidad = profundidad;
    }

    override porcentaje(numerador: MedidaTridimensional) {
        const cantidad = super.porcentaje(numerador);
        const unPorciento = this.dividir(100);
        return new MedidaTridimensional(
            cantidad.ancho,
            cantidad.alto,
            unPorciento.profundidad * numerador.profundidad,
        );
    }
    
    override dividir(divisor: number) {
        const cociente = super.dividir(divisor);
        return new MedidaTridimensional(
            cociente.ancho,
            cociente.alto,
            this.profundidad / divisor
        );
    }

    override multiplicar(multiplicador: number) {
        const producto = super.multiplicar(multiplicador);
        return new MedidaTridimensional(
            producto.ancho,
            producto.alto,
            this.profundidad * multiplicador
        );
    }
}