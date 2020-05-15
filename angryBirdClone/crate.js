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
        this.body = Bodies.rectangle(location.x, location.y, size.width,size.height, {angle:angle, friction:1});
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
        pop();

        // push();
        //     translate(this.body.position.x, 580);
        //     let size = this.body.bounds.max.x -this.body.bounds.min.x;
        //     noStroke();
        //     fill('rgba(32, 32, 32, 0.8)');
        //     ellipseMode(RADIUS);
        //     arc(0, 0, size/2, 30, 0, PI);
        // pop();
    }


}
