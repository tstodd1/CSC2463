let bgImage;
let bugImages = [];
let imageURL = "https://tstodd1.github.io/CSC2463/Assets/"
let testBug, walking, squish;

function preload() {
  // bugMove = loadImage("Assets/BUG-1.png.png")
  //  BugMove2 = loadImage("Assets/BUG-2.png.png")
  //  Bug_Squish = loadImage("Assets/BUG-3.png.png")
  bgImage = loadImage(imageURL + "floor.jpg");
  
    for (let i = 0; i < 3; i++) {
      //bugImages[i] = loadImage("Assets/bugMove.png" + "Assets/bugMove2.png" + "Assets/bugDeath.png");
      //bugImages[i] = loadImage("https://tstodd1.github.io/CSC2463/Assets/bugMove.png");
      bugImages[i] = loadImage(imageURL + "bugSprite_" + (i+1) + ".png");

    }
  }

function setup() {
  createCanvas(800, 800);

  testBug = createSprite(width / 2, height / 2, 32, 32);
  testBug.addAnimation("walking", bugImages[0], bugImages[1], bugImages[2])  

}

function draw() {
  background(bgImage);
  drawSprites();
}