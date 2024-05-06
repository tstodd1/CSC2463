// ctrl

let port;
let joyX = 0, joyY = 0, sw = 0;
let connectButton;
let circleX, circleY;
let speed = 5;
let circleAlpha = 255;
let circleSize = 10;

let ultrasonic;
let distance;

// gfx

let currentColor = 'black';
let deleteBomb;
let explosion;
let alpha = 255;

let currentShape = 'circle';

//cycle through colors
const colorArray = [
    'Orchid',
    'PaleGoldenRod',
    'PaleGreen',
    'PaleTurquoise',
    'PaleVioletRed',
    'Plum'
];

const squareColorArray = [
    'red',
    'blue',
    'green'
];
let colorIndex = 0;

function colorCycle() {
    colorIndex = (colorIndex + 1) % colorArray.length;
    currentColor = colorArray[colorIndex];
}


//pitch collections
let noteIndex;
  let midiNotes = [
    60, 
    67, 
    71, 
    74
];



//synths

let oscType = 'sine';
let sustain = 0;

let synthSaw = new Tone.Synth({
    oscillator: {
      type: oscType
    },
    envelope : {
      attack: 0.1,
      decay: 0.1,
      sustain: 0.05,
      release: 0.1,
    }
  }).toDestination();

  //pitch collection

    let sequence1
    let melody = ["C4", "G4", "B4", "D5" ];

    sequence1 = new Tone.Sequence(function(time, note) { 
    synthSaw.triggerAttackRelease(note, 0.5);
  }, melody, '4n');
  Tone.Transport.bpm.value = 200; //how many beats(quarter notes) per minute
  Tone.Transport.start(); //starts the transport

  function startSound() {
    sequence1.start();
    Tone.start();
  }

  //fx
  let delayFeedback;
  let delayAmt = new Tone.FeedbackDelay("16n", delayFeedback);
  synthSaw.connect(delayAmt);
  delayAmt.toDestination();

  function delayDistance(distance) {
    let minFeedback = 0;  
    let maxFeedback = 0.9; 
    let minDistance = 0; 
    let maxDistance = 200;

    let feedback = map(distance, minDistance, maxDistance, maxFeedback, minFeedback);
    feedback = constrain(feedback, minFeedback, maxFeedback);

    delayAmt.feedback.value = feedback;
}
  


function preload() {

}

//////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
    port = createSerial();
    createCanvas(1920, 1080);
  
    circleX = width / 2;
    circleY = height / 2;

    background('black');
    currentColor = 'white';

    //port connect
    connectButton = createButton("Connect");
    connectButton.mousePressed(connect);
    connectButton.position(10, 600);

    squareButton = createButton("Square");
    squareButton.mousePressed(oscSquare);
    squareButton.position(10, 620);

    sawButton = createButton('Saw');
    sawButton.mousePressed(oscSaw);
    sawButton.position(10, 640);

    sineButton = createButton('Sine');
    sineButton.mousePressed(oscSine);
    sineButton.position(10, 660);

}

function oscSquare() {
    oscType = 'square';
    synthSaw.oscillator.type = oscType;

    currentShape = 'square';

    // colorArray = squareColorArray;
}

function oscSaw() {
    oscType = 'sawtooth';
    synthSaw.oscillator.type = oscType;

    currentShape = 'triangle';
}

function oscSine() {
    oscType = 'sine';
    synthSaw.oscillator.type = oscType;

    currentShape = 'circle';
}

//port stuff

function connect() {
    if (!port.opened()) {
        port.open('Arduino', 9600);
        synthSaw.triggerAttackRelease("G5", "32n");
    } else {
        port.close();
    }
}


let lastSoundTime = 0;
let soundInterval = 500;
//joystick
function joystickClick() {
    speed = 5;
    circleSize = 100;
    startSound();
}

function joystickReleased() {
    speed = 10;
    circleSize = 5;
    sequence1.stop();
    // synthSaw.triggerRelease();
}


function joystick() {
    //joystick
    let str = port.readUntil("\n");
    let values = str.split(",");
    if (values.length > 2) {
        distance = parseFloat(values[0]);
        joyX = parseFloat(values[1]);
        joyY = parseFloat(values[2]);
        sw = parseFloat(values[3]);

    
        
        console.log("JoyX: ", joyX, " JoyY: ", joyY, "SW:", sw, "Distance:", distance);
        // ultrasonicSensor();

        delayDistance(distance);

        //circle position

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
            // synthSaw.triggerAttackRelease("G5", "32n");
            // synthSaw.triggerAttackRelease(freq, 0.5);
            // midiVal = midiNotes[noteIndex];
            // freq = Tone.Frequency(midiVal, "midi").toFrequency();
            // noteIndex = (noteIndex + 1) % midiNotes.length;
            // startSound();
            colorCycle();
            port.write("ON\n");
        } else {
            joystickReleased();
            circleAlpha = 25;
            port.write("OFF\n");
        }

        noStroke();
        fill(currentColor);
        colorMode(currentColor, circleAlpha);
        circle(circleX, circleY, circleSize);

        if (currentShape === 'circle') {
            circle(circleX, circleY, circleSize);
        } else if (currentShape === 'square') {
            rect(circleX - circleSize / 2, circleY - circleSize / 2, circleSize, circleSize);
        } else if (currentShape === 'triangle') {
                const x1 = circleX;
                const y1 = circleY - circleSize / 2; // Top point of the triangle
                const x2 = circleX - circleSize / 2;
                const y2 = circleY + circleSize / 2; // Bottom left point
                const x3 = circleX + circleSize / 2;
                const y3 = circleY + circleSize / 2; // Bottom right point
                
                // Draw the triangle
                triangle(x1, y1, x2, y2, x3, y3);
        }
    }
}

function ultrasonicSensor() {
    let str = port.readUntil("\n");
    let values = str.split(",");
    if (values.length > 2) {
        distance = parseFloat(values[3]);
    }
    setDelayBasedOnDistance(distance);
    console.log("Distance: ", distance);
}



function draw() {
    joystick();
}

function drawing() {
    stroke(currentColor);
    strokeWeight(2);
    line(circleX, circleY);
}
