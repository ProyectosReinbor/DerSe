import { io } from "./socketIO.js";

export class Tiktok {
    constructor(username) {
        this.username = username;
        this.socket = io();
        this.connected = false;

        this.socket.on("connect", () => {
            console.log("connected");
            this.connected = false;
            this.socket.emit("live", this.username);
        });

        this.socket.on("live", connected => {
            this.connected = connected;
            console.log("tiktok live", connected);
        });

        this.socket.on("chat", data => {
            console.log(JSON.parse(data));
        });

        this.socket.on("disconnect", () => {
            this.connected = false;
            console.log("disconnected");
        });
    }
}