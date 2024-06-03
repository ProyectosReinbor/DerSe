import { CoordenadaTridimensional } from "./coordenadaTridimensional";
import { MedidaTridimensional } from "./medidaTridimensional";
import { PosicionCajaBidimensional } from "./posicionCajaBidimensional";
import { VerticesCajaTridimensional } from "./verticesCajaTridimensional";

export class PosicionCajaTridimensional extends PosicionCajaBidimensional {

  override centro: CoordenadaTridimensional;
  override medidas: MedidaTridimensional;

  constructor(
    x: number,
    y: number,
    z: number,
    ancho: number,
    alto: number,
    profundidad: number,
  ) {
    super(x, y, ancho, alto);
    this.centro = new CoordenadaTridimensional(x, y, z);
    this.medidas = new MedidaTridimensional(ancho, alto, profundidad);
  }

  override obtenerVertice(verticesCaja: VerticesCajaTridimensional) {
    const verticeBidimensional = super.obtenerVertice(verticesCaja);
    const desplazamientoZ = this.medidas.mitad.profundidad * verticesCaja.zNumero;
    const z = this.centro.z + desplazamientoZ;
    return new CoordenadaTridimensional(
      verticeBidimensional.x,
      verticeBidimensional.y,
      z
    );
  }


  override posicionRelativa(partesPorcentaje: MedidaTridimensional) {
    const izquierdaSuperiorAtras = this.obtenerVertice(
      new VerticesCajaTridimensional("izquierda", "superior", "atras")
    );
    const porcentaje = this.medidas.porcentaje(partesPorcentaje);
    const posicionRelativaBidimensional = super.posicionRelativa(partesPorcentaje);
    const z = izquierdaSuperiorAtras.z + porcentaje.profundidad;
    return new CoordenadaTridimensional(
      posicionRelativaBidimensional.x,
      posicionRelativaBidimensional.y,
      z
    );
  }

  override coordenadaAdentro(objetivo: CoordenadaTridimensional) {
    const izquierdaSuperiorAtras = this.obtenerVertice("izquierda", "superior", "atras");
    const derechaInferiorAdelante = this.obtenerVertice("derecha", "inferior", "adelante");
    const coordenadaAdentroBidimensional = super.coordenadaAdentro(objetivo);
    return coordenadaAdentroBidimensional &&
      izquierdaSuperiorAtras.z <= objetivo.z &&
      objetivo.z <= derechaInferiorAdelante.z;
  }

  posicionCajaAdentro(objetivo: PosicionCajaTridimensional) {
    const posicionCajaAdentroBidimensional = super.posicionCajaAdentro(objetivo);
    const izquierdaSuperiorAtras = this.obtenerVertice("izquierda", "superior", "atras");
    const derechaInferiorAdelante = this.obtenerVertice("derecha", "inferior", "adelante");
    const objetivoIzquierdaSuperiorAtras = objetivo.obtenerVertice("izquierda", "superior", "atras");
    const objetivoDerechaInferiorAdelante = objetivo.obtenerVertice("derecha", "inferior", "adelante");
    return posicionCajaAdentroBidimensional &&
      izquierdaSuperiorAtras.z <= objetivoIzquierdaSuperiorAtras.z &&
      objetivoDerechaInferiorAdelante.z <= derechaInferiorAdelante.z;
  }

  override algunVerticeAdentro(objetivo: PosicionCajaTridimensional): [
    VerticeXPosicionCaja,
    VerticeYPosicionCaja,
    VerticeZPosicionCaja
  ] | false {
    const izquierdaSuperior = objetivo.obtenerVertice("izquierda", "superior");
    const izquierdaSuperiorAdentro = this.coordenadaAdentro(izquierdaSuperior);
    if (izquierdaSuperiorAdentro)
      return ["izquierda", "superior"];

    const izquierdaInferior = objetivo.obtenerVertice("izquierda", "inferior");
    const izquierdaInferiorAdentro = this.coordenadaAdentro(izquierdaInferior);
    if (izquierdaInferiorAdentro)
      return ["izquierda", "inferior"];

    const derechaSuperior = objetivo.obtenerVertice("derecha", "superior");
    const derechaSuperiorAdentro = this.coordenadaAdentro(derechaSuperior);
    if (derechaSuperiorAdentro)
      return ["derecha", "superior"];

    const derechaInferior = objetivo.obtenerVertice("derecha", "inferior");
    const derechaInferiorAdentro = this.coordenadaAdentro(derechaInferior);
    if (derechaInferiorAdentro)
      return ["derecha", "inferior"];

    return false;
  }
}
