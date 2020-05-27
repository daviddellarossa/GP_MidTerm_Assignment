class GridNode{
    width;
    height;
    position;
    noise;
    constructor(position, width, height){
        this.width = width;
        this.height = height;
        this.position = position;
        this.noise = 0;
    }

    drawColorGrid(noiseValue){
        this.noise = noiseValue
        let col = lerpColor(color(255, 0, 0), color(0, 0, 255), this.noise);
        push();
            fill(col);
            stroke(0);
            strokeWeight(1);
            translate(this.position);
            rect(0, 0, this.width, this.height);
        pop();
    }

    drawCompassGrid(){
        push();
            translate(this.position.x + this.width / 2 , this.position.y + this.height / 2 );
            rotate(map(this.noise, 0, 1, 0, 4*PI));
            stroke(0);
            strokeWeight(1);
            line(0, -this.height/2, 0, this.height/2);
            fill(0, 255, 0);
            circle(0, 0, 3);
        pop()
    }
}