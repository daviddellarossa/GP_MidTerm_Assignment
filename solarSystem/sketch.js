var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;

    push(); //start sun coord system
    translate(width/2, height/2); // centre of the sun
        push();
            rotate(radians(speed/3 % 360)); //make the sun spin around its axis
            celestialObj(color(255,150,0), 200); // SUN
        pop();
        rotate(radians(speed % 360)); //Rotate the earth around the sun
        push(); //start earth coord system
            translate(0, 300); //centre of the earth
            push();
                rotate(radians(speed % 360)); //make the earth spin around its axis
                celestialObj(color(0, 0, 255), 80); //EARTH
            pop();
            rotate(radians(-speed * 2 % 360)) //Rotate the moon around the earth
            push();
                translate(0, -100); //centre of the moon
                celestialObj(color(255, 255, 255), 30); //MOON
            pop();
        pop();
    pop();
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}
