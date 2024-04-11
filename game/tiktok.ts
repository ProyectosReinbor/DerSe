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