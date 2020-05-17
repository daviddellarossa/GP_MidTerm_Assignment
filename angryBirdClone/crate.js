/**
 * Class modeling a crate
 * @extends {GameObject}
 */class Crate extends GameObject{
    /**
     * Create an instance of crate
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
                return Bodies.rectangle(
                    location.x,
                    location.y,
                    size.width,
                    size.height,
                    {angle:angle, friction:1});
            }
        );
    }
}