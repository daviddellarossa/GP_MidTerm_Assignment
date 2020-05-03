class Asteroid {
    /**
     * Create and asteroid
     * @param location - Start location
     * @param velocity - Start velocity
     * @param acceleration - Start acceleration
     * @param idx - Index of animation in asteroidImg array
     */
    constructor(location, velocity, acceleration, idx) {
        this.location = location;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.img = asteroidImg[idx];
        this.size = new createVector(this.img.width, this.img.height);
    }
    /** Move the asteroid */
    move() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }
    /** Apply an external force */
    applyForce(f) {
        this.acceleration.add(f);
    }

    draw() {
        image(this.img, this.location.x - this.size.x / 2, this.location.y - this.size.y / 2, this.size.x, this.size.y);
    }

    /** Calculate the effect of gravity */
    calcGravity(centerOfMass) {
        var gravity = p5.Vector.sub(centerOfMass, this.location);
        gravity.normalize();
        gravity.mult(.001);
        this.applyForce(gravity);
    }
}