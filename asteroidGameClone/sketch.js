//All the graphic assets are released under the Creative Commons licence
//https://opengameart.org/content/space-ship-construction-kit
//https://opengameart.org/content/space-game-art-pack-extended
//https://opengameart.org/content/2d-explosion-animations-2-frame-by-frame
//https://evolutionnews.org/wp-content/uploads/2020/04/Rare-Earth-2.jpg

//Author: David Della Rossa

var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var explosionSystem;

var spaceshipImg = [];
var bulletImg = [];
var asteroidImg = [];
var explosionImg = []
var earthImg;
var isGameOver;

var score;
var difficulty; //used to calculate acceleration and spawning of asteroids. Increased in increaseScore function.

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

  explosionImg[0] = loadImage('assets/explosions/explosion_0.png');
  explosionImg[1] = loadImage('assets/explosions/explosion_1.png');
  explosionImg[2] = loadImage('assets/explosions/explosion_2.png');
  explosionImg[3] = loadImage('assets/explosions/explosion_3.png');

  earthImg = loadImage('assets/planet/earth.png');

}


//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  isGameOver = false;
  score = 0;
  difficulty = 1; //initial difficulty. This gets increased automatically as the game progresses.

  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();
  explosionSystem = new ExplosionSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*6, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*6, width*3);

}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();
  drawEarth();
  explosionSystem.run();

  if(!isGameOver){
    spaceship.run();
    asteroids.run();
    asteroids.calcGravity(earthLoc);
    checkCollisions(spaceship, asteroids); // function that checks collision between various elements
  }else{
    gameOver();
  }
  drawScore();
}

function increaseScore(){
  score++;
  //every 20 points, increase the difficulty by a factor of 1.2
  if(score % 20 === 0)
    difficulty *= 1.2; // increase difficulty
}

function drawScore(){
  fill(0, 0, 255, 50);
  rect(width - 220, 0, width - 20, 48);
  fill(255);
  textSize(20);
  textAlign(LEFT);
  text(`Score: ${score}`, width - 200, 32);
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  image(earthImg,0, height * 0.84, width, height * 0.2);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){
    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
  for(let asteroid of asteroids.asteroids){
    if (isInside(spaceship.location, spaceship.size.x, asteroid.location, asteroid.size.y)) {
      asteroids.destroy(asteroid);
      spaceship.isVisible = false;
      explosionSystem.spawn(spaceship.location);
      isGameOver = true;
      return;
    }
  }

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
  for(let asteroid of asteroids.asteroids){
    if(isInside(earthLoc, earthSize.y, asteroid.location, asteroid.size.y)) {
      spaceship.isVisible = false;
      explosionSystem.spawn(asteroid.location);
      isGameOver = true;
      return;
    }
  }

    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(earthLoc, earthSize.y, spaceship.location, spaceship.size.x)) {
      spaceship.isVisible = false;
      explosionSystem.spawn(spaceship.location);
      isGameOver = true;
      return;
    }

    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(atmosphereLoc, atmosphereSize.y, spaceship.location, spaceship.size.x))
      spaceship.setNearEarth();

    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
  for(let bullet of spaceship.bulletSys.bullets){
    for(let asteroid of asteroids.asteroids){
      if(isInside(bullet.location, bullet.size.x, asteroid.location, asteroid.size.y)){
        increaseScore();
        asteroids.destroy(asteroid);
        spaceship.bulletSys.destroy(bullet);
        explosionSystem.spawn(asteroid.location);
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
  if(isGameOver) {
    startGame();
    return;
  }
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
  text("GAME OVER", width/2, height * 0.4)
  textSize(40);
  text("Press a key to continue", width/2, height * 0.5);
  //noLoop(); // I need the loop to carry on to manage explosions' trail when game is over.
}

//////////////////////////////////////////////////
/** Initialize the game */
function startGame(){
  isGameOver = false;
  score = 0;
  difficulty = 1;
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();
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
