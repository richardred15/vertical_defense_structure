class Vec2 {
    /**
     * @type {number}
     */
    x = 0;
    y = 0;
    /**
     *
     * @param {Number | Vec2} x
     * @param {Number} y
     */
    constructor(x = 0, y = 0) {
        if (x instanceof Vec2) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    get width() {
        return this.x;
    }

    set width(value) {
        this.x = value;
    }

    get height() {
        return this.y;
    }

    set height(value) {
        this.y = value;
    }

    /**
     *
     * @returns {Vec2}
     */
    clone() {
        return new Vec2(this.x, this.y);
    }

    /**
     * Returns a new vector with the summed value of the source and target vectors
     * @param {Vec2} vector
     * @returns {Vec2}
     */
    add(vector) {
        return Vec2.Add(this, vector);
    }

    /**
     *
     * @param {Vec2} vector
     * @returns {Vec2}
     */
    subtract(vector) {
        return Vec2.Sub(this, vector);
    }

    /**
     *
     * @param {Vec2|number} vector
     * @returns {Vec2}
     */
    multiply(vector) {
        return Vec2.Mult(this, vector);
    }

    /**
     *
     * @param {Vec2} vector
     * @returns {Vec2}
     */
    divide(vector) {
        return Vec2.Div(this, vector);
    }

    /**
     *
     * @returns {Vec2}
     */
    normal() {
        let mag = this.magnitude();
        return Vec2.Div(this, mag);
    }

    /**
     *
     * @returns {Number}
     */
    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    /**
     *
     * @param {Vec2} vector
     * @returns {Number}
     */
    dot(vector) {
        return Vec2.Dot(this, vector);
    }

    /**
     *
     * @param {Vec2} vector
     * @returns {Number}
     */
    dist(vector) {
        return Vec2.Dist(this, vector);
    }

    /**
     *
     * @param {Vec2} vec1
     * @param {Vec2} vec2
     * @param {Number} amount
     * @returns {Vec2}
     */
    static Interpolate(vec1, vec2, amount) {
        return Vec2.Add(Vec2.Mult(vec1, amount), Vec2.Mult(vec2, 1 - amount));
    }

    /**
     *
     * @param {Vec2} vec1
     * @param {Vec2} vec2
     * @returns {Number}
     */
    static Dot(vec1, vec2) {
        return vec1.x * vec2.x + vec1.y * vec2.y;
    }

    /**
     *
     * @param {Vec2} vec1
     * @param {Vec2} vec2
     * @returns {Number}
     */
    static Dist(vec1, vec2) {
        let xDiff = vec2.x - vec1.x;
        let yDiff = vec2.y - vec1.y;
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    }

    /**
     *
     * @param {Vec2} vec1
     * @param {Vec2|number} vec2
     * @returns {Vec2}
     */
    static Add(vec1, vec2) {
        if (typeof vec2 == "number")
            return new Vec2(vec1.x + vec2, vec1.y + vec2);
        if (vec2 instanceof Vec2)
            return new Vec2(vec1.x + vec2.x, vec1.y + vec2.y);
        return vec1;
    }
    /**
     *
     * @param {Vec2} vec1
     * @param {Vec2|number} vec2
     * @returns {Vec2}
     */
    static Sub(vec1, vec2) {
        if (typeof vec2 == "number")
            return new Vec2(vec1.x - vec2, vec1.y - vec2);
        if (vec2 instanceof Vec2)
            return new Vec2(vec1.x - vec2.x, vec1.y - vec2.y);
        return vec1;
    }

    /**
     *
     * @param {Vec2[]} vec_array
     * @param {Vec2} vector
     * @returns {Vec2[]}
     */
    static MultArray(vec_array, vector) {
        /**
         * @type {Vec2[]}
         */
        let out = [];
        for (let vec of vec_array) {
            out.push(Vec2.Mult(vec, vector));
        }
        return out;
    }
    /**
     *
     * @param {Vec2} vec1
     * @param {Vec2|number} vec2
     * @returns {Vec2}
     */
    static Mult(vec1, vec2) {
        if (typeof vec2 == "number")
            return new Vec2(vec1.x * vec2, vec1.y * vec2);
        if (vec2 instanceof Vec2)
            return new Vec2(vec1.x * vec2.x, vec1.y * vec2.y);
        return vec1;
    }
    /**
     *
     * @param {Vec2} vec1
     * @param {Vec2|number} vec2
     * @returns {Vec2}
     */
    static Div(vec1, vec2) {
        if (typeof vec2 == "number")
            return new Vec2(vec1.x / vec2, vec1.y / vec2);
        if (vec2 instanceof Vec2)
            return new Vec2(vec1.x / vec2.x, vec1.y / vec2.y);
        return vec1;
    }

    /**
     *
     * @param {[{x:Number,y:Number}]} point_object_array
     * @returns Vec2[]
     */
    static PointObjectArrayToVec2(point_object_array) {
        let out = [];
        for (let point of point_object_array) {
            out.push(new Vec2(point.x, point.y));
        }
        return out;
    }

    /**
     *
     * @param {[[Number,Number]]} point_array
     * @returns Vec2[]
     */
    static PointArrayToVec2(point_array) {
        let out = [];
        for (let point of point_array) {
            out.push(new Vec2(point[0], point[1]));
        }
        return out;
    }
}
