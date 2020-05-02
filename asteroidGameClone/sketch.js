var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
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
    for(let counter = 0; counter < asteroids.locations.length; counter++){
      if (isInside(spaceship.location, spaceship.size, asteroids.locations[counter], asteroids.diams[counter])) {
        gameOver();
        return;
      }

    }

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
  for(let counter = 0; counter < asteroids.locations.length; counter++){
    if(isInside(earthLoc, earthSize.x, asteroids.locations[counter], asteroids.diams[counter])) {
      gameOver();
      return;
    }
  }
    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(earthLoc, earthSize.x, spaceship.location, spaceship.size)) {
      gameOver();
      return;
    }

    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(atmosphereLoc, atmosphereSize.x, spaceship.location, spaceship.size))
      spaceship.setNearEarth();

    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    for(let bullet of spaceship.bulletSys.bullets){
      for(let counter = 0; counter < asteroids.locations.length; counter ++){
        if(isInside(bullet, spaceship.bulletSys.diam, asteroids.locations[counter], asteroids.diams[counter])){
          asteroids.destroy(counter);
        }
      }
    }
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
