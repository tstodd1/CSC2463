// ctrl

let port;
let joyX = 0, joyY = 0, sw = 0;
let connectButton;
let circleX, circleY;
let speed = 5;

// gfx

let currentColor = "black";
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
  port = createSerial();
  createCanvas(1920, 1080);
  
  circleX = width / 2;
  circleY = height / 2;

  background(255),
  currentColor = 0;

  image(deleteBomb, -7, 500, 70, 70);
  text("delete?", 10, 570);

  //port connect
  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);
  connectButton.position(10, 600);
}

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}

//joystick drawing
function joystickClick() {
  // speed = 2;

    if(circleX > 51 || circleY > 550) {
    if (sw == 1) {
      noise.start();
        }
    }
    if(circleX < 51 && circleY < 501) {
        if (sw == 1) {
          fmSynth.triggerAttackRelease("G5", "32n");
        }
    }
    if(circleX < 51 && circleY < 551 && circleY > 501){
      fmSynth.triggerAttackRelease("C4", "16n");
      noise2.start();
    }

    if(sw == 1) {
      if(circleX > 51 || circleY > 500) {
          drawing();
      }
      if(circleX < 51 && circleY < 51) {
          currentColor = 'red';
      }
      if(circleX < 51 && circleY < 101 && circleY > 51) {
          currentColor = 'orange';
      }
      if(circleX < 51 && circleY < 151 && circleY > 101) {
          currentColor = 'yellow';
      }
      if(circleX < 51 && circleY < 201 && circleY > 151) {
          currentColor = 'lime';
      }
      if(circleX < 51 && circleY < 251 && circleY > 201) {
          currentColor = 'cyan';
      }
      if(circleX < 51 && circleY < 301 && circleY > 251) {
          currentColor = 'blue';
      }
      if(circleX < 51 && circleY < 351 && circleY > 301) {
          currentColor = 'magenta';
      }
      if(circleX < 51 && circleY < 401 && circleY > 351) {
          currentColor = 'saddlebrown';
      }
      if(circleX < 51 && circleY < 451 && circleY > 401) {
          currentColor = 'white';
      }
      if(circleX < 51 && circleY < 501 && circleY > 451) {
          currentColor = 'black';
      }
      //delete
      if(circleX < 51 && circleY < 551 && circleY > 501) {
          if (sw == 1) {
              background(255);
          } else if (sw == 0) {
              background (255);
          }
       }
    }
  }

  function joystickReleased() {
    // speed = 5;
    noise.stop();
    noise2.stop();
  }

function joystick() {
  if (sw == 0) {
  background(255);
  }
  //joystick
  let str = port.readUntil("\n");
  let values = str.split(",");
  if (values.length > 2) {
    joyX = parseFloat(values[0]);
    joyY = parseFloat(values[1]);
    sw = parseFloat(values[2]);

    console.log("JoyX: ", joyX, " JoyY: ", joyY, "SW:", sw);
    // circleX += joyX * speed; 
    // circleY += joyY * speed; 

    if (joyX > 0) {
      circleX += speed;
    } else if (joyX < 0) {
      circleX -= speed;
    }

    if (joyY > 0) {
      circleY += speed;
    } else if (joyY < 0) {
      circleY -= speed;
    }
  }

noStroke();
fill(currentColor);
circle(circleX, circleY, 5);

}

function draw() {
  joystick();
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
  // if(mouseIsPressed) {
  //   if(mouseX > 51 || mouseY > 500) {
  //     drawing();
  //   }
  //   if(mouseX < 51 && mouseY < 51) {
  //     currentColor = 'red';
  //   }
  //   if(mouseX < 51 && mouseY < 101 && mouseY > 51) {
  //     currentColor = 'orange';
  //   }
  //   if(mouseX < 51 && mouseY < 151 && mouseY > 101) {
  //     currentColor = 'yellow';
  //   }
  //   if(mouseX < 51 && mouseY < 201 && mouseY > 151) {
  //     currentColor = 'lime';
  //   }
  //   if(mouseX < 51 && mouseY < 251 && mouseY > 201) {
  //     currentColor = 'cyan';
  //   }
  //   if(mouseX < 51 && mouseY < 301 && mouseY > 251) {
  //     currentColor = 'blue';
  //   }
  //   if(mouseX < 51 && mouseY < 351 && mouseY > 301) {
  //     currentColor = 'magenta';
  //   }
  //   if(mouseX < 51 && mouseY < 401 && mouseY > 351) {
  //     currentColor = 'saddlebrown';
  //   }
  //   if(mouseX < 51 && mouseY < 451 && mouseY > 401) {
  //     currentColor = 'white';
  //   }
  //   if(mouseX < 51 && mouseY < 501 && mouseY > 451) {
  //     currentColor = 'black';
  //   }
  //   //delete
  //   if(mouseX < 51 && mouseY < 551 && mouseY > 501) {
  //       if (mouseIsPressed === true) {
  //           background(255);
  //         } else if (mouseIsPressed === false) {
  //           background (255);
  //         }
  //     }
  // }


  
if (sw == 1) {
  speed = 2;
  joystickClick();
 } else {
  speed = 5;
  joystickReleased();
 }
 
  image(deleteBomb, -7, 500, 70, 70);
  noStroke();
  text("delete?", 10, 570);
}
//
function drawing() {
  stroke(currentColor);
  strokeWeight(3);
  // line(pmouseX, pmouseY, mouseX, mouseY);
  line(circleX, circleY);

}



