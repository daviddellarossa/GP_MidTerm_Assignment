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
  // var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
  //     restitution: 0.95 });
  // Matter.Body.setMass(bird, bird.mass*10);

  var bird = BirdManager.createBird(mouseX, mouseY);
  World.add(engine.world, [bird]);
  // birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  // push();
  //your code here
  // fill(255, 0,0);
  // for(let i = 0; i < birds.length; i++){
  //   if(isOffScreen(birds[i])){
  //     World.remove(engine.world, birds[i]);
  //     birds.splice(i, 1);
  //     i--;
  //     continue;
  //   }
  //   drawVertices(birds[i].vertices);
  // }

  // pop();
  BirdManager.draw();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
  crateManager = new CrateManager();
  World.add(engine.world, [crateManager.composite]);
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
//   slingshotBird = Bodies.circle(200, 200, 20, {friction:0, restitution:0.95});
//   Body.setMass(slingshotBird, 10*slingshotBird.mass);

  slingshotBird = BirdManager.createBird(200, 200);
  World.add(engine.world, [slingshotBird]);

  slingshotConstraint = Constraint.create({
  pointA: {x:200, y:200},
    bodyB: slingshotBird,
    stiffness: 0.01,
    damping: 0.0001
  });
  World.add(engine.world, [slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  fill(255, 150, 0);
  // drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint)


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
