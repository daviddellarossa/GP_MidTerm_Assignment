class AsteroidSystem {

  //creates arrays to store each asteroid's data
  constructor(){
    this.asteroids = [];
    // this.locations = [];
    // this.velocities = [];
    // this.accelerations = [];
    // this.diams = [];
    //this.img = asteroidImg;
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
          Math.floor(random(10))
        )
      );

      // this.accelerations.push(new createVector(0,random(0.1,1)));
      // this.velocities.push(new createVector(0, 0));
      // this.locations.push(new createVector(random(width), 0));
      // this.diams.push(random(30,50));
    }
  }

  //moves all asteroids
  move(){
    for(let asteroid of this.asteroids){
      asteroid.move();
    }
    // for (var i=0; i<this.locations.length; i++){
    //   this.velocities[i].add(this.accelerations[i]);
    //   this.locations[i].add(this.velocities[i]);
    //   this.accelerations[i].mult(0);
    // }
  }

  applyForce(f){
    for(let asteroid of this.asteroids){
      asteroid.applyForce(f);
    }
    // for (var i=0; i<this.locations.length; i++){
    //   this.accelerations[i].add(f);
    // }
  }

  //draws all asteroids
  draw(){
    for(let asteroid of this.asteroids){
      asteroid.draw();
    }
    // noStroke();
    // fill(200);
    // for (var i=0; i<this.locations.length; i++){
    //   ellipse(this.locations[i].x, this.locations[i].y, this.diams[i], this.diams[i]);
    // }
  }

  //function that calculates effect of gravity on each asteroid and accelerates it
  calcGravity(centerOfMass){
    for(let asteroid of this.asteroids){

    }

    // for (var i=0; i<this.locations.length; i++){
    //   var gravity = p5.Vector.sub(centerOfMass, this.locations[i]);
    //   gravity.normalize();
    //   gravity.mult(.001);
    //   this.applyForce(gravity);
    // }
  }

  //destroys all data associated with each asteroid
  // destroy(index){
  //   this.locations.splice(index,1);
  //   this.velocities.splice(index,1);
  //   this.accelerations.splice(index,1);
  //   this.diams.splice(index,1);
  // }
  destroy(asteroid){
    for(let counter = this.asteroids.length - 1; counter >= 0; counter--){
      if(this.asteroids[counter] === asteroid){
        this.asteroids.splice(counter, 1);
        return;
      }
    }
  }
}

class Asteroid{
  constructor(location, velocity, acceleration, idx){
    console.log(`idx: ${idx}`);
    this.location = location;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.img = asteroidImg[idx];
    if(this.img == undefined)
      debugger;
    this.size = createVector(this.img.width, this.img.height);
  }

  move(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  draw(){
    image(this.img, this.location.x - this.size.x/2, this.location.y - this.size.y/2, this.size.x, this.size.y);
  }

  calcGravity(centerOfMass){
    var gravity = p5.Vector.sub(centerOfMass, this.location);
    gravity.normalize();
    gravity.mult(.001);
    this.applyForce(gravity);
  }
}