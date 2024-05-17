import type { RutaImagen } from "../motor/imagen";

export type RegaloTiktok = {
    giftName: string;
    giftPictureUrl: string;
    repeatCount: number;
    nickname: string;
    profilePictureUrl: RutaImagen;
};

// export const Tiktok = (
//     giftCallback,
//     chatCallback
// ) => {
//     const socket = io();

//     socket.on("disconnect", () => {
//         console.log("disconnected");
//     });

//     socket.on("gift", data => giftCallback(
//         JSON.parse(data)
//     ));

//     socket.on("chat", data => chatCallback(
//         JSON.parse(data)
//     ));
// }