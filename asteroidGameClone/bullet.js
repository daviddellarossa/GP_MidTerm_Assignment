class Bullet {
    /**
     * Construct a new Bullet
     * @param location - Start location
     */
    constructor(location) {
        this.location = location;
        this.img = bulletImg;
        this.size = new createVector(26, 34);
        this.velocity = new createVector(0, -5);
    }

    move() {
        this.location.y += this.velocity.y;
    }

    draw() {
        /** Slow down the animation by a factor */
        const slowdownFactor = 2
        let idx = Math.floor(frameCount / slowdownFactor) % 4; //4 is the number of frames in the animation
        image(this.img[idx], this.location.x - this.size.x / 2, this.location.y - this.size.y / 2, this.size.x, this.size.y);
    }
}