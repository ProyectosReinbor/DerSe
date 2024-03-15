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

export const MapMatrixLength = new Plane(20, 20);

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
                castle: false,
            };
            box.water = true;
            if (y > 0 && y < 19 && x > 0 && x < 19)
                box.foam = {
                    flatSand: true
                };

            if (x > 3 && x < 16) {
                if (y > 0 && y < 18)
                    box.elevation = {
                        shadow: true,
                        flatGrass: true
                    };

                if (y === 18)
                    box.wallElevation = {
                        shadow: true,
                        flatElevation: "sand"
                    };
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