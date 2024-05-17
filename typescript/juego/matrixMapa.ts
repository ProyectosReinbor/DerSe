import { Plano } from "../motor/plano";
import type { EstadoArbol } from "./mapa/arboles";
import type { ColorCastillo, EstadoCastillo } from "./mapa/castillo";
import type { EstadoManchaElevacion } from "./mapa/manchasElevaciones";

type Espuma = {
    arena: boolean;
};

type Elevacion = {
    piso: number;
    sombra: boolean;
    pasto: boolean;
};

type ParedElevacion = {
    sombra: true,
    mancha: EstadoManchaElevacion | false
};

type Escalera = {
    sombra: true,
    mancha: EstadoManchaElevacion | false
};

type Castillo = {
    color: ColorCastillo;
    estado: EstadoCastillo;
};

type Arbol = {
    estado: EstadoArbol;
};

type Casilla = {
    agua: boolean;
    espuma: false | Espuma;
    elevacion: false | Elevacion;
    paredElevacion: false | ParedElevacion;
    escalera: false | Escalera;
    castillo: false | Castillo;
    arbol: false | Arbol;
};

type ObtenerPisoCasillas = (indicesCasilla: Plano) => Casilla;

export type MatrizPiso = Casilla[][];

export class MatrizMapa {
    static longitudes = new Plano(37, 21);

    static obtenerCasillaVacia(): Casilla {
        return {
            agua: false,
            espuma: false,
            elevacion: false,
            paredElevacion: false,
            escalera: false,
            castillo: false,
            arbol: false,
        };
    }

    static obtenerCasillaPiso0(indicesCasilla: Plano) {
        const casilla = MatrizMapa.obtenerCasillaVacia();
        casilla.agua = true;
        if (
            indicesCasilla.vertical >= 3 && indicesCasilla.vertical <= 19 &&
            indicesCasilla.horizontal >= 1 && indicesCasilla.horizontal <= 35
        )
            casilla.espuma = {
                arena: true
            };

        if (
            indicesCasilla.vertical === 14 &&
            indicesCasilla.horizontal >= 11 && indicesCasilla.horizontal <= 13
        )
            casilla.escalera = {
                sombra: true,
                mancha: (indicesCasilla.horizontal === 11) ? "arena" : false
            };

        return casilla;
    }

    static obtenerCasillaPiso1(indicesCasilla: Plano) {
        const casilla = MatrizMapa.obtenerCasillaVacia();

        if (
            indicesCasilla.horizontal >= 2 && indicesCasilla.horizontal <= 34 &&
            indicesCasilla.vertical >= 2 && indicesCasilla.vertical <= 13
        )
            casilla.elevacion = {
                piso: 1,
                sombra: indicesCasilla.vertical >= 3,
                pasto: true
            };

        if (
            indicesCasilla.horizontal >= 2 && indicesCasilla.horizontal <= 10 &&
            indicesCasilla.vertical === 14
        )
            casilla.elevacion = {
                piso: 1,
                sombra: true,
                pasto: true
            };

        if (
            indicesCasilla.horizontal >= 14 && indicesCasilla.horizontal <= 34 &&
            indicesCasilla.vertical === 14
        )
            casilla.elevacion = {
                piso: 1,
                sombra: true,
                pasto: true
            };

        if (
            indicesCasilla.vertical === 15 &&
            indicesCasilla.horizontal >= 2 && indicesCasilla.horizontal <= 10
        ) {
            const manchaAleatoria = Math.round(Math.random());
            casilla.paredElevacion = {
                sombra: true,
                mancha: (manchaAleatoria === 0) ? "arena" : false
            };
        }

        if (
            indicesCasilla.vertical === 15 &&
            indicesCasilla.horizontal >= 14 && indicesCasilla.horizontal <= 34
        ) {
            const manchaAleatoria = Math.round(Math.random());
            casilla.paredElevacion = {
                sombra: true,
                mancha: (manchaAleatoria === 0) ? "arena" : false
            };
        }

        if (
            indicesCasilla.vertical === 7 &&
            indicesCasilla.horizontal >= 11 && indicesCasilla.horizontal <= 13
        ) {
            casilla.escalera = {
                sombra: true,
                mancha: (indicesCasilla.horizontal === 9) ? "pasto" : false
            };
        }

        if (indicesCasilla.vertical === 3 && indicesCasilla.horizontal === 14) {
            casilla.arbol = {
                estado: "derribado"
            }
        }

        return casilla;
    }

