let bgImage;
let bugImages = [];
let bugSprites;
let imageURL = "https://tstodd1.github.io/CSC2463/Assets/";
let testBug;
let walk, death;

let score;

function preload() {
  // bugMove = loadImage("Assets/BUG-1.png.png")
  //  BugMove2 = loadImage("Assets/BUG-2.png.png")
  //  Bug_Squish = loadImage("Assets/BUG-3.png.png")
  bgImage = loadImage(imageURL + "floor.jpg");
  bugSprite = loadImage(imageURL + "bugSheet.png")
  
    for (let i = 0; i < 3; i++) {
      //bugImages[i] = loadImage("Assets/bugMove.png" + "Assets/bugMove2.png" + "Assets/bugDeath.png");
      //bugImages[i] = loadImage("https://tstodd1.github.io/CSC2463/Assets/bugMove.png");
      //bugImages[i] = loadImage(imageURL + "bugSprite_" + (i+1) + ".png");
    }
  }

function setup() {
  createCanvas(800, 800);
  
  //testBug = createSprite(400, 400, 320, 320);
  //walk = testBug.addAnimation("walk", bugImages[0], bugImages[1], bugImages[0],);
  //walk.frameDelay = 8;
  testBug = new Sprite();
  testBug.img = (imageURL + "bugSprite_1.png")
  walk = testBug.addAni('walk', imageURL + "bugSprite_1.png", 2);
  //testBug.addAni('death', imageURL + "bugSprite_3.png", 1);
  //testBug.addAni('death', imageURL + "bugSprite_3.png", 1);
  //testBug = new SpriteAnimation(imageURL + "bugSprite_1.png");
  //walk = loadAni(imageURL + "bugSprite_1.png", 2);
  //walk.frameDelay = 8;

  //walk.onMousePressed = function() {
  //  walk = loadAni(imageURL + "bugSprite_3", 1);

}

function draw() {
  clear();
  background(bgImage);

  if (testBug.mouse.pressing()) {
    testBug.changeAni('death', imageURL + "bugDeath.png", 1);
    this.life = 200;
    score++;
  }


}