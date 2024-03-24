import { Circle } from "../circle";
import { Cuadrado } from "../cuadrado";
import { Curves } from "../curves";
import type { Entrada } from "../entrada";
import type { Lienzo } from "../lienzo";
import { Medidas } from "../medidas";

export class Ocultar extends Cuadrado {

  valor: string = "";
  entrada: Entrada;
  encendido: boolean;
  parpado: Curves;
  iris: Circle;

  constructor(parametros: {
    lienzo: Lienzo,
    entrada: Entrada,
    encendido: boolean,
  }) {
    super({
      lienzo: parametros.lienzo,
      izquierdaSuperior: parametros.entrada.izquierdaSuperiorMasMedidasPorcentaje(
        new Medidas({ ancho: 88, alto: 20 })
      ),
      medidas: parametros.entrada.medidas.porcentaje(
        new Medidas({ ancho: 10, alto: 60 })
      ),
      fillStyle: "#AED6F1",
      strokeStyle: "#EAF2F8",
    });
    this.entrada = parametros.entrada;
    this.encendido = parametros.encendido;
    this.parpado = new Curves({
      lienzo: this.lienzo,
      fillStyle: false,
      strokeStyle: "#fff",
      lineWidth: 0.5
    });
    this.eyelid = new Curves({
      canvas: props.canvas,
      fillStyle: false,
      strokeStyle: "#fff",
      lineWidth: 0.5
    });
    this.eyelid.addCurve(
      props.input.endPercentage(
        new Size({ width: 89, height: 50 })
      ),
      props.input.endPercentage(
        new Size({ width: 97, height: 50 })
      ),
      props.input.endPercentage(
        new Size({ width: 93, height: 70 }))
    );
    this.eyelid.addCurve(
      props.input.endPercentage(
        new Size({ width: 89, height: 50 })
      ),
      props.input.endPercentage(
        new Size({ width: 97, height: 50 })
      ),
      props.input.endPercentage(
        new Size({ width: 93, height: 20 })
      )
    );
    this.iris = new Circle({
      initial: props.input.endPercentage(
        new Size({ width: 87, height: 36 })
      ),
      size: props.input.size.percentage(
        new Size({ width: 12, height: 26 })
      ),
      canvas: props.canvas,
      startingDegrees: 0,
      finalDegrees: 360,
      counterclockwise: false,
      fillStyle: "#fff",
      strokeStyle: false,
      lineWidth: 0,
    });
  }

  touchendHide(touch: Coordinate) {
    if (this.insideCoordinate(touch) === false) return false;
    this.turnOn = !this.turnOn;
    return true;
  }

  drawHide() {
    this.drawRect();
    this.eyelid.drawCurves();
    this.iris.drawCircle();
  }

  get encryption() {
    if (this.value.length === this.input.value.length) return this.value;
    const words = this.input.value.split(" ");
    for (const index in words) {
      const word = words[index];
      if (word === undefined) continue;
      words[index] = new Array(word.length).fill("*").join("");
    }
    this.value = words.join(" ");
    return this.value;
  }
}