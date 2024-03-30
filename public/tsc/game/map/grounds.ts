import type { Canvas_ENGINE } from "../../engine/canvas";
import { Element_ENGINE } from "../../engine/element";
import { ElementBoxes_ENGINE } from "../../engine/elementBoxes";
import type { Elements_ENGINE } from "../../engine/elements";
import type { ImagePath } from "../../engine/image";
import { Plane_ENGINE } from "../../engine/plane";
import { Size_ENGINE } from "../../engine/size";
import type { Map_GAME } from "../map";

export type GroundState = "leftUp" | "up" | "rightUp" |
    "left" | "center" | "right" |
    "leftDown" | "down" | "rightDown" |
    "horizontalLeft" | "horizontalCenter" | "horizontalRight" |
    "verticalUp" | "verticalCenter" | "verticalDown" |
    "only";

export type GroundElementIndices = {
    [key in GroundState]: Plane_ENGINE;
};

export class Grounds_FLOOR extends ElementBoxes_ENGINE {

    override references: Elements_ENGINE[] = [];
    elementIndices: GroundElementIndices;

    constructor(props: {
        canvas: Canvas_ENGINE;
        map: Map_GAME;
        route: ImagePath;
        elementIndices: GroundElementIndices;
    }) {
        super({
            x: props.map.leftUp.x,
            y: props.map.leftUp.y,
            canvas: props.canvas,
            size: new Size_ENGINE({
                width: props.map.boxes.width,
                height: props.map.boxes.height
            }),
            length: new Plane_ENGINE({
                horizontal: 1,
                vertical: 1
            }),
            occupied: true,
            route: props.route,
            element: new Element_ENGINE({
                size: new Size_ENGINE({
                    width: 64,
                    height: 64
                }),
                indices: props.elementIndices.only
            })
        });
        this.elementIndices = props.elementIndices;
    }

    refreshElements() {
        this.references.forEach(elements => {
            const boxIndices = this.getBoxIndices({
                coordinate: elements.leftUp
            });
            const groundPosition = this.groundPosition({
                boxIndices
            });
            const indices = this.elementIndices[groundPosition];
            elements.element.setIndices(
                new Plane_ENGINE({
                    horizontal: indices.horizontal,
                    vertical: indices.vertical
                })
            );
        });
    }

    pushGround(props: {
        boxIndices: Plane_ENGINE;
    }): Elements_ENGINE | undefined {
        const ground = this.referencePush({
            boxIndices: props.boxIndices
        });
        this.refreshElements();
        return ground;
    }

    groundPosition(props: {
        boxIndices: Plane_ENGINE;
    }): GroundState {
        const leftBoxes = new Plane_ENGINE({
            horizontal: props.boxIndices.horizontal - 1,
            vertical: props.boxIndices.vertical
        });
        const rightBoxes = new Plane_ENGINE({
            horizontal: props.boxIndices.horizontal + 1,
            vertical: props.boxIndices.vertical
        });
        const upBoxes = new Plane_ENGINE({
            horizontal: props.boxIndices.horizontal,
            vertical: props.boxIndices.vertical - 1
        });
        const downBoxes = new Plane_ENGINE({
            horizontal: props.boxIndices.horizontal,
            vertical: props.boxIndices.vertical + 1
        });
        const left = this.getBox({
            boxIndices: leftBoxes
        }) !== undefined;
        const right = this.getBox({
            boxIndices: rightBoxes
        }) !== undefined;
        const up = this.getBox({
            boxIndices: upBoxes
        }) !== undefined;
        const down = this.getBox({
            boxIndices: downBoxes
        }) !== undefined;

        const isLeftUp = !up && down && !left && right;
        if (isLeftUp) return "leftUp";

        const isUp = !up && down && left && right;
        if (isUp) return "up";

        const isRightUp = !up && down && left && !right;
        if (isRightUp) return "rightUp";

        const isLeft = up && down && !left && right;
        if (isLeft) return "left";

        const isCenter = up && down && left && right;
        if (isCenter) return "center";

        const isRight = up && down && left && !right;
        if (isRight) return "right";

        const isLeftDown = up && !down && !left && right;
        if (isLeftDown) return "leftDown";

        const isDown = up && !down && left && right;
        if (isDown) return "down";

        const isRightDown = up && !down && left && !right;
        if (isRightDown) return "rightDown";

        const isHorizontalLeft = !up && !down && !left && right;
        if (isHorizontalLeft) return "horizontalLeft";

        const isHorizontalCenter = !up && !down && left && right;
        if (isHorizontalCenter) return "horizontalCenter";

        const isHorizontalRight = !up && !down && left && !right;
        if (isHorizontalRight) return "horizontalRight";

        const isVerticalUp = !up && down && !left && !right;
        if (isVerticalUp) return "verticalUp";

        const isVerticalCenter = up && down && !left && !right;
        if (isVerticalCenter) return "verticalCenter";

        const isVerticalDown = up && !down && !left && !right;
        if (isVerticalDown) return "verticalDown";

        return "only";
    }

    drawGrounds() {
        this.drawElements();
    }
}  