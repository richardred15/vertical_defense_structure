const world = {
    /**
     * @type {Entity[]} Bodies in world
     */
    entities: [],
    /**
     * @type {Vec2}
     */
    wind: new Vec2(0, 0),
    /**
     * @type {Vec2}
     */
    gravity: new Vec2(0, 0),
    /**
     * @type {Object<String, Body>}
     */
    collisions: {},

    update() {
        this.calculate_collisions();
        for (let body of this.entities) {
            this.apply_force(body, this.gravity);
            this.apply_force(body, this.wind);
            body.update();
        }
        for (let i = this.entities.length - 1; i >= 0; i--) {
            let entity = this.entities[i];
            if (entity.dead) {
                entity.on_death();
                this.entities.splice(i, 1);
            }
        }
    },

    draw() {
        for (let b = this.entities.length - 1; b >= 0; b--) {
            let body = this.entities[b];
            push();
            body.draw();
            pop();
        }
    },

    /**
     *
     * @param {Entity} entity
     */
    add_entity(entity) {
        entity.id =
            entity.type +
            "_" +
            Date.now() +
            "_" +
            Math.floor(Math.random() * 1000);
        this.entities.push(entity);
    },

    /**
     *
     * @param {Entity} object
     * @param {Vec2} force
     */
    apply_force(object, force) {
        object.acceleration = object.acceleration.add(force);
    },

    calculate_collisions() {
        this.collisions = {};
        for (let entity of this.entities) {
            for (let entity2 of this.entities) {
                if (entity.id != entity2.id) {
                    let distance = Vec2.Dist(entity.position, entity2.position);
                    let max_distance = entity.radius + entity2.radius;
                    if (distance < max_distance) {
                        if (!this.collisions[entity.id])
                            this.collisions[entity.id] = [];
                        if (!this.collisions[entity2.id])
                            this.collisions[entity2.id] = [];
                        this.collisions[entity.id].push(entity2.id);
                        this.collisions[entity2.id].push(entity.id);
                    }
                }
            }
        }
    },

    /**
     *
     * @param {Entity} body
     * @param {string} type
     * @param {number} max_distance
     * @returns {Entity|undefined}
     */
    get_nearest_body_to(body, type = "*", max_distance = Infinity) {
        let nearest_body = undefined;
        let nearest_distance = Infinity;
        for (let body2 of this.entities) {
            if ((type == "*" || body2.type == type) && body2.id != body.id) {
                let distance = Vec2.Dist(body.position, body2.position);
                if (distance < max_distance && distance < nearest_distance) {
                    nearest_distance = distance;
                    nearest_body = body2;
                }
            }
        }
        return nearest_body;
    },
    /**
     *
     * @param {Entity} body
     * @param {string} type
     * @param {number} max_distance
     * @returns {Entity[]}
     */
    get_nearest_bodies_to(body, type = "*", max_distance = Infinity) {
        /**
         * @type {[number, Entity][]}
         */
        let entities = [];
        for (let body2 of this.entities) {
            if ((type == "*" || body2.type == type) && body2.id != body.id) {
                let distance = Vec2.Dist(body.position, body2.position);
                entities.push([distance, body2]);
            }
        }
        entities.sort((a, b) => {
            return a[0] - b[0];
        });
        return entities.map((distance, index, array) => {
            return entities[index][1];
        });
    },
    /**
     *
     * @param {Entity} body
     * @returns
     */
    get_collisions(body) {
        let collided_bodies = [];
        if (this.collisions[body.id]) {
            for (let test_body of this.entities) {
                if (this.collisions[body.id].includes(test_body.id)) {
                    collided_bodies.push(test_body);
                }
            }
        }
        return collided_bodies;
    },
    /**
     *
     * @param {Entity} body
     * @returns
     */
    has_collision(body) {
        return this.collisions[body.id] && this.collisions[body.id].length > 0;
    },
    /**
     *
     * @param {Entity} body
     * @param {Entity} body2
     * @returns
     */
    bodies_have_collision(body, body2) {
        return (
            this.collisions[body.id].includes(body2.id) ||
            this.collisions[body2.id].includes[body.id]
        );
    },
};
