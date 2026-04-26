/**
 * Represents a body
 * @class
 */
class Body {
    /**
     * @type {number} The radius of the body
     */
    radius = 5;
    /**
     * @type {Vec2} The velocity of the body
     */
    velocity = new Vec2(0, 0);
    /**
     * @type {Vec2} The friction applied to the body
     */
    friction = new Vec2(1, 1);
    /**
     * @type {Vec2} The acceleration applied to the body
     */
    acceleration = new Vec2(0, 0);
    /**
     * @type {Vec2} The maximum velocity for the body
     */
    terminal_velocity = new Vec2(Infinity, Infinity);
    /**
     * @type {boolean} If the body should be culled
     */
    dead = false;
    /**
     * @type {string} A unique identifier per body "type"
     */
    type = this.constructor.name.toLowerCase();
    /**
     * @type {Color} Fill color for this entity
     */
    fill_color = color("blue");
    /**
     * @type {Color} Shadow color for this entity
     */
    shadow_color = color("blue");
    shadow = false;
    /**
     * @type {string} Unique ID for body
     */
    id = "";
    /**
     *
     * @param {Vec2} position
     */
    constructor(position) {
        this.position = position;
    }

    /**
     *
     * @returns {boolean}
     */
    is_on_screen() {
        if (
            this.position.x < -this.radius ||
            this.position.x > width + this.radius ||
            this.position.y < -this.radius ||
            this.position.y > height + this.radius
        )
            return false;
        return true;
    }

    update() {
        this.velocity = this.velocity.add(this.acceleration);
        if (this.velocity.x > this.terminal_velocity.x)
            this.velocity.x = this.terminal_velocity.x;
        if (this.velocity.y > this.terminal_velocity.y)
            this.velocity.y = this.terminal_velocity.y;
        this.position = this.position.add(this.velocity);
        this.acceleration = this.acceleration.multiply(0);
        this.velocity = this.velocity.multiply(this.friction);
    }

    draw() {}
}
