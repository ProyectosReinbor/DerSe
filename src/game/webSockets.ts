import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../server/server";

const account = "dilanfinoochoa";
const socket: Socket<
    ServerToClientEvents,
    ClientToServerEvents
> = io();

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