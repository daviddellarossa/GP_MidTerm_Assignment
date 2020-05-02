class BulletSystem {

  constructor(img){
    this.bullets = [];


  }

  run(){
      this.move();
      this.draw();
      this.edges();
  }

  fire(x, y){
    //this.bullets.push(createVector(x,y));
    this.bullets.push(new Bullet(createVector(x,y)));
  }

  //draws all bullets
  draw(){
    fill(255);
    for (var i=0; i<this.bullets.length; i++){
      this.bullets[i].draw();
      //ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam);
    }
  }

  //updates the location of all bullets
  move(){
    for (var i=0; i<this.bullets.length; i++){
      //this.bullets[i].y += this.velocity.y;
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

  destroy(bullet){
    for(let counter = this.bullets.length - 1; counter >= 0; counter--){
      if(this.bullets[counter] === bullet){
        this.bullets.splice(counter, 1);
        return;
      }
    }
  }
}

class Bullet{
  constructor(location) {
    this.location = location;
    this.animationIdx = 0;
    this.img = bulletImg;
    this.size = createVector(26, 34);
    this.velocity = new createVector(0, -5);
  }

  move(){
    this.location.y += this.velocity.y;
  }

  draw(){
    let idx = Math.floor(frameCount/2)%4;
    image(this.img[idx],this.location.x - this.size.x/2, this.location.y - this.size.y/2, this.size.x, this.size.y);
  }
}