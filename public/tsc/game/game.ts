import type { Canvas } from "../engine/canvas.js";
import { Coordinate } from "../engine/coordinate.js";
import { Scene } from "../engine/scene.js";
import { Map } from "./map.js";
import { Pawn } from "./pawn.js";

export class Game extends Scene {
    map: Map;
    pawns: Pawn[] = [];
    constructor(
        canvas: Canvas
    ) {
        super(canvas);
        this.map = new Map(this.canvas);
    }

    tiktokGift(gift: {
        giftName: string;
        giftPictureUrl: string;
        repeatCount: number;
        nickname: string;
        profilePictureUrl: string;
    }) {
        const exist = this.pawns.some((pawn) => pawn.nickname === gift.nickname);
        if (exist === true) return;
        this.pawns.push(
            new Pawn(
                new Coordinate(
                    Math.floor(Math.random() * this.map.size.width),
                    Math.floor(Math.random() * this.map.size.height),
                ),
                this.map,
                this.canvas,
                "blue",
                gift.nickname,
                {
                    photoRoute: gift.profilePictureUrl
                }
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

    async draw() {
        await this.map.drawMap();
        for (const pawn of this.pawns) {
            await pawn.drawPawn();
        }
    }
}