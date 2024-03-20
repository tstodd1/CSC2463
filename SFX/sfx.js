let sub = new Tone.Synth({
  oscillator: {
    type: "sine"
  },
  envelope : {
    attack: 0.01,
    decay: 1,
    sustain: 1,
    release: 0.1,
  }
}).toDestination();

let noise = new Tone.Noise("pink");
noise.fadeOut = 1;
noise.volume = 1;

let noise2 = new Tone.Noise("brown");
noise.fadeOut = 1;
noise.volume = 1;

let filter = new Tone.Filter(100, "lowpass");
let filter2 = new Tone.Filter(4000, "lowpass");

let rVerb = new Tone.Reverb()
rVerb.decay = 10000;
rVerb.wet = 0.5;

// noise.connect(rVerb);
// rVerb.toDestination();

const crusher = new Tone.BitCrusher(5).toDestination();
const crusher2 = new Tone.BitCrusher(4).toDestination();


noise.connect(rVerb);
sub.connect(rVerb);

rVerb.connect(filter);
noise2.connect(filter2);

filter.connect(crusher);
filter2.connect(crusher2);

crusher2.connect(rVerb);



function preload() {
  explosion = loadImage("assets/explosion.jpg")
}

function setup() {
  createCanvas(400, 400);

}



function mousePressed() {
  if (mouseIsPressed === true) {
    noise.start();
    noise.volume.rampTo(0);
    noise2.start();
    noise2.volume.rampTo(0);

    sub.triggerAttackRelease("C1", "8n");
    sub.volume.rampTo(0);

    filter.frequency.rampTo(0, 4000);
  }
}
function mouseReleased() {
  noise.stop();
  noise2.stop();
}

function draw() {
  if (mouseIsPressed === true) {
    background(explosion);  
  } else if (mouseIsPressed === false) {
    background(255);
    text("Click to Explode!!!!!", 145, 200);
  }
}