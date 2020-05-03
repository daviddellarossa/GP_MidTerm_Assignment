class AsteroidSystem {

  //creates arrays to store each asteroid's data
  constructor(){
    this.asteroids = [];
  }

  run(){
      this.spawn();
      this.move();
      this.draw();
  }

  // spawns asteroid at random intervals
  spawn(){
    if (random(1)<0.01){
      this.asteroids.push(new Asteroid(
          createVector(random(width), 0),
          createVector(0, 0),
          createVector(0,random(0.1,1)),
          Math.floor(random(9))
        )
      );
    }
  }

  //moves all asteroids
  move(){
    for(let asteroid of this.asteroids){
      asteroid.move();
    }
  }

  applyForce(f){
    for(let asteroid of this.asteroids){
      asteroid.applyForce(f);
    }
  }

  //draws all asteroids
  draw(){
    for(let asteroid of this.asteroids){
      asteroid.draw();
    }
  }

  //function that calculates effect of gravity on each asteroid and accelerates it
  calcGravity(centerOfMass){
    for(let asteroid of this.asteroids){
      asteroid.calcGravity(centerOfMass);
    }
  }

  /** destroys the asteroid */
  destroy(asteroid){
    for(let counter = this.asteroids.length - 1; counter >= 0; counter--){
      if(this.asteroids[counter] === asteroid){
        this.asteroids.splice(counter, 1);
        return;
      }
    }
  }
}

