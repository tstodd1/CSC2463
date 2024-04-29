// ctrl

let port;
let joyX = 0, joyY = 0, sw = 0;
let connectButton;
let circleX, circleY;
let speed = 5;
let circleAlpha = 255;

// gfx

let currentColor = 'black';
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
const crusher = new Tone.BitCrusher(5).toDestination();
noise2.connect(crusher);

const test = new Tone.PolySynth(Tone.Synth).toDestination();

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

    background(255);
    currentColor = 'black';

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
        fmSynth.triggerAttackRelease("G5", "32n");
    } else {
        port.close();
    }
}

//joystick drawing
function joystickClick() {
    speed = 2;
    if (sw == 1) {
      if (circleX > 51 || circleY > 500) {
          drawing();
          noise.start();

          port.write("ON\n");
      } else if (sw == 0) {
        port.write("OFF\n");
      }
      if (circleX < 51 && circleY < 51) {
          currentColor = color(255, 0, 0); // Red 
          fmSynth.triggerAttackRelease("G5", "32n");
      }
      if (circleX < 51 && circleY < 101 && circleY > 51) {
          currentColor = color(255, 165, 0); // Orange 
          fmSynth.triggerAttackRelease("A5", "32n");
      }
      if (circleX < 51 && circleY < 151 && circleY > 101) {
          currentColor = color(255, 255, 0); // Yellow 
          fmSynth.triggerAttackRelease("B5", "32n");
      }
      if (circleX < 51 && circleY < 201 && circleY > 151) {
          currentColor = color(0, 255, 0); // Lime 
          fmSynth.triggerAttackRelease("C5", "32n");
      }
      if (circleX < 51 && circleY < 251 && circleY > 201) {
          currentColor = color(0, 255, 255); // Cyan 
          fmSynth.triggerAttackRelease("D5", "32n");
      }
      if (circleX < 51 && circleY < 301 && circleY > 251) {
          currentColor = color(0, 0, 255); // Blue 
          fmSynth.triggerAttackRelease("E5", "32n");
      }
      if (circleX < 51 && circleY < 351 && circleY > 301) {
          currentColor = color(255, 0, 255); // Magenta
          fmSynth.triggerAttackRelease("F#5", "32n");
      }
      if (circleX < 51 && circleY < 401 && circleY > 351) {
          currentColor = color(139, 69, 19); // SaddleBrown
          fmSynth.triggerAttackRelease("G6", "32n");
      }
      if (circleX < 51 && circleY < 451 && circleY > 401) {
          currentColor = color(255, 255, 255); // White
          fmSynth.triggerAttackRelease("A6", "32n");
      }
      if (circleX < 51 && circleY < 501 && circleY > 451) {
          currentColor = color(0, 0, 0); // Black
          fmSynth.triggerAttackRelease("B6", "32n");
      }
      //delete
      if (circleX < 51 && circleY < 551 && circleY > 501) {
          if (sw == 1) {
              background(255);
              fmSynth.triggerAttackRelease("C4", "16n");
              noise2.start();
          } else if (sw == 0) {
              background(255);
          }
      }
  }
}

function joystickReleased() {
    speed = 5;
    noise.stop();
    noise2.stop();
}

function joystick() {
    //joystick
    let str = port.readUntil("\n");
    let values = str.split(",");
    if (values.length > 2) {
        joyX = parseFloat(values[0]);
        joyY = parseFloat(values[1]);
        sw = parseFloat(values[2]);

        console.log("JoyX: ", joyX, " JoyY: ", joyY, "SW:", sw);

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

        if (sw == 1) {
            joystickClick();
            circleAlpha = 255;
            port.write("ON\n");
        } else {
            joystickReleased();
            circleAlpha = 25;
            port.write("OFF\n");
        }

        noStroke();
        fill(currentColor);
        colorMode(currentColor, circleAlpha);
        circle(circleX, circleY, 5);
    }
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

    image(deleteBomb, -7, 500, 70, 70);
    noStroke();
    text("delete?", 10, 570);
}

function drawing() {
    stroke(currentColor);
    strokeWeight(3);
    line(circleX, circleY);
}
