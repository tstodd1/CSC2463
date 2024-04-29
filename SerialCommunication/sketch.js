let port;
let sensorValue;
let connectButton;
let ledButton;

bool = false;

function setup() {
  port = createSerial();
  createCanvas(400, 400);

  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);

  if (port.opened) {
  ledButton = createButton("LED Test")
  ledButton.mousePressed(() => port.write("ON"));
  } else {
    port.write("OFF");
  }
}


function draw() {
  background(225);
  let str = port.readUntil("\n");
  text(str,100,200);

  // if (port.opened()) {
  //   let pixel = get()
  //   let message = 

  if (str == 1) {
    fill("green");
  } else {
    fill(255);
  }
  circle(200, 200, 50);

}

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}

function LED() {

}