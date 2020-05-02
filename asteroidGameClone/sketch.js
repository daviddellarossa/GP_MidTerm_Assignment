var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

var spaceshipImg = [];
var bulletImg = [];
var asteroidImg = [];

function preload(){
  spaceshipImg[0] = loadImage('assets/spaceship/Flea_spaceship_0.png');
  spaceshipImg[1] = loadImage('assets/spaceship/Flea_spaceship_1.png');
  spaceshipImg[2] = loadImage('assets/spaceship/Flea_spaceship_2.png');
  spaceshipImg[3] = loadImage('assets/spaceship/Flea_spaceship_3.png');

  bulletImg[0] = loadImage('assets/bullet/bullet_0.png');
  bulletImg[1] = loadImage('assets/bullet/bullet_1.png');
  bulletImg[2] = loadImage('assets/bullet/bullet_2.png');
  bulletImg[3] = loadImage('assets/bullet/bullet_3.png');

  asteroidImg[0] = loadImage('assets/asteroids/asteroid_0.png');
  asteroidImg[1] = loadImage('assets/asteroids/asteroid_1.png');
  asteroidImg[2] = loadImage('assets/asteroids/asteroid_2.png');
  asteroidImg[3] = loadImage('assets/asteroids/asteroid_3.png');
  asteroidImg[4] = loadImage('assets/asteroids/asteroid_4.png');
  asteroidImg[5] = loadImage('assets/asteroids/asteroid_5.png');
  asteroidImg[6] = loadImage('assets/asteroids/asteroid_6.png');
  asteroidImg[7] = loadImage('assets/asteroids/asteroid_7.png');
  asteroidImg[8] = loadImage('assets/asteroids/asteroid_8.png');

}


//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);

  // for(let img of spaceshipImg)
  //   img.loadPixels();

  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();
  asteroids.calcGravity(earthLoc);
  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
  for(let asteroid of asteroids.asteroids){
    if (isInside(spaceship.location, spaceship.size.x, asteroid.location, asteroid.size.y)) {
      gameOver();
      return;
    }
  }
    // for(let counter = 0; counter < asteroids.asteroids.length; counter++){
    //   if (isInside(spaceship.location, spaceship.size.x, asteroids.locations[counter], asteroids.diams[counter])) {
    //     gameOver();
    //     return;
    //   }
    // }

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
  for(let asteroid of asteroids.asteroids){
    if(isInside(earthLoc, earthSize.x, asteroid.location, asteroid.size.y)) {
      gameOver();
      return;
    }
  }


  // for(let counter = 0; counter < asteroids.locations.length; counter++){
  //   if(isInside(earthLoc, earthSize.x, asteroids.locations[counter], asteroids.diams[counter])) {
  //     gameOver();
  //     return;
  //   }
  // }
    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(earthLoc, earthSize.x, spaceship.location, spaceship.size.x)) {
      gameOver();
      return;
    }

    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(atmosphereLoc, atmosphereSize.x, spaceship.location, spaceship.size.x))
      spaceship.setNearEarth();

    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)

  for(let bullet of spaceship.bulletSys.bullets){
    for(let asteroid of asteroids.asteroids){
      if(isInside(bullet.location, bullet.size.x, asteroid.location, asteroid.size.y)){
        asteroids.destroy(asteroid);
        spaceship.bulletSys.destroy(bullet);
      }
    }
  }

    // for(let bullet of spaceship.bulletSys.bullets){
    //   for(let counter = 0; counter < asteroids.locations.length; counter ++){
    //     if(isInside(bullet.location, bullet.size.x, asteroids.locations[counter], asteroids.diams[counter])){
    //       asteroids.destroy(counter);
    //       spaceship.bulletSys.destroy(bullet);
    //     }
    //   }
    // }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
  return dist(locA.x, locA.y, locB.x, locB.y) < (sizeA + sizeB) / 2;
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
