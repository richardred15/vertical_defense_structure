/**
 * Represents an Entity
 * @class
 */
class Entity extends Body {
    /**
     * @property {boolean} If this entity has targetted another
     */
    has_target = false;
    /**
     * @property {number} The speed the entity will move at toward target
     */
    movement_speed = 2;
    /**
     * @property {number} Speed at which the entity can attack
     */
    attack_speed = 0.5;
    /**
     * @property {number} Damage done when attacking
     */
    attack_damage = 10;
    /**
     * @property {number} Default health of the entity
     * @private
     */
    _max_health = 10;
    /**
     * @property {number} Total health of the entity
     */
    health = this._max_health;
    /**
     * @property {number} The damage multiplier that hurts entities attacking this entity
     */
    thorns = 0;
    /**
     * @type {boolean} If has attacked this frame
     */
    has_attacked = false;
    /**
     * @type {string[]} Entity types to attack
     */
    attack_target_types = [];
    /**
     *
     * @param {Vec2} position
     */
    constructor(position) {
        super(position);
    }

    /**
     *
     * @param {string} type
     */
    attacks(type) {
        this.attack_target_types.push(type);
    }

    /**
     *
     * @param {number} health
     */
    set max_health(health) {
        let diff = health - this.max_health;
        this.health += diff;
        this._max_health = health;
    }

    get max_health() {
        return this._max_health;
    }

    /**
     *
     * @param {Entity} entity
     */
    target(entity) {
        this.has_target = true;
        this.velocity = Vec2.Mult(
            entity.position.subtract(this.position).normal(),
            this.movement_speed,
        );
    }

    /**
     *
     * @param {Entity} enemy
     * @param {number} damage
     */
    attack(enemy, damage = this.attack_damage) {
        enemy.apply_damage(damage, this);
    }

    /**
     *
     * @param {number} amount
     * @param {Entity} cause
     */
    apply_damage(amount, cause) {
        this.health -= amount;
        if (this.health <= 0) {
            this.dead = true;
        }
        if (this.thorns > 0) this.attack(cause, amount * this.thorns);
    }

    update() {
        super.update();
        this.has_attacked = false;
        if (this.attack_target_types.length > 0) {
            if (!this.dead && !this.has_target) {
                for (let type of this.attack_target_types) {
                    let nearest_body = world.get_nearest_body_to(this, type);
                    if (nearest_body) this.target(nearest_body);
                    break;
                }
            }
        }
        if (world.has_collision(this)) {
            let collisions = world.get_collisions(this);
            for (let entity of collisions) {
                if (this.attack_target_types.includes(entity.type)) {
                    this.attack(entity);
                    this.has_attacked = true;
                }
            }
        }
        if (this.health <= 0 || !this.is_on_screen()) {
            this.dead = true;
        }
    }

    renderHealth(radius = this.radius) {
        let green = color(55, 255, 55);
        let stroke_weight = radius / 10;
        if (this.health < this.max_health / 2) {
            stroke(
                lerpColor(
                    green,
                    color("red"),
                    1 - this.health / (this.max_health / 2),
                ),
            );
        } else {
            stroke(green);
        }
        noFill();
        strokeWeight(stroke_weight);
        if (this.health < this.max_health)
            arc(
                this.position.x,
                this.position.y,
                radius * 2 - (stroke_weight + 1),
                radius * 2 - (stroke_weight + 1),
                -HALF_PI,
                -HALF_PI - TWO_PI * (1 - this.health / this.max_health),
            );
        else
            circle(
                this.position.x,
                this.position.y,
                radius * 2 - (stroke_weight + 1),
            );
    }

    on_death() {
        //console.log(`${this.id} has died!`);
    }

    draw() {
        super.draw();
        if (this.shadow) {
            context.shadowColor = this.shadow_color.toString("rgb");
            context.shadowBlur = 5 + 20 * abs(sin(frameCount / 100));
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
        }
    }
}
