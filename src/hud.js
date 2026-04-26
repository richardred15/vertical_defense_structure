/**
 * @type {HUD}
 */
let hud;
function initialize_hud() {
    let panel = new Component(new Vec2(20, 20), new Vec2(255, 100));
    let button = new Button(new Vec2(5, 5), new Vec2(120, 40));
    let button2 = new Button(new Vec2(130, 5), new Vec2(120, 40));
    let button3 = new Button(new Vec2(5, 50), new Vec2(120, 40));
    let button4 = new Button(new Vec2(130, 50), new Vec2(120, 40));
    button.label.text = "Spawn Enemy";
    button2.label.text = "Kill Enemies";
    button3.label.text = "BUTTON 3";
    button4.label.text = "BUTTON 4";
    button4.border_radius = 5;
    button.fill_color = color("#111");
    button2.fill_color = color("#111");
    button3.fill_color = color("#111");
    button4.noFill();
    button4.stroke(color("red"));
    button4.stroke_color = color("red");
    button4.label.font_color = color("red");
    button.on("click", (event) => {
        spawn_enemy();
    });
    button2.on("click", (event) => {
        for (let entity of world.entities) {
            if (entity.type == "enemy") {
                entity.dead = true;
            }
        }
    });
    button3.on("click", (event) => {
        console.log("BUTTON 3");
    });
    button4.on("click", (event) => {
        console.log("BUTTON 4");
    });
    button.stroke(color("blue"));
    panel.fill(color(51, 51, 51, 125));
    panel.add_component(button);
    panel.add_component(button2);
    panel.add_component(button3);
    panel.add_component(button4);
    hud.add_component(panel);
}
