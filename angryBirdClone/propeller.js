class Propeller extends GameObject{
    constructor(location, size, angle, image) {
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
                    {isStatic:true, angle:angle});
            }
        );
    }
}