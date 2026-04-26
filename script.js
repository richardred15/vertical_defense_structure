/**
 * @type {VDS}
 */
let vds;
/**
 * @type {StarField}
 */
let star_field;
let canvas;
/**
 * @type {CanvasRenderingContext2D}
 */
let context;

function setup() {
    canvas = createCanvas(800, 600);
    context = canvas.elt.getContext("2d");
    rectMode(CORNER);
    strokeCap(SQUARE);
    hud = new HUD(new Vec2(), new Vec2(width, height));
    initialize_hud();
    star_field = new StarField();
    vds = new VDS(new Vec2(width / 2, height / 2));
    world.add_entity(vds);
}

function draw() {
    resetMatrix();
    background(5, 5, 20);
    spawn_enemy();

    grid.draw();
    star_field.draw();
    world.update();
    world.draw();
    resetMatrix();
    hud.draw();
}

document.addEventListener("mouseup", (event) => {
    hud.mouse_clicked(new Vec2(mouseX, mouseY), event);
});
document.addEventListener("contextmenu", (event) => event.preventDefault());

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        noLoop();
        console.log("PAUSED");
    } else {
        loop();
        console.log("RESUMED");
    }
});
