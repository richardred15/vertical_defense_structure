class Star {
    dead = false;
    /**
     *
     * @param {Vec2} position
     * @param {Vec2} velocity
     * @param {number} size
     * @param {number} opacity
     */
    constructor(
        position,
        velocity = new Vec2(0, Math.random() / 2),
        size = Math.random() * 3,
        opacity = Math.random(),
    ) {
        this.position = position;
        this.velocity = velocity;
        this.size = Math.random() <= 0.001 ? Math.random() * 10 : size;
        this.opacity = opacity;
    }

    update() {
        this.position = this.position.add(this.velocity);
        if (this.position.y - this.size > height) this.dead = true;
    }

    draw() {
        fill(255, 255 * this.opacity);
        noStroke();
        circle(this.position.x, this.position.y, this.size);
    }
}

class StarField {
    /**
     * @type {Star[]}
     */
    stars = [];
    constructor(star_count = 500) {
        this.star_count = star_count;
        for (let i = 0; i < star_count; i++) {
            this.spawn_star(true);
        }
    }

    spawn_star(init = false) {
        let position = new Vec2(
            Math.random() * width,
            init ? Math.random() * height : -20 * Math.random() - 10,
        );
        this.stars.push(new Star(position));
    }

    draw() {
        for (let star of this.stars) {
            star.update();
            star.draw();
        }
        for (let s = this.stars.length - 1; s >= 0; s--) {
            if (this.stars[s].dead) {
                this.stars.splice(s, 1);
            }
        }
        for (let i = this.stars.length; i < this.star_count; i++) {
            this.spawn_star();
        }
    }
}
