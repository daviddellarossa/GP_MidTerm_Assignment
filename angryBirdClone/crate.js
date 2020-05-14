class Crate {
    size;
    image;
    body;
    color;
    constructor(location, size, angle, image){
        this.location = location;
        this.size = size;
        this.angle = angle
        this.image = image;
        this.body = Bodies.rectangle(location.x, location.y, size.width,size.height, {angle:angle});
        // push();
        // colorMode(HSB, 255);
        // this.color = color(Math.random(random(0, 255)), 100, 100, 0.5);
        // pop();
    }

    draw(){
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);

        image(
            this.image,
            -this.size.width/2,
            -this.size.height/2,
            this.size.width,
            this.size.height
        );
        //colorMode(HSB, 255);
        // noStroke();
        // //fill(this.color);
        // fill('rgba(0, 255, 255, 0.5)');
        // rect(
        //     -this.size.width/2,
        //     -this.size.height/2,
        //     this.size.width,
        //     this.size.height
        // );
        pop();
    }
}
