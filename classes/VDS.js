class VDS extends Entity {
    type = "vds";
    shadow = true;
    shadow_color = color("cyan");
    attack_speed = 6;
    attack_damage = 15;
    radius = 20;
    thorns = 0.5;
    weapon = new Gun(this);

    /**
     *
     * @param {Vec2} position
     */
    constructor(position) {
        super(position);
        this.max_health = 10;
    }

    update() {
        super.update();
        this.weapon.fire();
    }

    on_death() {
        super.on_death();
        console.log("DEAD");
        window.location.reload();
    }

    draw() {
        super.draw();
        fill(this.fill_color);
        noStroke();
        circle(this.position.x, this.position.y, this.radius * 2);
        circle(this.position.x, this.position.y, 1);
        this.renderHealth();
    }
}
