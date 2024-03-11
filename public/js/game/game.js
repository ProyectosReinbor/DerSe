import { Scene } from "../engine/scene.js";
import { Map } from "./map.js";
import { Pawn } from "./pawn.js";

export class Game extends Scene {
    constructor(canvas) {
        super(canvas);
        this.map = new Map(this.canvas, 15, 15);
        this.pawns = [];
    }

    tiktokGift(gift) {
        const name = gift.giftName;
        const pictureUrl = gift.giftPictureUrl;
        const repeatCount = gift.repeatCount;
        const nickname = gift.nickname;
        const profilePictureUrl = gift.profilePictureUrl;
        const exist = this.pawns.some((pawn) => pawn.nickname === nickname);
        if (exist === true) return;
        this.pawns.push(
            new Pawn(
                Math.floor(Math.random() * this.map.size.width),
                Math.floor(Math.random() * this.map.size.height),
                this.map,
                this.canvas,
                0,
                nickname,
                profilePictureUrl,
            )
        );
    }

    tiktokChat(chat) {
        const message = chat.message;
        const nickname = chat.nickname;
        const profilePictureUrl = chat.profilePictureUrl;
    }

    draw() {
        this.map.drawMap();
        this.pawns.forEach(pawn => pawn.drawPawn());
    }
}