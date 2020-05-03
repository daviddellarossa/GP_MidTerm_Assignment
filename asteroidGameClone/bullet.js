class Bullet {
    constructor(location) {
        this.location = location;
        this.animationIdx = 0;
        this.img = bulletImg;
        this.size = createVector(26, 34);
        this.velocity = new createVector(0, -5);
    }

    move() {
        this.location.y += this.velocity.y;
    }

    draw() {
        let idx = Math.floor(frameCount / 2) % 4;
        image(this.img[idx], this.location.x - this.size.x / 2, this.location.y - this.size.y / 2, this.size.x, this.size.y);
    }
}