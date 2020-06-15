//Author: David Della Rossa

let stepSize = 20;
let grid;

function setup() {
  createCanvas(500, 500);
  grid = new Grid(createVector(0, 0), 25, 25, stepSize)
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  colorGrid();
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){
  // your code here
  grid.drawColorGrid();
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){
  // your code here
  grid.drawCompassGrid();
}
