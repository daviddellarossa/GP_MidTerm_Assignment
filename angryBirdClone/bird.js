class Bird extends GameObject{
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
                    {friction: 0, restitution: 0.95 });
                Matter.Body.setMass(body, body.mass*10);
                return body;
            }
        );
    }

    draw() {
        // drawVertices(this.body.vertices);
        super.draw();
        fill(255, 0, 0);

    }
}
