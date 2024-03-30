import { Coordinate_ENGINE } from "../engine/coordinate";
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

export type Box = {
    water: boolean;
    foam: false | Foam;
    elevation: false | Elevation;
    wallElevation: false | WallElevation;
    stairElevation: false | StairElevation;
    castle: false | Castle;
    trees: false | Trees;
};

type GetBoxFloor = (props: {
    boxIndices: Plane_ENGINE;
}) => Box;

export type FloorMatrix_MapMatrix = Box[][];

export class MapMatrix_ENGINE {
    static length = new Plane_ENGINE({
        horizontal: 21,
        vertical: 21
    });

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

    static getFloor0Box(props: {
        boxIndices: Plane_ENGINE;
    }): Box {
        const box = this.getEmptyBox();
        box.water = true;
        if (props.boxIndices.vertical >= 3 && props.boxIndices.vertical <= 19 &&
            props.boxIndices.horizontal >= 1 && props.boxIndices.horizontal <= 19)
            box.foam = {
                flatSand: true
            };

        if (
            props.boxIndices.vertical === 14 &&
            props.boxIndices.horizontal >= 11 && props.boxIndices.horizontal <= 13
        )
            box.stairElevation = {
                shadow: true,
                flatElevation: (props.boxIndices.horizontal === 11) ? "sand" : false
            };

        return box;
    }

    static getFloor1Box(props: {
        boxIndices: Plane_ENGINE;
    }): Box {
        const box = this.getEmptyBox();

        if (
            props.boxIndices.horizontal >= 2 && props.boxIndices.horizontal <= 17 &&
            props.boxIndices.vertical >= 2 && props.boxIndices.vertical <= 13
        )
            box.elevation = {
                floor: 1,
                shadow: props.boxIndices.vertical >= 3,
                flatGrass: true
            };

        if (
            props.boxIndices.horizontal >= 2 && props.boxIndices.horizontal <= 10 &&
            props.boxIndices.vertical === 14
        )
            box.elevation = {
                floor: 1,
                shadow: true,
                flatGrass: true
            };

        if (
            props.boxIndices.horizontal >= 14 && props.boxIndices.horizontal <= 17 &&
            props.boxIndices.vertical === 14
        )
            box.elevation = {
                floor: 1,
                shadow: true,
                flatGrass: true
            };

        if (
            props.boxIndices.vertical === 15 &&
            props.boxIndices.horizontal >= 2 && props.boxIndices.horizontal <= 10
        ) {
            const flatElevationRandom = Math.round(Math.random());
            box.wallElevation = {
                shadow: true,
                flatElevation: (flatElevationRandom === 0) ? "sand" : false
            };
        }

        if (
            props.boxIndices.vertical === 15 &&
            props.boxIndices.horizontal >= 14 && props.boxIndices.horizontal <= 17
        ) {
            const flatElevationRandom = Math.round(Math.random());
            box.wallElevation = {
                shadow: true,
                flatElevation: (flatElevationRandom === 0) ? "sand" : false
            };
        }

        if (
            props.boxIndices.vertical === 7 &&
            props.boxIndices.horizontal >= 11 && props.boxIndices.horizontal <= 13
        ) {
            box.stairElevation = {
                shadow: true,
                flatElevation: (props.boxIndices.horizontal === 9) ? "grass" : false
            };
        }

        if (props.boxIndices.vertical === 3 && props.boxIndices.horizontal === 14) {
            box.trees = {
                animation: "felled"
            }
        }

        return box;
    }

    static getFloor2Box(props: {
        boxIndices: Plane_ENGINE;
    }): Box {
        const box = this.getEmptyBox();

        if (
            props.boxIndices.horizontal >= 6 && indicesBox.x <= 14 &&
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

    static getBoxFloors: GetBoxFloor[] = [
        this.getFloor0Box,
        this.getFloor1Box,

    ];

    static get(): FloorMatrix_MapMatrix[] {
        const map: FloorMatrix_MapMatrix[] = [];
        for (
            let floor = 0;
            floor < GetBoxFloors.length;
            floor++
        ) {
            map[floor] = [];
            const floorMatrix = map[floor];
            if (floorMatrix === undefined)
                continue;

            const indicesBox = new Coordinate_ENGINE({
                x: 0,
                y: 0
            });

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
}