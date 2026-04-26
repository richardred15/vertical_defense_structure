class Gun {
    last_fired = 0;
    multi_shot_chance = 0.1;
    multi_shot_rounds = 3;
    /**
     *
     * @param {Entity} holder Entity holding gun
     */
    constructor(holder) {
        this.holder = holder;
    }

    /**
     *
     * @param {Entity} enemy
     */
    fire_projectile_at(enemy) {
        let bullet = new Projectile(this.holder.position.clone());
        bullet.fill_color = color("yellow");
        bullet.attack_damage = this.holder.attack_damage;
        bullet.attacks("enemy");
        bullet.radius = 4;
        bullet.movement_speed = 5;
        bullet.target(enemy);
        world.add_entity(bullet);
    }

    fire() {
        if (Date.now() - this.last_fired > 1000 / this.holder.attack_speed) {
            this.last_fired = Date.now();
            let rounds = 5;
            /**
             * @type {string[]}
             */
            let fired_at = [];
            let nearest_bodies = world.get_nearest_bodies_to(
                this.holder,
                "enemy",
            );
            rounds =
                rounds > nearest_bodies.length ? nearest_bodies.length : rounds;
            for (let r = 0; r < rounds; r++) {
                let next = nearest_bodies[r];
                if (next) {
                    if (!fired_at.includes(next.id)) {
                        fired_at.push(next.id);

                        this.fire_projectile_at(next);
                    }
                } else {
                    break;
                }
            }
        }
    }
}
