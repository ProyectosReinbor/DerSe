import { Circle } from "../circle";
import { Cuadrado } from "../cuadrado";
import { Curves_ENGINE } from "../curves";
import type { EntradaTexto } from "../entradaTexto";
import type { Lienzo } from "../lienzo";
import { Medidas } from "../medidas";

export class Ocultar extends Cuadrado {

  valor: string = "";
  entradaTexto: EntradaTexto;
  encendido: boolean;
  parpado: Curves_ENGINE;
  pupila: Circle;

  constructor(
    entradaTexto: EntradaTexto,
    lienzo: Lienzo,
    encendido: boolean,
  ) {
    super(
      entradaTexto.izquierdaSuperiorMasPorcentajeMedidas(
        new Medidas(88, 20)
      ),
      entradaTexto.medidas.porcentaje(
        new Medidas(10, 60)
      ),
      lienzo,
      "#AED6F1",
      "#EAF2F8",
      0
    );
    this.entradaTexto = entradaTexto;
    this.encendido = encendido;
    this.parpado = new Curves_ENGINE(
      canvas,
      false,
      "#fff",
      0.5
    );
    this.eyelid = new Curves_ENGINE(
      canvas,
      false,
      "#fff",
      0.5
    );
    this.eyelid.addCurve(
      input.leftUpPlusSizePercentages(
        new Size_ENGINE(89, 50)
      ),
      input.leftUpPlusSizePercentages(
        new Size_ENGINE(97, 50)
      ),
      input.leftUpPlusSizePercentages(
        new Size_ENGINE(93, 70)
      )
    );
    this.eyelid.addCurve(
      input.leftUpPlusSizePercentages(
        new Size_ENGINE(89, 50)
      ),
      input.leftUpPlusSizePercentages(
        new Size_ENGINE(97, 50)
      ),
      input.leftUpPlusSizePercentages(
        new Size_ENGINE(93, 20)
      )
    );
    this.iris = new Circle(
      input.leftUpPlusSizePercentages(
        new Size_ENGINE(87, 36)
      ),
      input.size.percentage(
        new Size_ENGINE(12, 26)
      ),
      canvas,
      0,
      360,
      false,
      "#fff",
      false,
      0,
    );
  }

  touchendHide(touch: Coordinate_ENGINE) {
    if (this.insidePositionCoordinate(touch) === false)
      return false;

    this.switchedOn = !this.switchedOn;
    return true;
  }

  drawHide() {
    this.drawSquare();
    this.eyelid.drawCurves();
    this.iris.drawCircle();
  }

  get encryption() {
    if (this.value.length === this.input.value.length)
      return this.value;

    const words = this.input.value.split(" ");
    for (const index in words) {
      const word = words[index];
      if (word === undefined)
        continue;

      words[index] = new Array(word.length).fill("*").join("");
    }
    this.value = words.join(" ");
    return this.value;
  }
}