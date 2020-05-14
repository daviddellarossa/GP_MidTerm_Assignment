class Propeller {
    size;
    image;
    body;
    constructor(location, size, angle, image){
        this.location = location;
        this.size = size;
        this.angle = angle
        this.image = image;
        this.body = Bodies.rectangle(location.x, location.y, size.width,size.height, {isStatic:true, angle:angle});;
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
    }
}