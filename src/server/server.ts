export interface ServerToClientEvents {
    live: (connect: boolean) => void;
    chat: (message: string) => void;
}

export interface ClientToServerEvents {
    live: (username: string) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    players: number;
}