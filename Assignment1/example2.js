function setup() {
    createCanvas(400, 400);
  
  }
  
  function draw() {
    colorMode(RGB);
    background('white');
  
    //blue circle
    noStroke();
    fill(0, 0, 255, 75);
    ellipse(150,250,150,150);
  
    //green circle
    noStroke();
    fill(0, 255, 0, 75);
    alpha(50);
    ellipse(250,250,150,150);
  
    //red circle
    noStroke();
    fill(255, 0, 0, 75);
    alpha(50);
    ellipse(200,150,150,150);
    
    
  }
  