class Asteroid {
    constructor(location, velocity, acceleration, idx) {
        console.log(`idx: ${idx}`);
        this.location = location;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.img = asteroidImg[idx];
        if (this.img == undefined)
            debugger;
        this.size = createVector(this.img.width, this.img.height);
    }

    move() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }

    applyForce(f) {
        this.acceleration.add(f);
    }

    draw() {
        image(this.img, this.location.x - this.size.x / 2, this.location.y - this.size.y / 2, this.size.x, this.size.y);
    }

    calcGravity(centerOfMass) {
        var gravity = p5.Vector.sub(centerOfMass, this.location);
        gravity.normalize();
        gravity.mult(.001);
        this.applyForce(gravity);
    }
}