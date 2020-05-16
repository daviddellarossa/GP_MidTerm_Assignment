class _BirdManager{
    birds = [];
    constructor() {
    }

    createBird(x, y, addToBirdCollection = true, addToWorld = true){
        let bird = new Bird(
            createVector(x, y),
            {width: 50, height: 50},
            0,
            TextureHandler.birdsImg[Math.floor(random(TextureHandler.birdsImg.length))]
        );
        if(addToBirdCollection){
            this.birds.push(bird);
        }
        if(addToWorld){
            World.add(engine.world, [bird.body]);
        }
        return bird;
    }

    draw(){
        for(let bird of this.birds){
            bird.draw();
        }
    }

    destroyBird(bird, removeFromBirdCollection = true, removeFromWorld = true){
        if(removeFromBirdCollection){
            for(let i = 0; i < this.birds.length; i++){
                if(bird.body.id === this.birds[i].body.id){
                    this.birds.splice(i, 1);
                    return;
                }
            }
        }
        if(removeFromWorld){
            World.remove(engine.world, bird.body);
        }
    }
}

var BirdManager = new _BirdManager();