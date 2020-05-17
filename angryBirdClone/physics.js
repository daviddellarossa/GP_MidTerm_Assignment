function drawBackground(){
  background(135, 206, 235);

  image(
      TextureHandler.background,
      0,
      74,
      1000,
      506
  );
}

////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  noStroke();
  fill(19, 64, 18);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  propeller = new Propeller(
      createVector(150, 480),
      {width: 200, height: 24},
      angle,
      TextureHandler.propellerImg,
  );
  World.add(engine.world, [propeller.body]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  // your code here
  angle += angleSpeed;
  Body.setAngle(propeller.body, angle);
  Body.setAngularVelocity(propeller.body, angleSpeed);

  propeller.draw();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  BirdManager.createBird(mouseX, mouseY);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  BirdManager.draw();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
  crateManager = new CrateManager();
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  //your code here
  crateManager.draw();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
  slingshotManager = new SlingshotManager(createVector(200, 200));
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
    slingshotManager.draw();
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
