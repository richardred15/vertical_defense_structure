class Component {
    /**
     * @type {Component|null}
     */
    parent = null;
    fill_color = color(255);
    _fill = true;
    _stroke = false;
    stroke_color = color(0);
    font_color = color(0);
    padding = 5;
    /**
     * @type {number[]}
     */
    _border_radius = [0];
    auto_size = false;
    /**
     * @type {string}
     */
    cursor = ARROW;
    /**
     * @type {Object<string, function[]>}
     */
    events = {
        click: [],
        mouse_up: [],
        mouse_down: [],
        mouse_enter: [],
        mouse_leave: [],
    };
    /**
     * @type {Component[]}
     */
    children = [];
    /**
     *
     * @param {Vec2} position
     * @param {Vec2} dimensions
     */
    constructor(position = new Vec2(), dimensions = new Vec2()) {
        this.position = position;
        this.dimensions = dimensions;
    }

    /**
     * @param {number|number[]} value - Top Left, Top Right, Bottom Left, Bottom Right
     */
    set border_radius(value) {
        if (typeof value == "number") this._border_radius = [value];
        else this._border_radius = value;
    }

    get border_radius() {
        return this._border_radius.length > 1
            ? this._border_radius
            : this._border_radius[0];
    }

    /**
     * @param {Color} color
     */
    fill(color) {
        this._fill = true;
        this.fill_color = color;
    }

    noFill() {
        this._fill = false;
    }

    /**
     *
     * @param {Color} color
     */
    stroke(color) {
        this._stroke = true;
        this.stroke_color = color;
    }

    noStroke() {
        this._stroke = false;
    }

    /**
     *
     * @param {Component} component
     */
    add_component(component) {
        component.parent = this;
        this.children.push(component);
        this.size_to_component(component);
    }

    /**
     *
     * @param {Vec2} position
     * @param {Vec2} dimensions
     */
    size_to_dimensions(position, dimensions) {
        if (
            this.position.x + position.x + dimensions.width + this.padding >
            this.dimensions.width
        ) {
            let diff =
                this.position.x +
                position.x +
                dimensions.width +
                this.padding -
                this.dimensions.width;
            console.log("TOO WIDE");
            this.dimensions.width += diff;
        }
        if (
            this.position.y + position.y + dimensions.height + this.padding >
            this.dimensions.height
        ) {
            let diff =
                this.position.y +
                position.y +
                dimensions.height +
                this.padding -
                this.dimensions.height;
            console.log("TOO TALL");
            this.dimensions.height += diff;
        }
    }

    /**
     *
     * @param {Component} component
     */
    size_to_component(component) {
        if (this.auto_size) {
            this.size_to_dimensions(component.position, component.dimensions);
        }
    }

    /**
     *
     * @param {Vec2} point
     */
    contains(point) {
        return (
            point.x > this.position.x &&
            point.x < this.position.x + this.dimensions.width &&
            point.y > this.position.y &&
            point.y < this.position.y + this.dimensions.height
        );
    }

    /**
     *
     * @param {string} event_name
     * @param {Event} event
     */
    fire_event(event_name, event) {
        if (this.events[event_name]) {
            for (let callback of this.events[event_name]) {
                callback(event);
            }
        }
    }

    /**
     *
     * @param {string} event
     * @param {function(Event):void} callback
     */
    on(event, callback) {
        if (this.events[event]) {
            this.events[event].push(callback);
        }
    }

    /**
     *
     * @param {Vec2} mouse_position
     * @param {Event} event
     */
    mouse_clicked(mouse_position, event) {
        this.fire_event("click", event);
        mouse_position = new Vec2(
            mouse_position.x - this.position.x,
            mouse_position.y - this.position.y,
        );
        for (let child of this.children) {
            if (child.contains(mouse_position)) {
                child.mouse_clicked(mouse_position, event);
            }
        }
    }

    /**
     *
     * @param {Event} event
     */
    mouse_enter(event) {
        this.fire_event("mouse_enter", event);
    }

    /**
     *
     * @param {Event} event
     */
    mouse_leave(event) {
        this.fire_event("mouse_leave", event);
    }

    /**
     * @param {Vec2} mouse_position
     * @param {Event} event
     */
    mouse_move(mouse_position, event) {}

    draw() {
        textAlign(LEFT, TOP);
        if (this._fill) fill(this.fill_color);
        else noFill();
        if (this._stroke) stroke(this.stroke_color);
        else noStroke();
        rect(
            this.position.x,
            this.position.y,
            this.dimensions.width,
            this.dimensions.height,
            ...this._border_radius,
        );
        translate(this.position.x, this.position.y);
        for (let child of this.children) {
            push();
            child.draw();
            pop();
        }
    }
}

class Button extends Component {
    cursor = HAND;
    /**
     * @type {Label}
     */
    label;
    /**
     * @param {Vec2} position
     * @param {Vec2} dimensions
     */
    constructor(position, dimensions) {
        super(position, dimensions);
        this.label = new Label("");
        this.label.position = new Vec2(this.padding, this.padding);
        this.children.push(this.label);
        this.size_to_component(this.label);
    }
}

class Label extends Component {
    font_color = color("white");
    _text = "";
    //auto_size = true;
    _fill = false;
    /**
     * @param {string} text
     */
    constructor(text) {
        super(new Vec2(), new Vec2(textWidth(text), textSize()));
        this.text = text;
    }

    set text(text) {
        this._text = text;
        if (this.auto_size && this.parent) {
            this.dimensions = new Vec2(textWidth(text), textSize());
            this.size_to_dimensions(this.position, this.dimensions);
            this.parent.size_to_component(this);
        }
    }

    get text() {
        return this._text;
    }

    draw() {
        super.draw();
        noStroke();
        fill(this.font_color);
        text(
            this.text,
            this.position.x + this.padding,
            this.position.y + this.padding,
        );
    }
}

class HUD extends Component {
    _fill = false;
    _stroke = false;
}
