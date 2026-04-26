/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} r
 * @param {number} sides
 */
function calculateShape(x, y, r, sides) {
    let lines = [];
    for (let i = 0; i < sides; i++) {
        // calculate the rotation
        const rotation = ((Math.PI * 2) / sides) * i;

        // for the first point move to
        if (i === 0) {
            lines.push([
                r * Math.cos(rotation) + x,
                r * Math.sin(rotation) + y,
            ]);
        } else {
            // for the rest draw a line
            lines.push([
                r * Math.cos(rotation) + x,
                r * Math.sin(rotation) + y,
            ]);
        }
    }

    return lines;
}
