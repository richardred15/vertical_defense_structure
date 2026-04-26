const grid = {
    spacing: 50,
    color: 111,
    stroke_weight: 1,
    draw: function () {
        stroke(this.color);
        strokeWeight(this.stroke_weight);
        for (let v = this.spacing; v < height; v += this.spacing) {
            line(0, v, width, v);
        }
        for (let h = this.spacing; h < width; h += this.spacing) {
            line(h, 0, h, height);
        }
    },
};
