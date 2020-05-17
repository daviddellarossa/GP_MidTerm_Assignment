/**
 * Base class for objects drawn on the screen
 */
class GameObject{
    /** Size of the object */
    size;
    /** Image used to draw the object */
    image;
    /** Instance of Matter.Body */
    body;

    /**
     * Create an instance of GameObject
     * @param location - location of the object in screen coordinates
     * @param size - size of the object
     * @param angle - angle of the object
     * @param image - image used to draw the object
     * @param bodyConstructor - factory method to build the Matter.Body object. The inherited class controls how the
     * body instance is created
     */
    constructor(location, size, angle, image, bodyConstructor){
        this.size = size;
        this.image = image;
        this.body = bodyConstructor();
    }

    /**
     * Base method to draw the object
     * The coordinate center is translated at the object location, and the angle is rotated aligned with the object
     */
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