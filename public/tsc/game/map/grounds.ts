
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { Element } from "../../engine/element.js";
import { ElementBoxes } from "../../engine/elementBoxes.js";
import type { Elements } from "../../engine/elements.js";
import type { ImageRoute } from "../../engine/image.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

export type GroundState = "leftUp" | "up" | "rightUp" |
    "left" | "center" | "right" |
    "leftDown" | "down" | "rightDown" |
    "horizontalLeft" | "horizontalCenter" | "horizontalRight" |
    "verticalUp" | "verticalCenter" | "verticalDown" |
    "only";

export type GroundElementIndices = {
    [key in GroundState]: Plane;
};

export class Grounds extends ElementBoxes {

    override references: Elements[] = [];
    elementIndices: GroundElementIndices;

    constructor(props: {
        canvas: Canvas;
        map: Map;
        route: ImageRoute;
        elementIndices: GroundElementIndices;
    }) {
        super({
            x: props.map.initial.x,
            y: props.map.initial.y,
            canvas: props.canvas,
            size: new Size({
                width: props.map.boxes.width,
                height: props.map.boxes.height
            }),
            length: new Plane({
                horizontal: 1,
                vertical: 1
            }),
            occupied: true,
            route: props.route,
            element: new Element({
                size: new Size({ width: 64, height: 64 }),
                indices: props.elementIndices.only
            })
        });
        this.elementIndices = props.elementIndices;
    }

    refreshElements() {
        this.references.forEach(elements => {
            const indicesBox = this.indicesBox(elements.initial);
            const groundPosition = this.groundPosition(indicesBox);
            const indices = this.elementIndices[groundPosition];
            elements.element.setIndices(
                new Plane({
                    horizontal: indices.horizontal,
                    vertical: indices.vertical
                })
            );
        });
    }

    pushGround(indicesBox: Coordinate): Elements | undefined {
        const ground = this.referencePush(indicesBox);
        this.refreshElements();
        return ground;
    }

    groundPosition(indicesBox: Coordinate): GroundState {
        const leftBoxes = new Coordinate({
            x: indicesBox.x - 1,
            y: indicesBox.y
        });
        const rightBoxes = new Coordinate({
            x: indicesBox.x + 1,
            y: indicesBox.y
        });
        const upBoxes = new Coordinate({
            x: indicesBox.x,
            y: indicesBox.y - 1
        });
        const downBoxes = new Coordinate({
            x: indicesBox.x,
            y: indicesBox.y + 1
        });
        const left = this.getBox(leftBoxes) !== undefined;
        const right = this.getBox(rightBoxes) !== undefined;
        const up = this.getBox(upBoxes) !== undefined;
        const down = this.getBox(downBoxes) !== undefined;

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