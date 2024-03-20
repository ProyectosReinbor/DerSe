import { Plane } from "../engine/plane.js";

type Foam = {
    flatSand: boolean;
};

type Elevation = {
    shadow: boolean;
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

type Trees = {
    animation: "motion" | "attacked" | "felled";
};

export type Box = {
    water: boolean;
    foam: false | Foam;
    elevation: false | Elevation;
    wallElevation: false | WallElevation;
    stairElevation: false | StairElevation;
    castle: false | Castle;
    trees: false | Trees;
}

const BoxFalse = (): Box => ({
    water: false,
    foam: false,
    elevation: false,
    wallElevation: false,
    stairElevation: false,
    castle: false,
    trees: false,
});

export const BoxFloor1 = (
    x: number,
    y: number
): Box => {
    const box = BoxFalse();
    if (x >= 6 && x <= 14 && y >= 1 && y <= 6) {
        box.elevation = {
            shadow: y >= 3,
            flatGrass: true
        };
    }
    if (x >= 6 && x <= 10 && y === 7) {
        box.elevation = {
            shadow: true,
            flatGrass: true
        };
    }

    if (x >= 14 && x <= 14 && y === 7) {
        box.elevation = {
            shadow: true,
            flatGrass: true
        };
    }

    if (y === 7 && x >= 11 && x <= 13)
        box.stairElevation = {
            shadow: true,
            flatElevation: (x === 9) ? "grass" : false
        };

    if (y === 8 && x >= 6 && x <= 10) {
        const flatElevationRandom = Math.round(Math.random());
        box.wallElevation = {
            shadow: true,
            flatElevation: (flatElevationRandom === 0) ? "grass" : false
        };
    }

    if (y === 8 && x === 14) {
        const flatElevationRandom = Math.round(Math.random());
        box.wallElevation = {
            shadow: true,
            flatElevation: (flatElevationRandom === 0) ? "grass" : false
        };
    }

    if (y === 3 && x === 14) {
        box.trees = {
            animation: "felled"
        }
    }

    return box;
}

export const BoxFloor0 = (
    x: number,
    y: number
): Box => {
    const box = BoxFalse();

    box.water = true;
    if (y >= 3 && y <= 19 && x >= 1 && x <= 19)
        box.foam = {
            flatSand: true
        };

    if (x >= 2 && x <= 17 && y >= 2 && y <= 13)
        box.elevation = {
            shadow: y >= 3,
            flatGrass: true
        };

    if (x >= 2 && x <= 10 && y === 14)
        box.elevation = {
            shadow: true,
            flatGrass: true
        };

    if (x >= 14 && x <= 17 && y === 14)
        box.elevation = {
            shadow: true,
            flatGrass: true
        };

    if (y === 14 && x >= 11 && x <= 13)
        box.stairElevation = {
            shadow: true,
            flatElevation: (x === 11) ? "sand" : false
        };

    else if (y === 15 && x >= 9 && x <= 11)
        box.foam = {
            flatSand: true
        };

    if (y === 15 && x >= 2 && x <= 10) {
        const flatElevationRandom = Math.round(Math.random());
        box.wallElevation = {
            shadow: true,
            flatElevation: (flatElevationRandom === 0) ? "sand" : false
        };
    }
    if (y === 15 && x >= 14 && x <= 17) {
        const flatElevationRandom = Math.round(Math.random());
        box.wallElevation = {
            shadow: true,
            flatElevation: (flatElevationRandom === 0) ? "sand" : false
        };
    }

    return box;
}

export type MapFloor = Box[][];
export const FloorLength = new Plane({ horizontal: 21, vertical: 21 });

export const MapMatrix = (): MapFloor[] => {
    const floor0: MapFloor = [];
    const floor1: MapFloor = [];

    for (let y = 0; y < FloorLength.vertical; y++) {
        const floor0Y: Box[] = [];
        const floor1Y: Box[] = [];
        for (let x = 0; x < FloorLength.horizontal; x++) {
            floor0Y[x] = BoxFloor0(x, y);
            floor1Y[x] = BoxFloor1(x, y);
        }
        floor0[y] = floor0Y;
        floor1[y] = floor1Y;
    }

    return [
        floor0,
        floor1
    ];
}