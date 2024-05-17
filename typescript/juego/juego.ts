import { Coordenadas } from "../motor/coordenadas";
import { Escena } from "../motor/escena";
import type { Lienzo } from "../motor/lienzo";
import { Mapa } from "./mapa";
import { Oveja } from "./oveja";
import { Peon } from "./peon";
import type { RegaloTiktok } from "./tiktok";

export class Juego extends Escena {

    mapa: Mapa;
    peones: Peon[] = [];
    ovejas: Oveja[] = [];

    constructor(lienzo: Lienzo) {
        super(lienzo);
        this.mapa = new Mapa(lienzo);
        this.ovejas = [
            new Oveja(
                new Coordenadas(
                    35, 50),
                // Math.floor(Math.random() * this.map.size.width),
                // Math.floor(Math.random() * this.map.size.height)
                // }),
                this.mapa,
                lienzo
            )
        ];
    }

    regaloTiktok(regalo: RegaloTiktok) {
        const existe = this.peones.some(
            (peon) => peon.apodo === regalo.nickname
        );
        if (existe === true) return;
        this.peones.push(
            new Peon(
                new Coordenadas(
                    Math.floor(Math.random() * this.mapa.medidas.ancho),
                    Math.floor(Math.random() * this.mapa.medidas.alto),
                ),
                this.mapa,
                this.lienzo,
                "blue",
                regalo.nickname,
            )
        );
    }

    tiktokChat(chat: {
        message: string;
        nickname: string;
        profilePictureUrl: string;
    }) {
        console.log(chat);
    }

    override draw = () => {
        this.mapa.dibujarMapa();
        this.peones.forEach(
            pawn => pawn.dibujarPeon()
        );
        this.ovejas.forEach(
            oveja => oveja.dibujar()
        );
    }
}