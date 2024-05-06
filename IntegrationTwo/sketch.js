// ctrl

let port;
let joyX = 0, joyY = 0, sw = 0;
let connectButton;
let circleX, circleY;
let speed = 5;
let circleAlpha = 255;
let circleSize = 10;

let minY = 0;
let maxY = 0;

function distanceToY(distance) {
    // Map the distance to a Y position on the canvas
    let yPos = map(distance, 0, 100, 170, 910);
    // Constrain the Y position within the canvas height
    return constrain(yPos, 0, height);
}

let ultrasonic;
let distance;

//sounds

let oscType = 'sine';
let sustain = 0;

let releaseTime = 0.1;

let synth = new Tone.Synth({
    oscillator: {
      type: oscType
    },
    envelope : {
      attack: 0.1,
      decay: 0.1,
      sustain: 1,
      release: releaseTime,
    }
  });

//fx 

let rVerb = new Tone.Reverb()
rVerb.decay = 1;
rVerb.wet = 0;

let delayFeedback;
let delayAmt = new Tone.FeedbackDelay("16n", delayFeedback);
synth.connect(delayAmt);
delayAmt.toDestination();

synth.connect(rVerb);
rVerb.toDestination();

function setReverb(distance) {
    let minFeedback = 0.1;  
    let maxFeedback = 2; 
    let minDistance = 0; 
    let maxDistance = 200;

    let feedback = map(distance, minDistance, maxDistance, maxFeedback, minFeedback);
    feedback = constrain(feedback, minFeedback, maxFeedback);

    // rVerb.decay.value = feedback;
    // rVerb.wet.value = feedback;
    
    releaseTime = feedback;
}

function delayDistance(distance) {
    let minFeedback = 0;  
    let maxFeedback = 0.9; 
    let minDistance = 0; 
    let maxDistance = 200;

    let feedback = map(distance, minDistance, maxDistance, maxFeedback, minFeedback);
    feedback = constrain(feedback, minFeedback, maxFeedback);

    delayAmt.feedback.value = feedback;
}

//pitch collection

let notes = {
    'q' : "C4",
    'w' : "D4",
    'e' : "E4",
    'r' : "F4",
    't' : "G4",
    'y' : "A4",
    'u' : "B4",
    'i' : "C5",
    'o' : "D5",
    'p' : "E5",
  
    '2' : "C#4",
    '3' : "D#4",
    '5' : "F#4",
    '6' : "G#4",
    '7' : "A#4",
    '9' : "C#5",
    "0" : "D#5"
  }

  //gfx

let currentColor = 'black';
let alpha = 255;

// const colorArray = [
//     'Orchid',
//     'PaleGoldenRod',
//     'PaleGreen',
//     'PaleTurquoise',
//     'PaleVioletRed',
//     'Plum'
// ];

const sineColorArray = [
    'Orchid',
    'DodgerBlue',
    'MediumSpringGreen',
    'PaleTurquoise',
    'Aquamarine',
    'Violet'
];

const squareColorArray = [
    'Teal',
    'SpringGreen',
    'Lime',
    'ForestGreen',
    'PaleGreen',
    'SeaGreen'
];

const sawColorArray = [
    'Tomato',
    'LightCoral',
    'Crimson',
    'HotPink',
    'Plum',
    'Salmon'
];

let colorIndex = 0;

let currentShape = 'circle';

function colorCycle() {
    colorIndex = (colorIndex + 1) % colorArray.length;
    currentColor = colorArray[colorIndex];
}

function setup() {
    port = createSerial();
    createCanvas(1920, 1080);

  
    circleX = width / 2;
    circleY = height / 2;

    background('black');
    currentColor = 'white';
    colorArray = sineColorArray;

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
    synth.oscillator.type = oscType;

    currentShape = 'square';
    colorArray = squareColorAarray;
    colorIndex = 0;

    // colorArray = squareColorArray;
}

function oscSaw() {
    oscType = 'sawtooth';
    synth.oscillator.type = oscType;

    colorArray = sawColorArray;
    colorIndex = 0;
    currentShape = 'triangle';
}

function oscSine() {
    oscType = 'sine';
    synth.oscillator.type = oscType;

    colorArray = sineColorArray;
    colorIndex = 0;
    currentShape = 'circle';
}

//play the synth

function keyPressed() {
    let playNotes = notes[key];
    synth.triggerAttack(playNotes);

    colorCycle();
    circleSize = 50;

    if (distance > 150) {
        synth.triggerRelease();
        circleSize = 50;
    }
}

function keyReleased() {
    circleSize = 5;
}

//port stuff

function connect() {
    if (!port.opened()) {
        port.open('Arduino', 9600);
        synth.triggerAttackRelease("G5", "32n");
        colorCycle();
    } else {
        port.close();
    }
}

function ultrasonicSensor() {
    let str = port.readUntil("\n");
    str = str.trim();
    // Parse the distance value
    let parsedDistance = parseFloat(str);
    if (!isNaN(parsedDistance)) {
        // If the parsed distance is a valid number
        distance = parsedDistance;
        setReverb(distance);
        delayDistance(distance);

        console.log("Distance: ", distance);
    } else {
        circleSize = 10;
        console.log("Error:", str);
    }


}

function draw() {
    // clear();
    // background('black');

    ultrasonicSensor();

    let circleY = distanceToY(distance);

    fill(currentColor);
    noStroke();
    ellipse(width / 2, circleY, circleSize);

    
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
            
            triangle(x1, y1, x2, y2, x3, y3);
    }

    textAlign(CENTER, TOP);
    textSize(24);
    fill(currentColor);
    text('ultrasonic synth', width / 2, 10);

    let subtitleY = 40;
    textSize(18); 
    fill(currentColor); 
    noStroke();
    text('QWERTY and Hand to Play', width / 2, 10 + subtitleY);

    
    let subtitleY2 = 60;
    textSize(15); 
    fill(currentColor); 
    noStroke();
    text('By Taylor Stoddard', width / 2, 10 + subtitleY2);

    //for the LED

    const r = red(currentColor);
    const g = green(currentColor);
    const b = blue(currentColor);
    const rgbString = `${r},${g},${b}\n`; //thank you internet
    port.write(rgbString);
}

function drawing() {
    // stroke(currentColor);
    strokeWeight(2);
    line(circleY);
}

