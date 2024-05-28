import { Casilla } from "./casilla";
import { Coordenadas } from "./coordenadas";
import { Medidas } from "./medidas";
import { Objeto } from "./objeto";

export type CasillasOcupadas = true | boolean[][];

export class Casillas extends Coordenadas {

    casillas: Casilla[][] = [];
    medidasCasilla: Medidas;
    longitudCasillasOcupadas: Coordenadas;
    casillasOcupadas: CasillasOcupadas;

    constructor(
        x: number,
        y: number,
        z: number,
        medidasCasilla: Medidas,
        longitudCasillasOcupadas: Coordenadas,
        casillasOcupadas: CasillasOcupadas,
    ) {
        super(x, y, z);
        this.medidasCasilla = medidasCasilla;
        this.longitudCasillasOcupadas = longitudCasillasOcupadas;
        this.casillasOcupadas = casillasOcupadas;
    }

    colision(coordenada: Coordenadas): Casilla | false {
        const objeto = new Objeto(
            coordenada,
            new Medidas(
                this.medidasCasilla.ancho,
                this.medidasCasilla.alto,
                this.medidasCasilla.profundidad
            )
        );

        const indicesCasillaIzquierdaSuperior = this.obtenerIndicesCasilla(
            new Coordenadas(
                objeto.izquierdaSuperior.x,
                objeto.izquierdaSuperior.y,
                objeto.izquierdaSuperior.z
            )
        );

        const indicesCasillaDerechaInferior = this.obtenerIndicesCasilla(
            new Coordenadas(
                objeto.derechaInferior.x,
                objeto.derechaInferior.y,
                objeto.derechaInferior.z
            )
        );

        const indicesCasilla = new Coordenadas(
            indicesCasillaIzquierdaSuperior.x,
            indicesCasillaIzquierdaSuperior.y,
            indicesCasillaIzquierdaSuperior.z
        );
        for (;
            indicesCasilla.y <= indicesCasillaDerechaInferior.y;
            indicesCasilla.y++
        ) {
            for (;
                indicesCasilla.x <= indicesCasillaDerechaInferior.x;
                indicesCasilla.x++
            ) {
                const casilla = this.obtenerCasilla(indicesCasilla);
                if (casilla === undefined)
                    continue;

                if (casilla.algunVerticeAdentro(objeto) === false)
                    continue;

                return casilla;
            }
        }
        return false;
    }

    nuevoObjeto(indicesCasilla: Coordenadas): Objeto {
        return new Objeto(
            new Coordenadas(
                indicesCasilla.x * this.medidasCasilla.ancho,
                indicesCasilla.y * this.medidasCasilla.alto,
                indicesCasilla.z * this.medidasCasilla.profundidad,
            ),
            new Medidas(
                this.medidasCasilla.ancho * this.longitudCasillasOcupadas.x,
                this.medidasCasilla.alto * this.longitudCasillasOcupadas.y,
                this.medidasCasilla.profundidad * this.longitudCasillasOcupadas.z
            )
        );
    }

    obtenerCasilla(indicesCasilla: Coordenadas) {
        const columnaCasillas = this.casillas[indicesCasilla.y];
        if (columnaCasillas === undefined)
            return undefined;

        return columnaCasillas[indicesCasilla.x];
    }

    obtenerIndicesCasilla(coordenada: Coordenadas) {
        const x = Math.floor(coordenada.x / this.medidasCasilla.ancho);
        const y = Math.floor(coordenada.y / this.medidasCasilla.alto);
        const z = Math.floor(coordenada.z / this.medidasCasilla.profundidad);
        return new Coordenadas(x, y, z);
    }

    asignarCasillaIndices(
        casillaIndices: Coordenadas,
        casilla: Casilla,
    ) {
        let fila = this.casillas[casillaIndices.y];
        if (fila === undefined)
            fila = [];

        fila[casillaIndices.x] = casilla;
        this.casillas[casillaIndices.y] = fila;
    }

    asignarCasilla(
        indicesCasilla: Coordenadas,
        indiceObjeto: number,
    ) {
        const medidas = new Medidas(
            this.medidasCasilla.ancho,
            this.medidasCasilla.alto,
            this.medidasCasilla.profundidad
        );
        const xCasilla = indicesCasilla.x * medidas.ancho;
        const yCasilla = indicesCasilla.y * medidas.alto;
        const zCasilla = indicesCasilla.z * medidas.profundidad;
        const superiorIzquierda = new Coordenadas(
            this.x + xCasilla,
            this.y + yCasilla,
            this.z + zCasilla,
        );
        const casilla = new Casilla(
            superiorIzquierda,
            medidas,
            indiceObjeto
        );
        this.asignarCasillaIndices(
            indicesCasilla,
            casilla
        );
    }

    asignarCasillasOcupadas(
        indicesInicialesObjeto: Coordenadas,
        indicesCasillaOcupada: Coordenadas,
        indiceObjeto: number,
    ) {
        const indicesCasilla = new Coordenadas(
            indicesInicialesObjeto.x + indicesCasillaOcupada.x,
            indicesInicialesObjeto.y + indicesCasillaOcupada.y,
            indicesInicialesObjeto.z + indicesCasillaOcupada.z
        );
        let filaCasillas = this.casillas[indicesCasilla.y];
        if (filaCasillas === undefined)
            filaCasillas = [];

        const casilla = this.obtenerCasilla(indicesCasilla);
        if (casilla !== undefined)
            return;

        this.asignarCasilla(
            indicesCasilla,
            indiceObjeto
        );
    }

    agregarObjeto(
        indicesCasilla: Coordenadas,
        indiceObjeto: number,
    ) {
        const casilla = this.obtenerCasilla(indicesCasilla);
        if (casilla !== undefined)
            return "ya esta agregado";

        if (this.casillasOcupadas === true) {
            const indices = new Coordenadas(0, 0, 0);
            for (;
                indices.y < this.longitudCasillasOcupadas.y;
                indices.y++
            ) {
                for (;
                    indices.x < this.longitudCasillasOcupadas.x;
                    indices.x++
                ) {
                    const indicesCasillaOcupada = new Coordenadas(
                        indices.x,
                        indices.y,
                        indices.z,
                    );
                    this.asignarCasillasOcupadas(
                        indicesCasilla,
                        indicesCasillaOcupada,
                        indiceObjeto
                    );
                }
            }
        } else {
            this.casillasOcupadas.forEach((fila, y) => {
                fila.forEach((ocupar, x) => {
                    if (ocupar === false)
                        return;

                    const indicesCasillaOcupada = new Coordenadas(y, x, 0);
                    this.asignarCasillasOcupadas(
                        indicesCasilla,
                        indicesCasillaOcupada,
                        indiceObjeto,
                    );
                });
            });
        }
        return true;
    }
}