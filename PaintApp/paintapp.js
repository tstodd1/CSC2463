let currentColor;

function setup() {
  createCanvas(1920, 1080);
  background(255),
  currentColor = 0;

}


function draw() {

  //palette 
  noStroke();
  fill('red');
  square(0, 0, 50);
  fill('orange');
  square(0, 50, 50);
  fill('yellow');
  square(0, 100, 50);
  fill('lime');
  square(0, 150, 50);
  fill('cyan');
  square(0, 200, 50);
  fill('blue');
  square(0, 250, 50);
  fill('magenta');
  square(0, 300, 50);
  fill('saddlebrown');
  square(0, 350, 50);
  fill('white');
  square(0, 400, 50);
  fill('black');
  square(0, 450, 50);


  //drawing picker

  if(mouseIsPressed) {
    if(mouseX > 51 || mouseY > 500) {
      drawing();
    }
    if(mouseX < 51 && mouseY < 51) {
      currentColor = 'red';
    }
    if(mouseX < 51 && mouseY < 101 && mouseY > 51) {
      currentColor = 'orange';
    }
    if(mouseX < 51 && mouseY < 151 && mouseY > 101) {
      currentColor = 'yellow';
    }
    if(mouseX < 51 && mouseY < 201 && mouseY > 151) {
      currentColor = 'lime';
    }
    if(mouseX < 51 && mouseY < 251 && mouseY > 201) {
      currentColor = 'cyan';
    }
    if(mouseX < 51 && mouseY < 301 && mouseY > 251) {
      currentColor = 'blue';
    }
    if(mouseX < 51 && mouseY < 351 && mouseY > 301) {
      currentColor = 'magenta';
    }
    if(mouseX < 51 && mouseY < 401 && mouseY > 351) {
      currentColor = 'saddlebrown';
    }
    if(mouseX < 51 && mouseY < 451 && mouseY > 401) {
      currentColor = 'white';
    }
    if(mouseX < 51 && mouseY < 501 && mouseY > 451) {
      currentColor = 'black';
    }
  }
}

function drawing() {

  stroke(currentColor);
  strokeWeight(5);
  line(pmouseX, pmouseY, mouseX, mouseY);
}


