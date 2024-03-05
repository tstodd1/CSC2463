let bugImages = [];
let testBug, walking, squish;

function preload() {
  // bugMove = loadImage("Assets/BUG-1.png.png")
  //  BugMove2 = loadImage("Assets/BUG-2.png.png")
  //  Bug_Squish = loadImage("Assets/BUG-3.png.png")
  
    for (let i = 0; i < 3; i++) {
      bugImages[i] = loadImage("Assets/bugMove.png" + "Assets/bugMove2.png" + "Assets/bugDeath.png");
    }
  }

function setup() {
  createCanvas(800, 800);

}

function draw() {
  background(220);
  drawSprites();
}