// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

//Background downloaded from here: https://www.cleanpng.com/png-cartoon-landscape-drawing-vector-golden-autumn-359882/download-png.html - free for personal use
//Assets downloaded from //https://imgbin.com - free for personal use

//Author: David Della Rossa

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
var Composites = Matter.Composites;
var Composite = Matter.Composite;

var engine;
var propeller;
var boxes = [];
var colors = [];
var ground;
var angle=0;
var angleSpeed=0;
var canvas;
var crateManager;
var slingshotManager;

////////////////////////////////////////////////////////////

function preload(){
  TextureHandler.init();
}


function setup() {
  canvas = createCanvas(1000, 600);

  engine = Engine.create();  // create an engine

  setupGround();

  setupPropeller();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();
}
////////////////////////////////////////////////////////////
function draw() {

  drawBackground();

  Engine.update(engine);

  drawGround();

  drawPropeller();

  drawTower();

  drawSlingshot();

  drawBirds();

  circle(300, 580, 2);
}
////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed(){
  if (keyCode === LEFT_ARROW){
    //your code here
    angleSpeed += 0.01;
  }
  else if (keyCode === RIGHT_ARROW){
    //your code here
    angleSpeed -= 0.01;
  }
  else if(keyIsDown(66)){ //'b' pressed
    setupBird()
  }
}
////////////////////////////////////////////////////////////
function keyTyped(){
  //if 'r' reset the slingshot
  if (key==='r'){
    slingshotManager.reset();
  }
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
  setTimeout(() => {
    slingshotManager.releaseConstraint();
  }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
  var pos = body.position;
  return (pos.y > height || pos.x<0 || pos.x>width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
////////////////////////////////////////////////////////////

