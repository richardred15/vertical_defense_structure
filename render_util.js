/**
 *
 * @param {number} x
 * @param {number} y
 * @param {number} r
 * @param {number} sides
 */
function drawShape(x, y, r, sides) {
    translate(x, y);
    rotate(Math.PI);
    beginShape();
    for (let i = 0; i < sides; i++) {
        // calculate the rotation
        const rotation = ((Math.PI * 2) / sides) * i;
        // for the first point move to
        if (i === 0) {
            vertex(r * Math.cos(rotation), r * Math.sin(rotation));
        } else {
            // for the rest draw a line
            vertex(r * Math.cos(rotation), r * Math.sin(rotation));
        }
    }
    endShape(CLOSE);
    resetMatrix();
}
