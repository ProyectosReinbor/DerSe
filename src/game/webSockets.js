import { io } from "socket.io-client";

const account = "dilanfinoochoa";
const socket = io();

socket.on("connect", () => {
    console.log("connected");
    socket.emit("live", account);
});

socket.on("live", (connected) => {
    console.log("tiktok live", connected);
});

socket.on("chat", (data) => {
    console.log("tiktok chat", data);
});

socket.on("disconnect", () => {
    console.log("disconnected");
});