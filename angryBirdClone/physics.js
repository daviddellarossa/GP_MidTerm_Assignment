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
  fill(128);
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
  //propeller = Bodies.rectangle(150, 480, 200,24, {isStatic:true, angle:angle});
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
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
  fill(255, 0,0);
  for(let i = 0; i < birds.length; i++){
    if(isOffScreen(birds[i])){
      World.remove(engine.world, birds[i]);
      birds.splice(i, 1);
      i--;
      continue;
    }
    drawVertices(birds[i].vertices);
  }

  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
  let composite = Composites.stack(
      600,
      100,
      3,
      6,
      0,
      0,
      (x, y) => {
        //return Bodies.rectangle(x, y, 80, 80);
        return CrateManager.createCrate(x, y)
      });
  World.add(engine.world, [composite]);

  // for(let box of Composite.allBodies(composite)){
  //   boxes.push(box);
  //   colors.push(color(random(0, 50), random(128, 255), random(0, 50)));
  // }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  //your code here
  CrateManager.draw();
  // push();
  // //your code here
  //
  // for(let i = 0; i < boxes.length; i++){
  //   fill(colors[i]);
  //
  //   drawVertices(boxes[i].vertices);
  // }
  // pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
  slingshotBird = Bodies.circle(200, 200, 20, {friction:0, restitution:0.95});
  Body.setMass(slingshotBird, 10*slingshotBird.mass);
  World.add(engine.world, [slingshotBird]);
  //birds.push(slingshotBird);

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
  drawVertices(slingshotBird.vertices);
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
