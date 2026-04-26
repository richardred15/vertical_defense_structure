class EnemyFragment extends Entity {
    type = "enemy_fragment";
    end_position = new Vec2();
    life_time = 5000;
    life_remaining = 1;
    /**
     *
     * @param {Vec2} position
     * @param {Vec2} end_position
     */
    constructor(position, end_position) {
        super(position);
        this.position = position;
        this.end_position = end_position;
        this.birth_time = Date.now();
        this.life_time += (Math.random() - 0.5) * 2500;
    }

    update() {
        super.update();
        this.end_position = this.end_position.add(this.velocity);
        this.life_remaining =
            1 - (Date.now() - this.birth_time) / this.life_time;
        if (Date.now() - this.birth_time > this.life_time) {
            this.dead = true;
        }
    }

    draw() {
        super.draw();
        stroke(255, 0, 0, 255 * this.life_remaining);
        strokeWeight(1);
        line(
            this.position.x,
            this.position.y,
            this.end_position.x,
            this.end_position.y,
        );
    }
}

class EnemyGhost extends Entity {
    type = "enemy_ghost";
    life_time = 500;
    life_remaining = 1;
    fill_color = color(55, 0, 0);

    /**
     *
     * @param {Vec2} position
     */
    constructor(position) {
        super(position);
        this.birth_time = Date.now();
    }

    update() {
        super.update();
        this.life_remaining =
            1 - (Date.now() - this.birth_time) / this.life_time;
        if (Date.now() - this.birth_time > this.life_time) {
            this.dead = true;
        }
        this.radius += this.life_remaining;
        this.fill_color.setAlpha(255 * this.life_remaining);
    }

    draw() {
        super.draw();
        noStroke();
        fill(this.fill_color);
        drawShape(this.position.x, this.position.y, this.radius - 4, 6);
    }
}

class Enemy extends Entity {
    radius = 30;
    fill_color = color(55, 0, 0);
    shadow_color = color(255, 0, 0);
    shadow = true;
    /**
     *
     * @param {Vec2} position
     */
    constructor(position) {
        super(position);
    }

    update() {
        super.update();
        if (world.has_collision(this)) {
            if (
                world
                    .get_collisions(this)
                    .filter((entity) => entity.type == "vds").length > 0
            )
                this.velocity = new Vec2(0, 0);
        }
    }

    on_death() {
        let lines = calculateShape(
            this.position.x,
            this.position.y,
            this.radius - 4,
            6,
        );
        let start = lines[0];
        for (let l = 1; l < lines.length; l++) {
            let end = lines[l];
            let fragment = new EnemyFragment(
                new Vec2(start[0], start[1]),
                new Vec2(end[0], end[1]),
            );
            fragment.velocity = this.velocity.multiply(
                0.7 + (Math.random() * 0.1 - 0.05),
            );
            fragment.velocity = fragment.velocity.add(
                new Vec2(Math.random() / 4, Math.random() / 4),
            );
            world.add_entity(fragment);
            start = end;
        }
        let ghost = new EnemyGhost(this.position);
        ghost.velocity = this.velocity.multiply(
            0.7 + (Math.random() * 0.1 - 0.05),
        );
        ghost.radius = this.radius;
        world.add_entity(ghost);
    }

    draw() {
        super.draw();
        stroke(255, 0, 0);
        fill(this.fill_color);
        drawShape(this.position.x, this.position.y, this.radius - 4, 6);
        this.renderHealth(this.radius - 10);
    }
}
