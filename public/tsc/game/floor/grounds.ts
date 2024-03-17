
import { Box } from "../../engine/box.js";
import type { Canvas } from "../../engine/canvas.js";
import { Coordinate } from "../../engine/coordinate.js";
import { ElementBoxes } from "../../engine/elementBoxes.js";
import { Elements } from "../../engine/elements.js";
import { Plane } from "../../engine/plane.js";
import { Size } from "../../engine/size.js";
import type { Map } from "../map.js";

type GroundsDefault = {
    leftUp: Elements;
    up: Elements;
    rightUp: Elements;
    left: Elements;
    center: Elements;
    right: Elements;
    leftDown: Elements;
    down: Elements;
    rightDown: Elements;
    horizontalLeft: Elements;
    horizontalCenter: Elements;
    horizontalRight: Elements;
    verticalUp: Elements;
    verticalCenter: Elements;
    verticalDown: Elements;
    only: Elements;
}

export class Grounds extends ElementBoxes {
    groundsDefault: GroundsDefault;
    constructor(
        x: number,
        y: number,
        canvas: Canvas,
        map: Map,
        groundsDefault: GroundsDefault
    ) {
        super(
            x, y,
            canvas,
            new Box(
                new Size(map.boxes.width, map.boxes.height),
                new Plane(1, 1),
                true
            ),
        );
        this.groundsDefault = groundsDefault;
    }

    setGround(boxes: Coordinate) {
        this.setElements(
            boxes,
            this.groundsDefault.only
        );
        this.refreshElements();
    }

    refreshElements() {
        this.groupElements.forEach(elements => {
            const boxes = this.getBoxesOfCoordinate(elements.initial);
            const elementsDefault = this.getElementsFactoryOfBoxes(boxes);
            elements.element.horizontal = elementsDefault.element.horizontal;
            elements.element.vertical = elementsDefault.element.vertical;
        });
    }

    getElementsFactoryOfBoxes(boxes: Coordinate) {
        const leftBoxes = new Coordinate(
            boxes.x - 1,
            boxes.y
        );
        const rightBoxes = new Coordinate(
            boxes.x + 1,
            boxes.y
        );
        const upBoxes = new Coordinate(
            boxes.x,
            boxes.y - 1
        );
        const downBoxes = new Coordinate(
            boxes.x,
            boxes.y + 1
        );

        const left = this.boxIndex(leftBoxes) !== false;
        const right = this.boxIndex(rightBoxes) !== false;
        const up = this.boxIndex(upBoxes) !== false;
        const down = this.boxIndex(downBoxes) !== false;

        const isLeftUp = !up && down && !left && right;
        if (isLeftUp) return this.groundsDefault.leftUp;

        const isUp = !up && down && left && right;
        if (isUp) return this.groundsDefault.up;

        const isRightUp = !up && down && left && !right;
        if (isRightUp) return this.groundsDefault.rightUp;

        const isLeft = up && down && !left && right;
        if (isLeft) return this.groundsDefault.left;

        const isCenter = up && down && left && right;
        if (isCenter) return this.groundsDefault.center;

        const isRight = up && down && left && !right;
        if (isRight) return this.groundsDefault.right;

        const isLeftDown = up && !down && !left && right;
        if (isLeftDown) return this.groundsDefault.leftDown;

        const isDown = up && !down && left && right;
        if (isDown) return this.groundsDefault.down;

        const isRightDown = up && !down && left && !right;
        if (isRightDown) return this.groundsDefault.rightDown;

        const isHorizontalLeft = !up && !down && !left && right;
        if (isHorizontalLeft) return this.groundsDefault.horizontalLeft;

        const isHorizontalCenter = !up && !down && left && right;
        if (isHorizontalCenter) return this.groundsDefault.horizontalCenter;

        const isHorizontalRight = !up && !down && left && !right;
        if (isHorizontalRight) return this.groundsDefault.horizontalRight;

        const isVerticalUp = !up && down && !left && !right;
        if (isVerticalUp) return this.groundsDefault.verticalUp;

        const isVerticalCenter = up && down && !left && !right;
        if (isVerticalCenter) return this.groundsDefault.verticalCenter;

        const isVerticalDown = up && !down && !left && !right;
        if (isVerticalDown) return this.groundsDefault.verticalDown;

        return this.groundsDefault.only;
    }

    drawGrounds() {
        this.drawElements();
    }
}  