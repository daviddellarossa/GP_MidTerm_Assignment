class GridNode{
    // color;
    width;
    height;
    position;
    constructor(position, width, height){
        this.width = width;
        this.height = height;
        // this.color = color;
        this.position = position;
    }

    draw(color){
        push();
        fill(color);
        translate(this.position);
        rect(0, 0, this.width, this.height);
        pop();
    }
}