import { Escena } from "../motor/escena";

export class Juego extends Escena {

    mapa: Map_ENGINE;
    pawns: Pawn_ENGINE[] = [];
    sheepGroup: Sheep_ENGINE[] = [];

    constructor(canvas: Canvas_ENGINE) {
        super(canvas);
        this.map = new Map_ENGINE(canvas);
        this.sheepGroup = [
            new Sheep_ENGINE(
                new Coordinate_ENGINE(35, 50),
                // Math.floor(Math.random() * this.map.size.width),
                // Math.floor(Math.random() * this.map.size.height)
                // }),
                this.map,
                canvas
            )
        ];
    }

    tiktokGift(gift: {
        giftName: string;
        giftPictureUrl: string;
        repeatCount: number;
        nickname: string;
        profilePictureUrl: PathImage_ENGINE;
    }) {
        const exist = this.pawns.some((pawn) => pawn.nickname === gift.nickname);
        if (exist === true) return;
        this.pawns.push(
            new Pawn_ENGINE(
                new Coordinate_ENGINE(
                    Math.floor(Math.random() * this.map.size.width),
                    Math.floor(Math.random() * this.map.size.height),
                ),
                this.map,
                this.canvas,
                "blue",
                gift.nickname,
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
        this.map.drawMap();
        this.pawns.forEach(
            pawn => pawn.drawPawn()
        );
        this.sheepGroup.forEach(
            sheep => sheep.drawSheep()
        );
    }
}