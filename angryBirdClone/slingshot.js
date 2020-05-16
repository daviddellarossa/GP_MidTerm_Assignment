class Slingshot extends GameObject{
    location;
    angle;
    constructor(location, size, angle, image){
        super(
            location,
            size,
            angle,
            image,
            ()=>{ return null;
                // return Matter.Constraint.create({
                //     pointA: {x:location.x, y:location.y},
                //     bodyB: slingshotBird,
                //     stiffness: 0.01,
                //     damping: 0.0001
                // });
            }
        );
        // World.add(engine.world, [this.body]);
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