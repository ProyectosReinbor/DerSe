import type { Canvas } from "../engine/canvas.js";
import { Coordinate } from "../engine/coordinate.js";
import { Scene } from "../engine/scene.js";
import { Size } from "../engine/size.js";
import { Map } from "./map.js";
import { Pawn } from "./pawn.js";
import { Sheep } from "./sheep.js";
import { UserBar } from "./userBar.js";

export class Game extends Scene {
    map: Map;
    pawns: Pawn[] = [];
    sheepGroup: Sheep[] = [];
    constructor(props: {
        canvas: Canvas
    }) {
        super({ canvas: props.canvas });
        this.map = new Map({ canvas: props.canvas });
        this.sheepGroup = [
            new Sheep({
                initial: new Coordinate({ x: 10, y: 10 }),
                // Math.floor(Math.random() * this.map.size.width),
                // Math.floor(Math.random() * this.map.size.height)
                // }),
                map: this.map,
                canvas: props.canvas
            })
        ];
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
            new Pawn({
                initial: new Coordinate({
                    x: Math.floor(Math.random() * this.map.size.width),
                    y: Math.floor(Math.random() * this.map.size.height),
                }),
                map: this.map,
                canvas: this.canvas,
                color: "blue",
                nickname: gift.nickname,
                userBar: new UserBar({
                    size: new Size({ width: 0, height: 0 }),
                    canvas: this.canvas,
                    photoRoute: gift.profilePictureUrl,
                    nickname: gift.nickname
                })
            })
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