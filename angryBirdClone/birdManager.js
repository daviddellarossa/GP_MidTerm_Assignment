/**
 * _BirdManager is a Factory of Bird(s).
 * It is used as a Singleton
 */
class _BirdManager{
    /** Collection of birds. This DOES NOT include the slingshot's bird */
    birds = [];
    /** Create an instance of _BirdManager */
    constructor() {
    }

    /**
     * Create an instance of bird
     * @param x - x-location of the bird
     * @param y - y-location of the bird
     * @param addToCollection - Control whether to add the new bird to the bird collection. True by default.
     * @param addToWorld - Control whether to add the newly created object to the world. True by default.
     * @returns {Bird} - New instance of a bird
     */
    createBird(x, y, addToCollection = true, addToWorld = true){
        let bird = new Bird(
            createVector(x, y),
            {width: 50, height: 50},
            0,
            TextureHandler.birdsImg[Math.floor(random(TextureHandler.birdsImg.length))]
        );
        if(addToCollection){
            this.birds.push(bird);
        }
        if(addToWorld){
            World.add(engine.world, [bird.body]);
        }
        return bird;
    }

    /** Draw the bird */
    draw() {
        for (let i = this.birds.length - 1; i >= 0; i--) {
            this.birds[i].draw();

            //if the current bird is out of the boundaries of the screen, destroy it
            if (
                this.birds[i].body.position.x + this.birds[i].size.width < 0
                || this.birds[i].body.position.x - this.birds[i].size.width > width
            ) {
                this.birds.splice(i, 1);
            }
        }
    }

    /**
     * Destroy a bird
     * @param bird - Bird to destroy
     * @param removeFromCollection - Control whether to remove the bird from the bird collection. True by default.
     * @param removeFromWorld - Control whether to remove the bird from the world. True by default.
     */
    destroyBird(bird, removeFromCollection = true, removeFromWorld = true){
        if(removeFromCollection){
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

/** Instance of BirdManager used as a Singleton */
var BirdManager = new _BirdManager();