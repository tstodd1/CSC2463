let currentColor;
let deleteBomb;
let explosion;
let alpha = 255;

//audio

let sounds = new Tone.Player("assets/salsaBG.mp3").toDestination();
sounds.volume.value = 1;

let noise = new Tone.Noise("pink").toDestination();
noise.fadeOut.value = 1;
noise.volume.value = -15;

let noise2 = new Tone.Noise("brown");
noise2.fadeOut.value = 1;
noise2.volume.value = -5;

sounds.loop = true;
sounds.autostart = true;
// sounds.autostart(); for some reason this was muting all of my synths?

//synths

const fmSynth = new Tone.FMSynth().toDestination();
fmSynth.type = 'sine';
fmSynth.frequency.value = 700;
fmSynth.harmonicity.value = 0.2;
fmSynth.modulation.index = 3;
fmSynth.volume.value = 1;

//fx
noise2.connect(crusher);
const crusher = new Tone.BitCrusher(5).toDestination();

let test = new Tone.PolySynth(Tone.Synth).toDestination();

function preload() {
    deleteBomb = loadImage("assets/delete.jpg");
    explosion = loadImage("assets/explosion.jpg");
    sounds = loadSound("assets/salsaBG.mp3");
}

function setup() {
  createCanvas(1920, 1080);
  background(255),
  currentColor = 0;

  image(deleteBomb, -7, 500, 70, 70);
  text("delete?", 10, 570);
}

function mousePressed() {
    
    if(mouseX > 51 || mouseY > 550) {
    if (mouseIsPressed === true) {
      noise.start();
        }
    }
    if(mouseX < 51 && mouseY < 501) {
        if (mouseIsPressed === true) {
          fmSynth.triggerAttackRelease("G5", "32n");
        }
    }
    if(mouseX < 51 && mouseY < 551 && mouseY > 501){
      fmSynth.triggerAttackRelease("C4", "16n");
      noise2.start();
    }
  }
  function mouseReleased() {
    noise.stop();
    noise2.stop();
  }

  function keyPressed(){
    test.triggerAttack("C5");
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
    //delete
    if(mouseX < 51 && mouseY < 551 && mouseY > 501) {
        if (mouseIsPressed === true) {
            background(255);
          } else if (mouseIsPressed === false) {
            background (255);
          }
      }

    //images

    
    
  }

  image(deleteBomb, -7, 500, 70, 70);
  noStroke();
  text("delete?", 10, 570);

}

function drawing() {

  stroke(currentColor);
  strokeWeight(5);
  line(pmouseX, pmouseY, mouseX, mouseY);

}

// function mousePressed() {
//     if (mouseIsPressed === true) {
//       noise.start();
//       noise.volume.rampTo(0);
//       noise2.start();
//       noise2.volume.rampTo(0);
  
//       sub.triggerAttackRelease("C1", "8n");
//       sub.volume.rampTo(0);
  
//       filter.frequency.rampTo(0, 4000);
//     }
//   }
//   function mouseReleased() {
//     noise.stop();
//     noise2.stop();
//   }
  
// function draw() {
//     if (mouseIsPressed === true) {
//       background(explosion);  
//     } else if (mouseIsPressed === false) {
//       background(255);
//       text("Click to Explode!!!!!", 145, 200);
//     }
//   }

