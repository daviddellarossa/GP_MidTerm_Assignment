class GameObject{
    size;
    image;
    body;
    constructor(location, size, angle, image, bodyConstructor){
        this.size = size;
        this.image = image;
        this.body = bodyConstructor();
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