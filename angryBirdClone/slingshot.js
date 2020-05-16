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

        stroke(84,39,15);
        strokeWeight(8);

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

