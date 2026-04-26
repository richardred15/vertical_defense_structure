function next_enemy() {
    spawn_enemy();
    setTimeout(next_enemy, 3000 - frameCount / 10);
}

setTimeout(next_enemy, 3000);
function spawn_enemy() {
    let spawn_location = new Vec2(0, 0);
    if (Math.random() < 0.5) {
        if (Math.random() < 0.5)
            spawn_location = new Vec2(0, Math.random() * height);
        else spawn_location = new Vec2(width, Math.random() * height);
    } else {
        if (Math.random() < 0.5)
            spawn_location = new Vec2(Math.random() * width, 0);
        else spawn_location = new Vec2(Math.random() * width, height);
    }
    let enemy = new Enemy(spawn_location);
    enemy.max_health = 50 + frameCount / 1000;
    enemy.movement_speed = 1 + frameCount / 10000;
    enemy.attack_damage = 1;
    enemy.attacks("vds");
    world.add_entity(enemy);
}
