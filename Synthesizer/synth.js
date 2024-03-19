let synth = new Tone.Synth({
  oscillator: {
    type: "sawtooth"
  },
  envelope : {
    attack: 0.1,
    decay: 0.1,
    sustain: 0.1,
    release: 0.1,
  }
});
let synth2 = new Tone.PolySynth(Tone.DuoSynth);

let bend = new Tone.PitchShift();
bend.pitch = 0;

synth.connect(bend);
bend.toDestination();

synth2.connect(bend);
bend.toDestination();

let delayAmt = new Tone.FeedbackDelay("8n", 0.5);
delayAmt.delayTime = 0.1;
delayAmt.feedback = 0.1;
let delaySlider, dFeedback;

synth.connect(delayAmt);
delayAmt.toDestination();

synth2.connect(delayAmt);
delayAmt.toDestination();

let rVerb = new Tone.Reverb()
rVerb.decay = 10;
rVerb.wet = 1;
let rvSlider;

synth.connect(rVerb);
synth2.connect(rVerb);
rVerb.toDestination();

let sine = new Tone.Synth({
  oscillator: {
    type: "sine"
  },
  envelope : {
    attack: 0.1,
    decay: 0.1,
    sustain: 0.1,
    release: 0.1,
  }
}).toDestination();


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

function setup() {
  createCanvas(400, 400);

  mySelect = createSelect();
  mySelect.position(136,60);
  mySelect.option('Saw');
  mySelect.option('Sine');
  mySelect.option('Duo Synth');
  mySelect.selected('Saw');

  pitchSlider = createSlider(-0.5, 0.5, 0, 0.05);
  pitchSlider.position (10, 220);
  pitchSlider.mouseMoved (() => bend.pitch = pitchSlider.value());
  
  delaySlider = createSlider(0, 0.99, 0, 0.05);
  delaySlider.position (10, 260);
  delaySlider.mouseMoved (() => delayAmt.delayTime.value = delaySlider.value());

  dFeedback = createSlider(0, 0.99, 0, 0.05);
  dFeedback.position (10, 300);
  dFeedback.mouseMoved (() => delayAmt.feedback.value = dFeedback.value());

  // rvSlider = createSlider(0, 0.9, 0, 0.05);
  // rvSlider.position (10, 340);
  // rvSlider.mouseMoved (() => rVerb.decay.value = rVerb.value());
}

function keyPressed() {
  if (mySelect.selected() === 'Saw') {
    let playNotes = notes[key];
    synth.triggerAttackRelease(playNotes, 0.5);
  } else if (mySelect.selected() === 'Duo Synth') {
    let playNotes = notes[key];
    synth2.triggerAttackRelease(playNotes, 0.008);
  } else if (mySelect.selected() === 'Sine') {
    let playNotes = notes[key];
    sine.triggerAttackRelease(playNotes, 0.5);
  }
}

//function keyReleased() {
  //let playNotes = notes[key];
  //synth.triggerRelease(playNotes,"+0.08");
//}

function draw() {
  background('pink');
  text("Use qwerty to play", 130, 50);
  text('Post-FX Options', 10, 180);
  text('Bend Pitch +-0.5', 10, 200);
  text('Delay Time', 10, 250);
  text('Delay Feedback', 10, 290);
}