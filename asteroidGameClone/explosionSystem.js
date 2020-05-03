class ExplosionSystem{
    constructor() {
        this.explosions = [];
    }

    run(){
        this.draw();
        this.calculateNextFrame();
    }

    spawn(location){
        this.explosions.push(
            new Explosion(location)
        )
    }

    calculateNextFrame(){
        for(let explosion of this.explosions){
            explosion.calculateNextFrame();
        }
    }

    draw(){
        for(let explosion of this.explosions){
            explosion.draw();
        }
    }

    destroy(explosion){
        for(let counter = this.explosions.length - 1; counter >= 0; counter--){
            if(this.explosions[counter] === explosion){
                this.explosions.splice(counter, 1);
                return;
            }
        }
    }
}