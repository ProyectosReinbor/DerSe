import { Coordinate } from "../engine/coordinate.js";
import { Plane } from "../engine/plane.js";

type Foam = {
    flatSand: boolean;
};

type Elevation = {
    floor: number;
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

type GetBoxFloor = (indicesBox: Coordinate) => Box;
const GetBoxFloors: GetBoxFloor[] = [
    (indicesBox: Coordinate): Box => {
        const box = BoxFalse();
        box.water = true;
        if (indicesBox.y >= 3 && indicesBox.y <= 19 &&
            indicesBox.x >= 1 && indicesBox.x <= 19)
            box.foam = {
                flatSand: true
            };

        if (
            indicesBox.y === 14 &&
            indicesBox.x >= 11 && indicesBox.x <= 13
        )
            box.stairElevation = {
                shadow: true,
                flatElevation: (indicesBox.x === 11) ? "sand" : false
            };

        return box;
    },
    (indicesBox: Coordinate): Box => {
        const box = BoxFalse();


        if (
            indicesBox.x >= 2 && indicesBox.x <= 17 &&
            indicesBox.y >= 2 && indicesBox.y <= 13
        )
            box.elevation = {
                floor: 1,
                shadow: indicesBox.y >= 3,
                flatGrass: true
            };

        if (
            indicesBox.x >= 2 && indicesBox.x <= 10 &&
            indicesBox.y === 14
        )
            box.elevation = {
                floor: 1,
                shadow: true,
                flatGrass: true
            };

        if (
            indicesBox.x >= 14 && indicesBox.x <= 17 &&
            indicesBox.y === 14
        )
            box.elevation = {
                floor: 1,
                shadow: true,
                flatGrass: true
            };

        if (
            indicesBox.y === 15 &&
            indicesBox.x >= 2 && indicesBox.x <= 10
        ) {
            const flatElevationRandom = Math.round(Math.random());
            box.wallElevation = {
                shadow: true,
                flatElevation: (flatElevationRandom === 0) ? "sand" : false
            };
        }

        if (
            indicesBox.y === 15 &&
            indicesBox.x >= 14 && indicesBox.x <= 17
        ) {
            const flatElevationRandom = Math.round(Math.random());
            box.wallElevation = {
                shadow: true,
                flatElevation: (flatElevationRandom === 0) ? "sand" : false
            };
        }

        if (
            indicesBox.y === 7 &&
            indicesBox.x >= 11 && indicesBox.x <= 13
        ) {
            box.stairElevation = {
                shadow: true,
                flatElevation: (indicesBox.x === 9) ? "grass" : false
            };
        }

        if (indicesBox.y === 3 && indicesBox.x === 14) {
            box.trees = {
                animation: "felled"
            }
        }

        return box;
    },
    (indicesBox: Coordinate): Box => {
        const box = BoxFalse();

        if (
            indicesBox.x >= 6 && indicesBox.x <= 14 &&
            indicesBox.y >= 1 && indicesBox.y <= 6
        ) {
            box.elevation = {
                floor: 2,
                shadow: indicesBox.y >= 3,
                flatGrass: true
            };
        }
        if (
            indicesBox.x >= 6 && indicesBox.x <= 10 &&
            indicesBox.y === 7
        ) {
            box.elevation = {
                floor: 2,
                shadow: true,
                flatGrass: true
            };
        }

        if (
            indicesBox.x >= 14 && indicesBox.x <= 14 &&
            indicesBox.y === 7
        ) {
            box.elevation = {
                floor: 2,
                shadow: true,
                flatGrass: true
            };
        }

        if (
            indicesBox.y === 8 &&
            indicesBox.x >= 6 && indicesBox.x <= 10
        ) {
            const flatElevationRandom = Math.round(Math.random());
            box.wallElevation = {
                shadow: true,
                flatElevation: (flatElevationRandom === 0) ? "grass" : false
            };
        }

        if (indicesBox.y === 8 && indicesBox.x === 14) {
            const flatElevationRandom = Math.round(Math.random());
            box.wallElevation = {
                shadow: true,
                flatElevation: (flatElevationRandom === 0) ? "grass" : false
            };
        }

        return box;
    }
];

export const MapLength = new Plane({ horizontal: 21, vertical: 21 });
export type MapFloorMatrix = Box[][];

export const GetMapMatrix = (): MapFloorMatrix[] => {
    const map: MapFloorMatrix[] = [];
    for (
        let floor = 0;
        floor < GetBoxFloors.length;
        floor++
    ) {
        map[floor] = [];
        const floorMatrix = map[floor];
        if (floorMatrix === undefined)
            continue;

        const indicesBox = new Coordinate({ x: 0, y: 0 });

        for (
            indicesBox.y = 0;
            indicesBox.y < MapLength.vertical;
            indicesBox.y++
        ) {
            floorMatrix[indicesBox.y] = [];
            const row = floorMatrix[indicesBox.y];
            if (row === undefined)
                continue;

            for (
                indicesBox.x = 0;
                indicesBox.x < MapLength.horizontal;
                indicesBox.x++
            ) {
                const getBoxFloor = GetBoxFloors[floor];
                if (getBoxFloor === undefined)
                    continue;

                row[indicesBox.x] = getBoxFloor(indicesBox);
            }
        }
    }
    return map;
}