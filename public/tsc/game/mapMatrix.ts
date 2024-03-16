import { Plane } from "../engine/exports.js";

type Foam = {
    flatSand: boolean;
};

type Elevation = {
    shadow: true;
    flatGrass: boolean;
};

type WallElevation = {
    shadow: true,
    flatElevation: "sand" | "grass" | false
};

type StairElevation = {
    shadow: true,
    flatElevation: "sand" | "grass" | false
};

type Castle = {
    color: "blue" | "purple" | "red" | "yellow";
    state: "construction" | "ready" | "destroyed";
};

export type Box = {
    water: boolean;
    foam: false | Foam;
    elevation: false | Elevation;
    wallElevation: false | WallElevation;
    stairElevation: false | StairElevation;
    castle: false | Castle;
}

const BoxFalse = (): Box => ({
    water: false,
    foam: false,
    elevation: false,
    wallElevation: false,
    stairElevation: false,
    castle: false,
});

export const BoxFloor1 = (
    x: number,
    y: number
): Box => {
    const box = BoxFalse();
    if (x >= 4 && x <= 16 && y > 0 && y < 8)
        box.elevation = {
            shadow: true,
            flatGrass: true
        };

    if (y === 7 && x >= 9 && x <= 11)
        box.stairElevation = {
            shadow: true,
            flatElevation: (x === 9) ? "grass" : false
        };

    if (y === 8 && x >= 4 && x <= 8)
        box.wallElevation = {
            shadow: true,
            flatElevation: "sand"
        };

    if (y === 8 && x >= 12 && x <= 16)
        box.wallElevation = {
            shadow: true,
            flatElevation: "sand"
        };

    return box;
}

export const BoxFloor0 = (
    x: number,
    y: number
): Box => {
    const box = BoxFalse();

    box.water = true;
    if (y > 0 && y < 19 && x >= 1 && x <= 19)
        box.foam = {
            flatSand: true
        };

    if (x >= 4 && x <= 16 && y > 0 && y < 15)
        box.elevation = {
            shadow: true,
            flatGrass: true
        };



    if (y === 14 && x >= 9 && x <= 11)
        box.stairElevation = {
            shadow: true,
            flatElevation: (x === 11) ? "sand" : false
        };

    else if (y === 15 && x >= 9 && x <= 11)
        box.foam = {
            flatSand: true
        };

    if (y === 15 && x >= 4 && x <= 8) {
        const flatElevationRandom = Math.round(Math.random());
        box.wallElevation = {
            shadow: true,
            flatElevation: (flatElevationRandom === 0) ? "sand" : false
        };
    }
    if (y === 15 && x >= 12 && x <= 16) {
        const flatElevationRandom = Math.round(Math.random());
        box.wallElevation = {
            shadow: true,
            flatElevation: (flatElevationRandom === 0) ? "sand" : false
        };
    }

    if (y === 4 && x === 8)
        box.castle = {
            color: "blue",
            state: "ready"
        };

    return box;
}

export type MapFloor = Box[][];
export const FloorLength = new Plane(21, 21);

export const MapMatrix = (): MapFloor[] => {
    const floor0: MapFloor = [];
    const floor1: MapFloor = [];

    for (let y = 0; y < FloorLength.vertical; y++) {
        floor0[y] = [];
        floor1[y] = [];

        for (let x = 0; x < FloorLength.horizontal; x++) {
            floor0[y][x] = BoxFloor0(x, y);
            floor1[y][x] = BoxFloor1(x, y);
        }
    }

    return [
        floor0,
        floor1
    ];
}