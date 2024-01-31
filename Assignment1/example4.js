function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

}

function draw() {
  colorMode(RGB);
  background('darkblue');

  stroke('white');
  strokeWeight(5);
  fill('red');
  circle(200, 200, 200);

  stroke('white');
  strokeWeight(5);
  fill('green');
  //TR
  arc(215, 175, 155, 145, -100, 0, PIE);
  //TL
  arc(185, 175, 155, 145, 180, -80, PIE);
  //B
  arc(200, 225, 160, 150, 45, -225, PIE);
  //L
  arc(180, 200, 160, 180, 115, -165, PIE);
  //R
  arc(220, 200, 160, 180, -20, 65, PIE);
}
