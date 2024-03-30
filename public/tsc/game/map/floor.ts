import type { MapFloorMatrix } from "../mapMatrix";
import type { Map_ENGINE } from "../map";
import type { Canvas_ENGINE } from "../../engine/canvas";
import { Plane_ENGINE } from "../../engine/plane";
import type { Character_ENGINE } from "../../engine/character";
import { FlatsSand_FLOOR } from "./flatsSand";
import { Elevations_FLOOR } from "./elevations";
import { WallElevations_FLOOR } from "./wallElevations";
import { Castles_FLOOR } from "./castles";
import { Water_FLOOR } from "./water";
import { Foams_FLOOR } from "./foams";
import { FlatsGrass_FLOOR } from "./flatsGrass";
import { Shadows_FLOOR } from "./shadows";
import { StairsElevations_FLOOR } from "./stairsElevations";
import { FlatElevations_FLOOR } from "./flatElevations";
import { Trees_FLOOR } from "./trees";

export class Floor_ENGINE {

    map: Map_ENGINE;
    canvas: Canvas_ENGINE;
    water: Water_FLOOR;
    foams: Foams_FLOOR;
    flatsSand: FlatsSand_FLOOR;
    elevations: Elevations_FLOOR;
    flatsGrass: FlatsGrass_FLOOR;
    shadows: Shadows_FLOOR;
    wallElevations: WallElevations_FLOOR;
    stairsElevation: StairsElevations_FLOOR;
    flatElevations: FlatElevations_FLOOR;
    castles: Castles_FLOOR;
    trees: Trees_FLOOR;

    constructor(props: {
        map: Map_ENGINE,
        canvas: Canvas_ENGINE,
    }) {
        this.map = props.map;
        this.canvas = props.canvas;

        this.water = new Water_FLOOR({
            map: this.map,
            canvas: this.canvas
        });

        this.foams = new Foams_FLOOR({
            map: this.map,
            canvas: this.canvas
        });

        this.flatsSand = new FlatsSand_FLOOR({
            map: this.map,
            canvas: this.canvas
        })

        this.elevations = new Elevations_FLOOR({
            map: this.map,
            canvas: this.canvas,
        });

        this.flatsGrass = new FlatsGrass_FLOOR({
            map: this.map,
            canvas: this.canvas,
        });

        this.shadows = new Shadows_FLOOR({
            map: this.map,
            canvas: this.canvas,
        });

        this.wallElevations = new WallElevations_FLOOR({
            map: this.map,
            canvas: this.canvas,
        });

        this.stairsElevation = new StairsElevations_FLOOR({
            map: this.map,
            canvas: this.canvas,
        });

        this.flatElevations = new FlatElevations_FLOOR({
            map: this.map,
            canvas: this.canvas,
        });

        this.castles = new Castles_FLOOR({
            map: this.map,
            canvas: this.canvas,
        });

        this.trees = new Trees_FLOOR({
            map: this.map,
            canvas: this.canvas,
        });
    }

    pushFloor(matrix: MapFloorMatrix) {
        matrix.forEach((row, vertical) => {
            row.forEach((box, horizontal) => {
                const boxIndices = new Plane_ENGINE({
                    horizontal,
                    vertical
                });

                if (box.water === true)
                    this.water.pushWater({
                        boxIndices
                    });

                if (box.foam !== false) {
                    this.foams.pushFoam({
                        boxIndices
                    });
                    if (box.foam.flatSand === true)
                        this.flatsSand.pushFlatSand({
                            boxIndices: boxIndices
                        });
                }

                if (box.elevation !== false) {
                    if (box.elevation.shadow === true)
                        this.shadows.pushShadow({
                            boxIndices
                        });

                    if (box.elevation.flatGrass === true)
                        this.flatsGrass.pushFlatGrass({
                            boxIndices
                        });

                    this.elevations.pushElevation({
                        boxIndices
                    });
                }

                if (box.wallElevation !== false) {
                    if (box.wallElevation.shadow === true)
                        this.shadows.pushShadow({
                            boxIndices
                        });

                    this.wallElevations.pushWallElevation({
                        boxIndices
                    });
                    if (box.wallElevation.flatElevation !== false)
                        this.flatElevations.pushFlatElevation({
                            boxIndices,
                            state: box.wallElevation.flatElevation
                        });
                }

                if (box.stairElevation !== false) {
                    if (box.stairElevation.shadow === true)
                        this.shadows.pushShadow({
                            boxIndices
                        });

                    this.stairsElevation.setStairsElevations({
                        boxIndices
                    });

                    if (box.stairElevation.flatElevation !== false)
                        this.flatElevations.pushFlatElevation({
                            boxIndices,
                            state: box.stairElevation.flatElevation
                        });
                }

                if (box.castle !== false) {
                    this.castles.castlePush({
                        boxIndices,
                        state: box.castle.state,
                        color: box.castle.color,
                    });
                }

                if (box.trees !== false) {
                    this.trees.pushTree({
                        boxIndices,
                        state: box.trees.animation
                    });
                }
            });
        });
    }

    aboveFloor(props: {
        character: Character_ENGINE;
    }): boolean {
        const flatSand = this.flatsSand.collision({
            character: props.character
        }) !== false;
        const elevations = this.elevations.collision({
            character: props.character
        }) !== false;
        const stairsElevations = this.stairsElevation.collision({
            character: props.character
        }) !== false;

        if (flatSand === true)
            return true;

        if (elevations === true)
            return true;

        if (stairsElevations === true)
            return true;

        return false;
    }

    collisionFloor(props: {
        character: Character_ENGINE;
        moved: Character_ENGINE;
    }): boolean {
        const flatSand = this.flatsSand.collision({
            character: props.character
        }) !== false;
        const elevations = this.elevations.collision({
            character: props.character
        }) !== false;
        const wallElevations = this.wallElevations.collision({
            character: props.character
        }) !== false;
        const stairsElevations = this.stairsElevation.collision({
            character: props.character
        }) !== false;

        const nextFlatSand = this.flatsSand.collision({
            character: props.moved
        }) !== false;
        const nextElevations = this.elevations.collision({
            character: props.moved
        }) !== false;
        const nextWallElevations = this.wallElevations.collision({
            character: props.moved
        }) !== false;
        const nextStairsElevations = this.stairsElevation.collision({
            character: props.moved
        }) !== false;

        if (flatSand === true) {
            if (nextFlatSand === true)
                return false;

            if (nextElevations === true)
                return true;

            if (nextWallElevations === true)
                return true;

            if (nextStairsElevations === true)
                return false;
            return true;
        }

        if (elevations === true) {
            if (nextElevations === true) {
                return false;
            }

            if (nextWallElevations === true)
                return true;

            if (nextStairsElevations === true)
                return false;

            return true;
        }
        if (wallElevations === true) {
            return true;
        }
        else if (stairsElevations === true) {

            if (nextElevations === true)
                return false;

            if (nextWallElevations === true)
                return true;

            if (nextStairsElevations === true)
                return false;

            return true;
        }

        return true;
    }

    drawMap() {
        this.water.drawWater();
        this.foams.drawFoams();
        this.flatsSand.drawFlatsSand();
        this.shadows.drawShadows();
        this.elevations.drawElevations();
        this.wallElevations.drawWallElevations();
        this.flatsGrass.drawFlatsGrass();
        this.stairsElevation.drawStairsElevations();
        this.flatElevations.drawFlatElevations();
        this.castles.drawCastles();
        this.trees.drawTrees();
    }
}