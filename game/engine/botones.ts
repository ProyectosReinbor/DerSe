import { Boton } from "./boton";
import type { FillStyle, StrokeStyle } from "./contexto";
import { Coordenadas } from "./coordenadas";
import type { Lienzo } from "./lienzo";
import { Medidas } from "./medidas";
import { Objeto } from "./objeto";
import type { Plano } from "./plano";
import { Texto } from "./texto";

type ParametrosBoton = {
  medidas: Medidas;
  texto: {
    medidas: Medidas;
  }
}

export class Botones extends Objeto {

  botones: Boton[] = [];
  lienzo: Lienzo;
  parametrosBoton: ParametrosBoton;

  constructor(
    izquierdaSuperior: Coordenadas,
    medidas: Medidas,
    lienzo: Lienzo,
    parametrosBoton: ParametrosBoton,
  ) {
    super(
      izquierdaSuperior,
      medidas,
    );
    this.lienzo = lienzo;
    this.parametrosBoton = parametrosBoton;
  }

  agregarBoton(
    casillas: Plano,
    parametrosBoton: {
      fillStyle: FillStyle;
      strokeStyle: StrokeStyle;
      lineWidth: number;
      texto: {
        valor: string;
        fillStyle: FillStyle;
        strokeStyle: StrokeStyle;
        dungeonFont: boolean;
      };
    }
  ) {
    const medidas = new Medidas(
      this.parametrosBoton.medidas.ancho,
      this.parametrosBoton.medidas.alto
    );
    const izquierda = medidas.ancho * casillas.horizontal;
    const superior = medidas.alto * casillas.vertical;
    const boton = new Boton(
      new Coordenadas(
        this.izquierdaSuperior.x + superior,
        this.izquierdaSuperior.y + izquierda,
      ),
      medidas,
      this.lienzo,
      parametrosBoton.fillStyle,
      parametrosBoton.strokeStyle,
      parametrosBoton.lineWidth,
      new Texto(
        new Coordenadas(0, 0),
        new Medidas(
          0,
          this.parametrosBoton.texto.medidas.alto
        ),
        this.lienzo,
        parametrosBoton.texto.valor,
        parametrosBoton.texto.fillStyle,
        parametrosBoton.texto.strokeStyle,
        parametrosBoton.texto.dungeonFont
      )
    );
    this.botones.push(boton);
  }

  dibujarBotones() {
    this.botones.forEach(
      boton => boton.dibujarBoton()
    );
  }
}