    static obtenerCasillaPiso2(indicesCasilla: Plano) {
        const casilla = MatrizMapa.obtenerCasillaVacia();

        if (
            indicesCasilla.horizontal >= 6 && indicesCasilla.horizontal <= 30 &&
            indicesCasilla.vertical >= 1 && indicesCasilla.vertical <= 6
        ) {
            casilla.elevacion = {
                piso: 2,
                sombra: indicesCasilla.vertical >= 3,
                pasto: true
            };
        }
        if (
            indicesCasilla.horizontal >= 6 && indicesCasilla.horizontal <= 10 &&
            indicesCasilla.vertical === 7
        ) {
            casilla.elevacion = {
                piso: 2,
                sombra: true,
                pasto: true
            };
        }

        if (
            indicesCasilla.horizontal >= 14 && indicesCasilla.horizontal <= 30 &&
            indicesCasilla.vertical === 7
        ) {
            casilla.elevacion = {
                piso: 2,
                sombra: true,
                pasto: true
            };
        }

        if (
            indicesCasilla.vertical === 8 &&
            indicesCasilla.horizontal >= 6 && indicesCasilla.horizontal <= 10
        ) {
            const manchaAleatoria = Math.round(Math.random());
            casilla.paredElevacion = {
                sombra: true,
                mancha: (manchaAleatoria === 0) ? "pasto" : false
            };
        }

        if (
            indicesCasilla.vertical === 8 &&
            indicesCasilla.horizontal >= 14 && indicesCasilla.horizontal <= 30
        ) {
            const manchaAleatoria = Math.round(Math.random());
            casilla.paredElevacion = {
                sombra: true,
                mancha: (manchaAleatoria === 0) ? "pasto" : false
            };
        }

        return casilla;
    }

    static obtenerPisosCasillas: ObtenerPisoCasillas[] = [
        MatrizMapa.obtenerCasillaPiso0,
        MatrizMapa.obtenerCasillaPiso1,
        MatrizMapa.obtenerCasillaPiso2,
    ];

    static get obtener(): MatrizPiso[] {
        const mapa: MatrizPiso[] = [];
        for (
            let piso = 0;
            piso < MatrizMapa.obtenerPisosCasillas.length;
            piso++
        ) {
            mapa[piso] = [];
            const matrizPiso = mapa[piso];
            if (matrizPiso === undefined)
                continue;

            const indicesCasilla = new Plano(0, 0);

            for (
                indicesCasilla.vertical = 0;
                indicesCasilla.vertical < MatrizMapa.longitudes.vertical;
                indicesCasilla.vertical++
            ) {
                matrizPiso[indicesCasilla.vertical] = [];
                const fila = matrizPiso[indicesCasilla.vertical];
                if (fila === undefined)
                    continue;

                for (
                    indicesCasilla.horizontal = 0;
                    indicesCasilla.horizontal < MatrizMapa.longitudes.horizontal;
                    indicesCasilla.horizontal++
                ) {
                    const obtenerPisoCasillas = MatrizMapa.obtenerPisosCasillas[piso];
                    if (obtenerPisoCasillas === undefined)
                        continue;

                    fila[indicesCasilla.horizontal] = obtenerPisoCasillas(indicesCasilla);
                }
            }
        }
        return mapa;
    }
}