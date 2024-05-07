import { Boton } from "../boton";
import type { FillStyle, StrokeStyle } from "../contexto";
import type { Coordenadas } from "../coordenadas";
import type { Lienzo } from "../lienzo";
import type { Medidas } from "../medidas";
import type { Texto } from "../texto";

export type PresionarTecla = (caracter: string) => void;

export class Tecla extends Boton {

    presionarTecla: PresionarTecla;

    constructor(
        izquierdaSuperior: Coordenadas,
        medidas: Medidas,
        lienzo: Lienzo,
        fillStyle: FillStyle,
        strokeStyle: StrokeStyle,
        lineWidth: number,
        texto: Texto,
        presionarTecla: PresionarTecla,
    ) {
        super(
            izquierdaSuperior,
            medidas,
            lienzo,
            fillStyle,
            strokeStyle,
            lineWidth,
            texto,
        );
        this.presionarTecla = presionarTecla;
    }

    terminarToque(toque: Coordenadas) {
        if (this.coordenadasAdentro(toque) === false)
            return false;

        this.presionarTecla(this.texto.valor);
        return true;
    }
} 