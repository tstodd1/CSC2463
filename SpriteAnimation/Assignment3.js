let spriteSheet;

let walkingAnimation;
let walkingAnimation2;

//load sprite
function preload() {
  spriteSheet = loadImage("Assets/ninja.png")
  spriteSheet2 = loadImage("Assets/meat.png")
  spriteSheet3 = loadImage("Assets/robot.png")
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  walkingAnimation = new WalkingAnimation(spriteSheet,80,80,200,200,9);
  walkingAnimation2 = new WalkingAnimation(spriteSheet2,80,80,200,100,9);
  walkingAnimation3 = new WalkingAnimation(spriteSheet3,80,80,200,300,9);
}

//animation
function draw() {
  background(220);

  walkingAnimation.draw();
  walkingAnimation2.draw();
  walkingAnimation3.draw();
}

function keyPressed() {
  walkingAnimation.keyPressed();
  walkingAnimation2.keyPressed();
  walkingAnimation3.keyPressed();
}

//stopping
function keyReleased() {
  walkingAnimation.keyReleased();
  walkingAnimation2.keyReleased();
  walkingAnimation3.keyReleased();
}

class WalkingAnimation {
  constructor(spriteSheet, sw, sh, dx, dy, animationLength) {
    this.spriteSheet = spriteSheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0;
    this.xDirection = 1;
  }

  draw() {
  //  if (this.moving != 0) {
  //    this.u = this.currentFrame % this.animationLength;
  //  } else {
  //    this.u = 0;
  //  }

    this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : 0;
    push();
    translate(this.dx, this.dy);
    scale(this.xDirection,1);
    image(this.spriteSheet, 0, 0, this.sw, this.sh, this.u*this.sw, this.v*this.sh, this.sw, this.sh);
    pop();
      
    if (frameCount % 3 == 0) {
      this.currentFrame++;
    }

    this.dx += this.moving;

  }

  keyPressed() {
    if (keyCode === RIGHT_ARROW) {
      this.moving = 3;
      this.xDirection = 1;
      this.currentFrame = 1;
    } else if (keyCode === LEFT_ARROW) {
      this.moving = -3;
      this.xDirection = -1;
      this.currentFrame = 1;
    }
  }

  keyReleased() {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
    this.moving = 0;
    }
  }
}