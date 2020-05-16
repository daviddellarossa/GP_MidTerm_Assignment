class Slingshot extends GameObject{
    location;
    angle;
    constructor(location, size, angle, image, slingshotBird){
        super(
            location,
            size,
            angle,
            image,
            ()=>{
                let constraint = Matter.Constraint.create({
                    pointA: {x:location.x, y:location.y},
                    bodyB: slingshotBird,
                    stiffness: 0.01,
                    damping: 0.0001
                });
                World.add(engine.world, [constraint]);
                return constraint;
            }
        );
        this.location = location;
        this.angle = angle;
    }

    draw(){
        push();
        translate(this.location.x, this.location.y);
        rotate(this.angle);
        image(
            this.image,
            -this.size.width/2,
            0,
            this.size.width,
            this.size.height
        );
        pop();
    }
}

class SlingshotManager{
    location;
    size;
    angle;
    image;
    slingshot;
    bird;
    constructor(location) {
        this.location = location;
        this.size = {width:60, height: 150};
        this.angle = 0;
        this.image = TextureHandler.slingshotImg;
        this.bird = BirdManager.createBird(200, 200);
        this.slingshot = new Slingshot(
            createVector(location.x, location.y),
            {width:60, height: 150},
            0,
            TextureHandler.slingshotImg,
            this.bird.body
        );
    }

    draw(){
        this.slingshot.draw();
    }

    releaseConstraint(){
        this.slingshot.body.bodyB = null;
        this.slingshot.body.pointA = { x: 0, y: 0 };
    }

    reset(){
        BirdManager.destroyBird(this.bird);
        this.bird = BirdManager.createBird(this.location.x, this.location.y);
        this.slingshot.body.bodyB = this.bird.body;
        this.slingshot.body.pointA = { x: this.location.x, y: this.location.y};
    }
}