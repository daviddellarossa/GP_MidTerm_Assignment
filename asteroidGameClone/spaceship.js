class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = new createVector(61, 72);
    this.img = spaceshipImg;
    this.isVisible = true;
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
      if(!this.isVisible) return;
      let idx = Math.floor(frameCount/2)%4;
      image(this.img[idx],this.location.x - this.size.x/2, this.location.y - this.size.y/2, this.size.x, this.size.y);

  }

  move(){
      // YOUR CODE HERE (4 lines)
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxVelocity);
      this.location.add(this.velocity);
      this.acceleration.mult(0);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
      }
      if (keyIsDown(RIGHT_ARROW)){
      // YOUR CODE HERE (1 line)
          this.applyForce(createVector(0.1, 0));
      }
      if (keyIsDown(UP_ARROW)){
      // YOUR CODE HERE (1 line)
          this.applyForce(createVector(0, -0.1));
      }
      if (keyIsDown(DOWN_ARROW)){
      // YOUR CODE HERE (1 line)
          this.applyForce(createVector(0, 0.1));
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y - this.size.y/2);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
      let gravity = new createVector(0, 0.05);
      this.applyForce(gravity);
      let friction = p5.Vector.div(this.velocity,-30);
      this.applyForce(friction);
  }
}
