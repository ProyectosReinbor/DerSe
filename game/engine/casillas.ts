import { Casilla } from "./casilla";
import { Coordenadas } from "./coordenadas";
import { Medidas } from "./medidas";
import { Objeto } from "./objeto";
import { Plano } from "./plano";

export type CasillasOcupadas = true | boolean[][];

export class Casillas extends Coordenadas {

    casillas: Casilla[][] = [];
    medidasCasilla: Medidas;
    longitudCasillasOcupadas: Plano;
    casillasOcupadas: CasillasOcupadas;

    constructor(
        x: number,
        y: number,
        medidasCasilla: Medidas,
        longitudCasillasOcupadas: Plano,
        casillasOcupadas: CasillasOcupadas,
    ) {
        super(x, y);
        this.medidasCasilla = medidasCasilla;
        this.longitudCasillasOcupadas = longitudCasillasOcupadas;
        this.casillasOcupadas = casillasOcupadas;
    }

    colision(coordenada: Coordenadas): Casilla | false {
        const objeto = new Objeto(
            coordenada,
            new Medidas(
                this.medidasCasilla.ancho,
                this.medidasCasilla.alto
            )
        );

        const indicesCasillaIzquierdaSuperior = this.obtenerIndicesCasilla(
            new Coordenadas(
                objeto.izquierdaSuperior.x,
                objeto.izquierdaSuperior.y
            )
        );

        const indicesCasillaDerechaInferior = this.obtenerIndicesCasilla(
            new Coordenadas(
                objeto.derechaInferior.x,
                objeto.derechaInferior.y
            )
        );

        const indicesCasilla = new Plano(
            indicesCasillaIzquierdaSuperior.vertical,
            indicesCasillaIzquierdaSuperior.horizontal
        );
        for (;
            indicesCasilla.vertical <= indicesCasillaDerechaInferior.vertical;
            indicesCasilla.vertical++
        ) {
            for (;
                indicesCasilla.horizontal <= indicesCasillaDerechaInferior.horizontal;
                indicesCasilla.horizontal++
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

    nuevoObjeto(indicesCasilla: Plano): Objeto {
        const x = indicesCasilla.horizontal * this.medidasCasilla.ancho;
        const y = indicesCasilla.vertical * this.medidasCasilla.alto;
        const ancho = this.medidasCasilla.ancho * this.longitudCasillasOcupadas.horizontal;
        const alto = this.medidasCasilla.alto * this.longitudCasillasOcupadas.vertical;
        return new Objeto(
            new Coordenadas(x, y),
            new Medidas(
                ancho,
                alto
            )
        );
    }

    obtenerCasilla(indicesCasilla: Plano): Casilla | undefined {
        const columnaCasillas = this.casillas[indicesCasilla.vertical];
        if (columnaCasillas === undefined)
            return undefined;

        return columnaCasillas[indicesCasilla.horizontal];
    }

    obtenerIndicesCasilla(coordenada: Coordenadas): Plano {
        const horizontal = Math.floor(coordenada.x / this.medidasCasilla.ancho);
        const vertical = Math.floor(coordenada.y / this.medidasCasilla.alto);
        return new Plano(horizontal, vertical);
    }

    asignarCasillaIndices(
        casillaIndices: Plano,
        casilla: Casilla,
    ) {
        let fila = this.casillas[casillaIndices.vertical];
        if (fila === undefined)
            fila = [];

        fila[casillaIndices.horizontal] = casilla;
        this.casillas[casillaIndices.vertical] = fila;
    }

    asignarCasilla(
        indicesCasilla: Plano,
        indiceObjeto: number,
    ) {
        const medidas = new Medidas(
            this.medidasCasilla.ancho,
            this.medidasCasilla.alto
        );
        const distanceX = indicesCasilla.horizontal * medidas.ancho;
        const distanceY = indicesCasilla.vertical * medidas.alto;
        const superiorIzquierda = new Coordenadas(
            this.x + distanceX,
            this.y + distanceY,
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
        indicesInicialesObjeto: Plano,
        indicesCasillasOcupadas: Plano,
        indiceObjeto: number,
    ) {
        const horizontal = indicesInicialesObjeto.horizontal + indicesCasillasOcupadas.vertical;
        const vertical = indicesInicialesObjeto.vertical + indicesCasillasOcupadas.horizontal;
        const indicesCasilla = new Plano(horizontal, vertical);
        let filaCasillas = this.casillas[indicesCasilla.vertical];
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
        indicesCasilla: Plano,
        indiceObjeto: number,
    ) {
        const casilla = this.obtenerCasilla(indicesCasilla);
        if (casilla !== undefined)
            return "ya esta agregado";

        if (this.casillasOcupadas === true) {
            for (
                let vertical = 0;
                vertical < this.longitudCasillasOcupadas.vertical;
                vertical++
            ) {
                for (
                    let horizontal = 0;
                    horizontal < this.longitudCasillasOcupadas.horizontal;
                    horizontal++
                ) {
                    const indicesCasillasOcupadas = new Plano(
                        horizontal,
                        vertical
                    );
                    this.asignarCasillasOcupadas(
                        indicesCasilla,
                        indicesCasillasOcupadas,
                        indiceObjeto
                    );
                }
            }
        } else {
            this.casillasOcupadas.forEach((fila, vertical) => {
                fila.forEach((ocupar, horizontal) => {
                    if (ocupar === false)
                        return;

                    const indexesBoxOccupy = new Plano(
                        horizontal,
                        vertical
                    );
                    this.asignarCasillasOcupadas(
                        indicesCasilla,
                        indexesBoxOccupy,
                        indiceObjeto,
                    );
                });
            });
        }
        return true;
    }
}