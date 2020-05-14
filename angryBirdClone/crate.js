class Propeller {
    size;
    image;
    body;
    constructor(location, size, angle, image){
        this.location = location;
        this.size = size;
        this.angle = angle
        this.image = image;
        this.body = Bodies.rectangle(location.x, location.y, size.width,size.height, {angle:angle});;
    }

    draw = function(){

    }
}
