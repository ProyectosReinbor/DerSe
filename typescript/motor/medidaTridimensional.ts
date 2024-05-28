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

    get unPorcientoTridimensional() {
        return new MedidaTridimensional(
            this.unPorcientoBidimensional.ancho,
            this.unPorcientoBidimensional.alto,
            this.profundidad / 100,
        )
    }

    porcentajeTridimensional(porcentajes: MedidaTridimensional) {
        return new MedidaTridimensional(
            this.unPorcientoTridimensional.ancho * porcentajes.ancho,
            this.unPorcientoTridimensional.alto * porcentajes.alto,
            this.unPorcientoTridimensional.profundidad * porcentajes.profundidad,
        );
    }

    get mitadTridimensional() {
        return new MedidaTridimensional(
            this.mitadBidimensional.ancho,
            this.mitadBidimensional.alto,
            this.profundidad / 2,
        );
    }
}