var ball;
var database, position;

function setup() {
  createCanvas(500, 500);
  ball = createSprite(250, 250, 10, 10);
  ball.shapeColor = "red";
  database = firebase.database();
  var locofnodes = database.ref("Ball/position");
  locofnodes.on("value", readData, function () {
    console.error("Error");
  });
}

function draw() {
  background("white");
  if (keyDown(LEFT_ARROW)) {
    writeData(-1, 0);
  } else if (keyDown(RIGHT_ARROW)) {
    writeData(1, 0);
  } else if (keyDown(UP_ARROW)) {
    writeData(0, -1);
  } else if (keyDown(DOWN_ARROW)) {
    writeData(0, +1);
  }
  drawSprites();
}

function writeData(x, y) {
  database.ref("Ball/position").set({
    x: position.x + x,
    y: position.y + y,
  });
}

function readData(data) {
  position = data.val();
  ball.x = position.x;
  ball.y = position.y;
}
