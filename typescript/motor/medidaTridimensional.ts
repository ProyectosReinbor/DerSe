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

    override get unPorciento() {
        return new MedidaTridimensional(
            super.unPorciento.ancho,
            super.unPorciento.alto,
            this.profundidad / 100,
        )
    }

    override porcentaje(porcentajes: MedidaTridimensional) {
        const porcentajeBidimensional = super.porcentaje(porcentajes);
        return new MedidaTridimensional(
            porcentajeBidimensional.ancho,
            porcentajeBidimensional.alto,
            this.unPorciento.profundidad * porcentajes.profundidad,
        );
    }

    override get mitad() {
        return new MedidaTridimensional(
            super.mitad.ancho,
            super.mitad.alto,
            this.profundidad / 2,
        );
    }
}