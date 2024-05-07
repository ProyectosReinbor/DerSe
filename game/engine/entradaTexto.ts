import type { FillStyle, StrokeStyle } from "./contexto";
import type { Coordenadas } from "./coordenadas";
import { Cuadrado } from "./cuadrado";
import type { Ocultar } from "./entradaTexto/ocultar";
import type { Lienzo } from "./lienzo";
import type { Medidas } from "./medidas";
import type { Texto } from "./texto";

type ParametrosTexto = {
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;
}

type ParametrosInformacion = {
    fillStyle: FillStyle;
    strokeStyle: StrokeStyle;
    valor: string;
}

export class EntradaTexto extends Cuadrado {

    valor: string = "";
    ocultar: Ocultar;
    parametrosTexto: ParametrosTexto;
    parametrosInformacion: ParametrosInformacion;
    texto: Texto;

    constructor(
        izquierdaSuperior: Coordenadas,
        medidas: Medidas,
        lienzo: Lienzo,
        fillStyle: FillStyle,
        strokeStyle: StrokeStyle,
        lineWidth: number,
        ocultar: Ocultar,
        parametrosTexto: ParametrosTexto,
        parametrosInformacion: ParametrosInformacion,
        texto: Texto,
    ) {
        super(
            izquierdaSuperior,
            medidas,
            lienzo,
            fillStyle,
            strokeStyle,
            lineWidth
        );
        this.ocultar = ocultar;
        this.parametrosTexto = parametrosTexto;
        this.parametrosInformacion = parametrosInformacion;
        this.texto = texto;
    }

    toqueTerminado() {
        if (this.lienzo.eventosToques.modoToque !== "terminar")
            return;

        this.lienzo.eventosToques.toques.forEach(
            toque => {
                if (this.ocultar.touchendHide(toque) === true)
                    return;

                if (this.coordenadasAdentro(toque) === false)
                    return;
            }
        );
    }

    get valorTexto() {
        if (this.valor.length === 0)
            return this.parametrosInformacion.valor;

        if (this.ocultar.encendido === false)
            return this.valor;

        return this.ocultar.encryption;
    }

    dibujarEntradaTexto() {
        this.dibujarCuadrado();
        this.texto.valor = this.valorTexto;
        this.ocultar.drawHide();
        this.texto.dibujarTexto();
    }

    borrarUltimoCaracter() {
        this.valor = this.valor.slice(0, -1);
    }

    agregarSaltoLinea() {
        this.agregarCaracter("\n");
    }

    agregarCaracter(character: string) {
        this.valor += character;
    }
}
