/**
 * Class modeling a Slingshot. It is modeled as a Matter.Constraint between a point and a bird.
 * @extends {GameObject}
 */
class Slingshot extends GameObject{
    /** location of the slingshot */
    location;
    /** angle of the slingshot */
    angle;

    /**
     * Create an instance of Slingshot
     * @param location - location of the slingshot as P4.Vector
     * @param size - size of the slingshot
     * @param angle - angle of the slingshot
     * @param image - image used to draw the slingshot
     * @param slingshotBird - bird used to create the constraint to
     */
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

    /** draw the slingshot */
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

