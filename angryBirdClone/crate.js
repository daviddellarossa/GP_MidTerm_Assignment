class Crate extends GameObject{
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