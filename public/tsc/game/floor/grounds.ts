
import { Box } from "../../engine/box.js";
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { ElementBoxes } from "../../engine/elementBoxes.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";
import type { Ground, GroundPositions } from "./ground.js";

export class Grounds extends ElementBoxes {

    override groupElements: Ground[] = [];

    constructor(props: {
        canvas: Canvas,
        map: Map,
    }) {
        super({
            x: props.map.initial.x,
            y: props.map.initial.y,
            canvas: props.canvas,
            boxDefault: new Box({
                size: new Size({
                    width: props.map.boxes.width,
                    height: props.map.boxes.height
                }),
                length: new Plane({
                    horizontal: 1,
                    vertical: 1
                }),
                occupiedBoxes: true
            }),
        });
    }

    refreshElements() {
        this.groupElements.forEach(element => {
            const boxes = this.getBoxesOfCoordinate(element.initial);
            const groundPosition = this.groundPosition(boxes);
            element.setElementIndices(groundPosition);
        });
    }

    setGround(
        boxes: Coordinate,
        newGround: Ground,
    ) {
        this.setElements(boxes, newGround);
    }

    groundPosition(boxes: Coordinate): GroundPositions {
        const leftBoxes = new Coordinate({
            x: boxes.x - 1,
            y: boxes.y
        });
        const rightBoxes = new Coordinate({
            x: boxes.x + 1,
            y: boxes.y
        });
        const upBoxes = new Coordinate({
            x: boxes.x,
            y: boxes.y - 1
        });
        const downBoxes = new Coordinate({
            x: boxes.x,
            y: boxes.y + 1
        });
        const left = this.boxIndex(leftBoxes) !== false;
        const right = this.boxIndex(rightBoxes) !== false;
        const up = this.boxIndex(upBoxes) !== false;
        const down = this.boxIndex(downBoxes) !== false;

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