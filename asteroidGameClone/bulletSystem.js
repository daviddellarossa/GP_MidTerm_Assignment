class BulletSystem {
  /** Construct an array of bullets */
  constructor(){
    this.bullets = [];
  }

  run(){
      this.move();
      this.draw();
      this.edges();
  }

  /** Fire a new bullet */
  fire(x, y){
    this.bullets.push(new Bullet(createVector(x,y)));
  }

  //draws all bullets
  draw(){
    fill(255);
    for (var i=0; i<this.bullets.length; i++){
      this.bullets[i].draw();
    }
  }

  //updates the location of all bullets
  move(){
    for (var i=0; i<this.bullets.length; i++){
      this.bullets[i].move();
    }
  }

  //check if bullets leave the screen and remove them from the array
  edges(){
      // YOUR CODE HERE (3 lines approx)
    for(let counter = this.bullets.length - 1; counter >= 0; counter--){
       if(this.bullets[counter].location.y < 0)
          this.bullets.splice(counter, 1);
    }
  }

  /** Destroy a bullet */
  destroy(bullet){
    for(let counter = this.bullets.length - 1; counter >= 0; counter--){
      if(this.bullets[counter] === bullet){
        this.bullets.splice(counter, 1);
        return;
      }
    }
  }
}

