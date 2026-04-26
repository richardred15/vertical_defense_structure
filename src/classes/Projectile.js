class Projectile extends Entity {
    friction = new Vec2(0.998, 0.998);
    health = 0.01;
    start_position = new Vec2(0, 0);
    /**
     *
     * @param {Vec2} position
     */
    constructor(position) {
        super(position);
        this.start_position = position.clone();
    }

    update() {
        super.update();
        if (this.has_attacked) this.dead = true;
    }

    draw() {
        super.draw();
        fill(this.fill_color);
        noStroke();
        circle(this.position.x, this.position.y, this.radius * 2);

        for (let i = 0; i < 10; i++) {
            let fill_color = color(this.fill_color.toString());
            fill_color.setAlpha(255 * ((10 - i) / 9));
            let new_pos = this.position.subtract(
                this.velocity.normal().multiply(i),
            );
            if (Vec2.Dist(new_pos, this.start_position) > this.radius * 2) {
                fill(fill_color);
                circle(new_pos.x, new_pos.y, this.radius * 2);
            }
        }
    }
}
