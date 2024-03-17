let soundFX = new Tone.Players({
  bite : "assets/bite.mp3",
  fail : "assets/fail.mp3",
  spin : "assets/spin.mp3",
  squish : "assets/squish.mp3"
});

let button1, button2, button3, button4;

let delayAmt = new Tone.FeedbackDelay("8n", 0.5);
let delaySlider, dFeedback;

let bitCrush = new Tone.BitCrusher();
let bcSlider;

//let pShift = new Tone.PitchShift();
//let pSlider;


soundFX.connect(delayAmt);
delayAmt.toDestination();

soundFX.connect(bitCrush);
bitCrush.toDestination();

//soundFX.connect(pShift);
//pShift.toDestination();
//pShift.pitch = +24;
//pShift.pitch = -24;


function setup() {
  createCanvas(400, 400);

  ////////////////////////////buttons//////////////////////////////////////

  button1 = createButton('bite');
  button1.position (85, 150);
  button1.mousePressed (play1);

  button2 = createButton('fail');
  button2.position (125, 150);
  button2.mousePressed (() =>soundFX.player('fail').start());

  button3 = createButton('spin');
  button3.position (160, 150);
  button3.mousePressed (() =>soundFX.player('spin').start());

  button4 = createButton('squish');
  button4.position (200, 150);
  button4.mousePressed (() =>soundFX.player('squish').start());

 ////////////////////////////sliders//////////////////////////////////////

  delaySlider = createSlider(0, 0.99, 0, 0.05);
  delaySlider.position (105, 200);
  delaySlider.mouseMoved (() => delayAmt.delayTime.value = delaySlider.value());

  dFeedback = createSlider(0, 0.8, 0, 0.05);
  dFeedback.position (105, 240);
  dFeedback.mouseMoved (() => delayAmt.feedback.value = dFeedback.value());

  bcSlider = createSlider(0, 1, 0, 0.05);
  bcSlider.position (105, 280);
  bcSlider.mouseMoved (() => bitCrush.wet.value = bcSlider.value());

 // pSlider = createSlider(0, 24, 0, 0.05);
 // pSlider.position (105, 320);
 // pSlider.mouseMoved (() => pShift.pitch.value = pSlider.value());


}

function play1 (){
  soundFX.player('bite').start();
}

function draw() {
  background('pink');
  text('Sampler Project', 25, 50);
  text('Delay Time', 90, 190);
  text('Delay Feedback', 90, 230);
  text('Bitcrush Amount', 90, 270);
}