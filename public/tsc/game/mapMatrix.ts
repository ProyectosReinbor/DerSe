import { Plane } from "../engine/plane";

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
    secondElevation: false | Elevation;
    secondWallElevation: false | WallElevation;
    secondStairElevation: false | StairElevation;
    castle: false | Castle;
}

export const MapMatrixLength = new Plane(21, 21);

export const MapMatrix = () => {
    const matrix: Box[][] = [];

    for (let y = 0; y < MapMatrixLength.vertical; y++) {
        matrix.push([]);
        for (let x = 0; x < MapMatrixLength.horizontal; x++) {
            const box: Box = {
                water: false,
                foam: false,
                elevation: false,
                wallElevation: false,
                stairElevation: false,
                secondElevation: false,
                secondWallElevation: false,
                secondStairElevation: false,
                castle: false,
            };
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

            if (x >= 4 && x <= 16 && y > 0 && y < 8)
                box.secondElevation = {
                    shadow: true,
                    flatGrass: true
                };

            if (y === 7 && x >= 9 && x <= 11)
                box.secondStairElevation = {
                    shadow: true,
                    flatElevation: (x === 9) ? "grass" : false
                };

            if (y === 8)
                if ((x >= 4 && x <= 8) || (x >= 12 && x <= 16))
                    box.secondWallElevation = {
                        shadow: true,
                        flatElevation: "sand"
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

            if (y === 15) {
                if ((x >= 4 && x <= 8) || (x >= 12 && x <= 16)) {
                    const flatElevationRandom = Math.round(Math.random());
                    box.wallElevation = {
                        shadow: true,
                        flatElevation: (flatElevationRandom === 0) ? "sand" : false
                    };
                }
            }

            if (y === 4 && x === 8)
                box.castle = {
                    color: "blue",
                    state: "ready"
                };

            matrix[y].push(box);
        }
    }

    return matrix;
}