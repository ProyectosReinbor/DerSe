import { Plane_ENGINE } from "../engine/plane";

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

type Box = {
    water: boolean;
    foam: false | Foam;
    elevation: false | Elevation;
    wallElevation: false | WallElevation;
    stairElevation: false | StairElevation;
    castle: false | Castle;
    trees: false | Trees;
};

type GetBoxFloor = (boxIndices: Plane_ENGINE) => Box;

export type FloorMatrix_MapMatrix = Box[][];

export class MapMatrix_ENGINE {
    static length = new Plane_ENGINE(37, 21);

    static getEmptyBox(): Box {
        return {
            water: false,
            foam: false,
            elevation: false,
            wallElevation: false,
            stairElevation: false,
            castle: false,
            trees: false,
        };
    }

    static getFloor0Box(boxIndices: Plane_ENGINE): Box {
        const box = MapMatrix_ENGINE.getEmptyBox();
        box.water = true;
        if (
            boxIndices.vertical >= 3 && boxIndices.vertical <= 19 &&
            boxIndices.horizontal >= 1 && boxIndices.horizontal <= 35
        )
            box.foam = {
                flatSand: true
            };

        if (
            boxIndices.vertical === 14 &&
            boxIndices.horizontal >= 11 && boxIndices.horizontal <= 13
        )
            box.stairElevation = {
                shadow: true,
                flatElevation: (boxIndices.horizontal === 11) ? "sand" : false
            };

        return box;
    }

    static getFloor1Box(boxIndices: Plane_ENGINE): Box {
        const box = MapMatrix_ENGINE.getEmptyBox();

        if (
            boxIndices.horizontal >= 2 && boxIndices.horizontal <= 34 &&
            boxIndices.vertical >= 2 && boxIndices.vertical <= 13
        )
            box.elevation = {
                floor: 1,
                shadow: boxIndices.vertical >= 3,
                flatGrass: true
            };

        if (
            boxIndices.horizontal >= 2 && boxIndices.horizontal <= 10 &&
            boxIndices.vertical === 14
        )
            box.elevation = {
                floor: 1,
                shadow: true,
                flatGrass: true
            };

        if (
            boxIndices.horizontal >= 14 && boxIndices.horizontal <= 34 &&
            boxIndices.vertical === 14
        )
            box.elevation = {
                floor: 1,
                shadow: true,
                flatGrass: true
            };

        if (
            boxIndices.vertical === 15 &&
            boxIndices.horizontal >= 2 && boxIndices.horizontal <= 10
        ) {
            const flatElevationRandom = Math.round(Math.random());
            box.wallElevation = {
                shadow: true,
                flatElevation: (flatElevationRandom === 0) ? "sand" : false
            };
        }

        if (
            boxIndices.vertical === 15 &&
            boxIndices.horizontal >= 14 && boxIndices.horizontal <= 34
        ) {
            const flatElevationRandom = Math.round(Math.random());
            box.wallElevation = {
                shadow: true,
                flatElevation: (flatElevationRandom === 0) ? "sand" : false
            };
        }

        if (
            boxIndices.vertical === 7 &&
            boxIndices.horizontal >= 11 && boxIndices.horizontal <= 13
        ) {
            box.stairElevation = {
                shadow: true,
                flatElevation: (boxIndices.horizontal === 9) ? "grass" : false
            };
        }

        if (boxIndices.vertical === 3 && boxIndices.horizontal === 14) {
            box.trees = {
                animation: "felled"
            }
        }

        return box;
    }

    static getFloor2Box(boxIndices: Plane_ENGINE): Box {
        const box = MapMatrix_ENGINE.getEmptyBox();

        if (
            boxIndices.horizontal >= 6 && boxIndices.horizontal <= 30 &&
            boxIndices.vertical >= 1 && boxIndices.vertical <= 6
        ) {
            box.elevation = {
                floor: 2,
                shadow: boxIndices.vertical >= 3,
                flatGrass: true
            };
        }
        if (
            boxIndices.horizontal >= 6 && boxIndices.horizontal <= 10 &&
            boxIndices.vertical === 7
        ) {
            box.elevation = {
                floor: 2,
                shadow: true,
                flatGrass: true
            };
        }

        if (
            boxIndices.horizontal >= 14 && boxIndices.horizontal <= 30 &&
            boxIndices.vertical === 7
        ) {
            box.elevation = {
                floor: 2,
                shadow: true,
                flatGrass: true
            };
        }

        if (
            boxIndices.vertical === 8 &&
            boxIndices.horizontal >= 6 && boxIndices.horizontal <= 10
        ) {
            const flatElevationRandom = Math.round(Math.random());
            box.wallElevation = {
                shadow: true,
                flatElevation: (flatElevationRandom === 0) ? "grass" : false
            };
        }

        if (
            boxIndices.vertical === 8 &&
            boxIndices.horizontal >= 14 && boxIndices.horizontal <= 30
        ) {
            const flatElevationRandom = Math.round(Math.random());
            box.wallElevation = {
                shadow: true,
                flatElevation: (flatElevationRandom === 0) ? "grass" : false
            };
        }

        return box;
    }

    static getBoxFloors: GetBoxFloor[] = [
        MapMatrix_ENGINE.getFloor0Box,
        MapMatrix_ENGINE.getFloor1Box,
        MapMatrix_ENGINE.getFloor2Box,
    ];

    static get(): FloorMatrix_MapMatrix[] {
        const map: FloorMatrix_MapMatrix[] = [];
        for (
            let floor = 0;
            floor < MapMatrix_ENGINE.getBoxFloors.length;
            floor++
        ) {
            map[floor] = [];
            const floorMatrix = map[floor];
            if (floorMatrix === undefined)
                continue;

            const boxIndices = new Plane_ENGINE(0, 0);

            for (
                boxIndices.vertical = 0;
                boxIndices.vertical < MapMatrix_ENGINE.length.vertical;
                boxIndices.vertical++
            ) {
                floorMatrix[boxIndices.vertical] = [];
                const row = floorMatrix[boxIndices.vertical];
                if (row === undefined)
                    continue;

                for (
                    boxIndices.horizontal = 0;
                    boxIndices.horizontal < MapMatrix_ENGINE.length.horizontal;
                    boxIndices.horizontal++
                ) {
                    const getBoxFloor = MapMatrix_ENGINE.getBoxFloors[floor];
                    if (getBoxFloor === undefined)
                        continue;

                    row[boxIndices.horizontal] = getBoxFloor(boxIndices);
                }
            }
        }
        return map;
    }
}