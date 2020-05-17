/**
 * Class modeling a bird
 * @extends {GameObject}
 */
class Bird extends GameObject{
    /**
     * Create an instance of Bird
     * @param location - location of the object in screen coordinates
     * @param size - size of the object
     * @param angle - angle of the object
     * @param image - image used to draw the object
     */
    constructor(location, size, angle, image){
        super(
            location,
            size,
            angle,
            image,
            ()=>{
                let body = Bodies.circle(
                    location.x,
                    location.y,
                    size.width / 2,
                    {friction: 0, restitution: 0.95, inertia: Infinity });
                Matter.Body.setMass(body, body.mass*10);
                return body;
            }
        );
    }
}
