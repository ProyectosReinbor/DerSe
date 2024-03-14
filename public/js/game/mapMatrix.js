export const MapMatrix = () => {
    const matrix = [];
    const vertical = 20;
    const horizontal = 20;

    for (let y = 0; y < vertical; y++) {
        matrix.push([]);
        for (let x = 0; x < horizontal; x++) {
            const boxes = [];
            boxes.push({ layer: "water" });
            if (y > 0 && y < 19 && x > 0 && x < 19) {
                boxes.push({ layer: "flatYellow" });
                boxes.push({ layer: "foam" });
            }
            if (y > 0 && y < 3 && x > 0 && x < 19)
                boxes.push({ layer: "elevation" });

            if (y === 3 && x > 0 && x < 19)
                boxes.push({ layer: "wallElevation" });

            if (y === 4 && x === 8) {
                boxes.push({ layer: "castle", color: "blue", state: "ready" });
            }
            matrix[y].push(boxes);
        }
    }

    return matrix;
}