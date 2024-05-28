import { Boton } from "./boton";
import type { FillStyle, StrokeStyle } from "./contexto";
import { Coordenadas } from "./coordenadas";
import type { Lienzo } from "./lienzo";
import { Medidas } from "./medidas";
import { Objeto } from "./objeto";

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
    casillas: Coordenadas,
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
      this.parametrosBoton.medidas.alto,
      this.parametrosBoton.medidas.profundidad
    );
    const izquierda = medidas.ancho * casillas.x;
    const superior = medidas.alto * casillas.y;
    const boton = new Boton(
      new Coordenadas(
        this.izquierdaSuperior.x + superior,
        this.izquierdaSuperior.y + izquierda,
        this.izquierdaSuperior.z,
      ),
      medidas,
      this.lienzo,
      parametrosBoton.fillStyle,
      parametrosBoton.strokeStyle,
      parametrosBoton.lineWidth,
      {
        medidas: new Medidas(
          0,
          this.parametrosBoton.texto.medidas.alto,
          1
        ),
        ...parametrosBoton.texto
      },
    );
    this.botones.push(boton);
  }

  dibujarBotones() {
    this.botones.forEach(
      boton => boton.dibujarBoton()
    );
  }
}