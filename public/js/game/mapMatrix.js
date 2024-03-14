export const MapMatrix = () => {
    const matrix = [];
    const vertical = 20;
    const horizontal = 20;

    for (let y = 0; y < vertical; y++) {
        matrix.push([]);
        for (let x = 0; x < horizontal; x++) {
            const boxes = [];
            boxes.push({ layer: "water" });

            if (y > 0 && y < 19 && x > 0 && x < 19)
                boxes.push({ layer: "foam", flatYellow: true });

            if (x > 3 && x < 16) {
                if (y > 0 && y < 18)
                    boxes.push({
                        layer: "elevation",
                        shadow: true,
                    });

                if (y === 18)
                    boxes.push({
                        layer: "wallElevation",
                        shadow: true,
                        flatElevation: "sand"
                    });
            }

            if (y === 4 && x === 8)
                boxes.push({ layer: "castle", color: "blue", state: "ready" });

            matrix[y].push(boxes);
        }
    }

    return matrix;
}