import type { FillStyle, StrokeStyle } from "../contexto";
import { Coordenadas } from "../coordenadas";
import type { Lienzo } from "../lienzo";
import { Medidas } from "../medidas";
import { Plano } from "../plano";
import { Texto } from "../texto";
import { Tecla, type PresionarTecla } from "./tecla";

type ParametrosTecla = {
  medidas: Medidas;
  texto: {
    medidas: Medidas;
  };
  presionarTecla: PresionarTecla;
};

export class Teclas extends Coordenadas {

  parametrosTecla: ParametrosTecla;
  teclas: Tecla[] = [];
  lienzo: Lienzo;

  constructor(
    x: number,
    y: number,
    lienzo: Lienzo,
    caracteres: string,
    parametrosTecla: ParametrosTecla,
  ) {
    super(x, y);
    this.lienzo = lienzo;
    this.parametrosTecla = parametrosTecla;
    this.parametrosTecla.medidas.ancho /= caracteres.length;
    for (
      let indice = 0;
      indice < caracteres.length;
      indice++
    ) {
      const caracter = caracteres[indice];
      if (caracter === undefined)
        continue;

      this.agregarTecla(
        new Plano(indice, 0),
        {
          fillStyle: "#0F6097",
          strokeStyle: "#fff",
          lineWidth: 0.5,
          texto: {
            valor: caracter,
            fillStyle: "#fff",
            strokeStyle: false,
            dungeonFont: false
          },
        }
      );
    }
  }

  toqueTerminado(toque: Coordenadas) {
    return this.teclas.some(
      teclas => teclas.terminarToque(toque)
    );
  }

  agregarTecla(
    casillas: Plano,
    nuevaTecla: {
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
      this.parametrosTecla.medidas.ancho,
      this.parametrosTecla.medidas.alto
    );
    const superior = medidas.ancho * casillas.horizontal;
    const izquierda = medidas.alto * casillas.vertical;
    const tecla = new Tecla(
      new Coordenadas(
        this.x + superior,
        this.y + izquierda
      ),
      medidas,
      this.lienzo,
      nuevaTecla.fillStyle,
      nuevaTecla.strokeStyle,
      nuevaTecla.lineWidth,
      new Texto(
        new Coordenadas(0, 0),
        new Medidas(0, this.parametrosTecla.medidas.alto),
        this.lienzo,
        nuevaTecla.texto.valor,
        nuevaTecla.texto.fillStyle,
        nuevaTecla.texto.strokeStyle,
        nuevaTecla.texto.dungeonFont
      ),
      this.parametrosTecla.presionarTecla
    );
    this.teclas.push(tecla);
  }

  dibujarTeclas() {
    this.teclas.forEach(
      tecla => tecla.dibujarBoton()
    );
  }
}