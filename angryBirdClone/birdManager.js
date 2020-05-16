class _BirdManager{
    birds = [];
    constructor() {
    }

    createBird(x, y){
        let bird = new Bird(
            createVector(x, y),
            {width: 50, height: 50},
            0,
            TextureHandler.birdsImg[Math.floor(random(TextureHandler.birdsImg.length))]
        );
        this.birds.push(bird);
        return bird;
    }

    draw(){
        for(let bird of this.birds){
            bird.draw();
        }
    }

    destroyBird(bird){
        for(let i = 0; i < this.birds.length; i++){
            if(bird.body.id === this.birds[i].body.id){
                this.birds.splice(i, 1);
                return;
            }
        }
    }
}

var BirdManager = new _BirdManager();