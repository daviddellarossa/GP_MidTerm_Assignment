class Explosion{
    constructor(location){
        this.location = location;
        this.isReadyForDistruction = false;
        this.img = explosionImg[Math.floor(random(4))];
        this.imgMatrix = new createVector(8, 8);
        this.imgSize = new createVector(this.img.width / this.imgMatrix.x, this.img.height / this.imgMatrix.y);
        this.imageIndex = new createVector(0, 0);
        this.speedControl = 8;
    }

    calculateNextFrame(){
        if(this.imageIndex.x === this.imgMatrix.x - 1 && this.imageIndex.y === this.imgMatrix.y - 1)
            this.isReadyForDistruction = true;

        this.imageIndex.x++;
        if(this.imageIndex.x >= this.imgMatrix.x){
            this.imageIndex.x = 0;
            this.imageIndex.y++;
        }
    }

    draw(){
        if(this.isReadyForDistruction) return;

        image(
            this.img,
            this.location.x - this.imgSize.x / 2,
            this.location.y - this.imgSize.y / 2,
            this.imgSize.x,
            this.imgSize.y,
            this.imageIndex.x * this.imgSize.x,
            this.imageIndex.y * this.imgSize.y,
            this.imgSize.x,
            this.imgSize.y
            );
    }
}