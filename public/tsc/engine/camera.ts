import { Coordenada } from "./coordenada";
import { Medidas } from "./medidas";
import { Posicion } from "./posicion";

export class Camara extends Posicion {
    constructor(props: { izquierdaSuperior: Coordenada }) {
        super({
            izquierdaSuperior: props.izquierdaSuperior,
            medidas: new Medidas({ ancho: 100, alto: 100 })
        });
    }

    posicionDentroCamara(posicion: Posicion) {
        const vision = new Posicion({
            izquierdaSuperior: new Coordenada({
                x: this.izquierdaSuperior.x - posicion.medidas.ancho,
                y: this.izquierdaSuperior.y - posicion.medidas.alto,
            }),
            medidas: new Medidas({
                ancho: this.medidas.ancho + (posicion.medidas.ancho * 2),
                alto: this.medidas.alto + (posicion.medidas.alto * 2),
            })
        });
        return vision.posicionDentroPosicion(posicion);
    }

    posicionEnCamara(posicion: Posicion) {
        const posicionDentroCamara = this.posicionDentroCamara(posicion);
        if (posicionDentroCamara === false)
            return false;

        return new Posicion({
            izquierdaSuperior: new Coordenada({
                x: posicion.izquierdaSuperior.x - this.izquierdaSuperior.x,
                y: posicion.izquierdaSuperior.y - this.izquierdaSuperior.y,
            }),
            medidas: new Medidas({
                ancho: posicion.medidas.ancho,
                alto: posicion.medidas.alto
            })
        });
    }

    enfocarPosicion(posicion: Posicion) {
        let x = posicion.izquierdaSuperior.x - (this.medidas.ancho / 2);
        x += posicion.medidas.ancho / 2;

        let y = posicion.izquierdaSuperior.y - (this.medidas.alto / 2);
        y += posicion.medidas.alto / 2;

        this.izquierdaSuperior.x = x;
        this.izquierdaSuperior.y = y;
    }
}