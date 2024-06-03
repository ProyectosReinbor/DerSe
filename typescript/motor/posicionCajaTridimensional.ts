import { CoordenadaTridimensional } from "./coordenadaTridimensional";
import { MedidaTridimensional } from "./medidaTridimensional";
import { PosicionCajaBidimensional } from "./posicionCajaBidimensional";
import type { NombresXVerticesCaja, NombresYVerticesCaja } from "./verticesCajaBidimensional";
import { VerticesCajaTridimensional, type NombresZVerticesCaja } from "./verticesCajaTridimensional";

export class PosicionCajaTridimensional extends PosicionCajaBidimensional {

  override centro: CoordenadaTridimensional;
  override medidas: MedidaTridimensional;

  constructor(
    centro: CoordenadaTridimensional,
    medidas: MedidaTridimensional
  ) {
    super(centro, medidas);
    this.centro = centro;
    this.medidas = medidas;
  }

  override obtenerVertice(
    verticesCaja?: VerticesCajaTridimensional,
    parametrosVerticesCaja?: [NombresXVerticesCaja, NombresYVerticesCaja, NombresZVerticesCaja],
    ) {
    const verticeBidimensional = super.obtenerVertice(verticesCaja, parametrosVerticesCaja);
    const desplazamientoZ = this.medidas.dividir(2).profundidad * verticesCaja.zNumero;
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
    const izquierdaSuperiorAtras = this.obtenerVertice(
      new VerticesCajaTridimensional("izquierda", "superior", "atras")
    );
    const derechaInferiorAdelante = this.obtenerVertice(
      new VerticesCajaTridimensional("derecha", "inferior", "adelante")
    );
    const coordenadaAdentroBidimensional = super.coordenadaAdentro(objetivo);
    return coordenadaAdentroBidimensional &&
      izquierdaSuperiorAtras.z <= objetivo.z &&
      objetivo.z <= derechaInferiorAdelante.z;
  }

  override posicionCajaAdentro(objetivo: PosicionCajaTridimensional) {
    const posicionCajaAdentroBidimensional = super.posicionCajaAdentro(objetivo);
    const izquierdaSuperiorAtras = this.obtenerVertice(
      new VerticesCajaTridimensional("izquierda", "superior", "atras")
    );
    const derechaInferiorAdelante = this.obtenerVertice(
      new VerticesCajaTridimensional("derecha", "inferior", "adelante")
    );
    const objetivoIzquierdaSuperiorAtras = objetivo.obtenerVertice(
      new VerticesCajaTridimensional("izquierda", "superior", "atras")
    );
    const objetivoDerechaInferiorAdelante = objetivo.obtenerVertice(
      new VerticesCajaTridimensional("derecha", "inferior", "adelante")
    );
    return posicionCajaAdentroBidimensional &&
      izquierdaSuperiorAtras.z <= objetivoIzquierdaSuperiorAtras.z &&
      objetivoDerechaInferiorAdelante.z <= derechaInferiorAdelante.z;
  }

  override algunVerticeAdentro(objetivo: PosicionCajaTridimensional) {
    const verticesCaja = super.algunVerticeAdentro(objetivo);
    if (verticesCaja !== false) {
      const verticesAtras = new VerticesCajaTridimensional(
        verticesCaja.nombreX,
        verticesCaja.nombreY,
        "atras"
      );
      const atras = objetivo.obtenerVertice(verticesAtras);
      const atrasAdentro = this.coordenadaAdentro(atras);
      if (atrasAdentro)
        return verticesAtras;

      const verticesAdelante = new VerticesCajaTridimensional(
        verticesCaja.nombreX,
        verticesCaja.nombreY,
        "adelante"
      );
      const adelante = objetivo.obtenerVertice(verticesAdelante);
      const adelanteAdentro = this.coordenadaAdentro(adelante);
      if (adelanteAdentro)
        return verticesAdelante;
    }
    return false;
  }
}
