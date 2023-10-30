let viento, amanece, venado, album;
let vientobut, amanecebut, venadobut, stopbut;


function preload(){
  //preload sounds + image
  viento = loadSound('sounds/viento.mp3');
  amanece = loadSound('sounds/amanece.mp3');
  venado = loadSound('sounds/venado.mp3');
  album = loadImage('sounds/CaifanesAlbum.png');
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  fft = new p5.FFT();
  viento.amp(0.2);
  venado.amp(0.2);
  amanece.amp(0.2);

  textFont('Times New Roman');
  //viento
  vientobut = createButton('Viento');
  vientobut.position(width/2 - 250, height-80);
  vientobut.mousePressed()

  //amanece
  amanecebut = createButton('Amanece');
  amanecebut.position(width/2-30, height-80);

  //venado
  venadobut = createButton('Perdí Mi Ojo de Venado');
  venadobut.position(width/2+150, height-80);

  //pause
  stopbut = createButton('⏸️');
  stopbut.position(width/2-10, height - 35);

// play song if button is pressed
  vientobut.mousePressed(playViento);
  amanecebut.mousePressed(playAmanece);
  venadobut.mousePressed(playVenado);

  stopbut.mousePressed(pauseSound);
}

function draw(){
  background(220);

   //my top 3 text
   textSize(20);
   textFont('Times New Roman');
   fill('purple');
   text("Beatriz's Top 3 from the Caifanes Album", width/2 - 170, 50);
   text('tap a button to play!', 20, 20);

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();

  image(album, width/2-250, height/2-275, 500, 500);

  let spectrum = fft.analyze();
  noStroke();
  fill(201, 3, 251);
  for (let i = 0; i < spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, windowWidth);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
}


function playViento() {
  console.log('vientooo');
  viento.play(0, 1, 0.25, 0.0); 
  playingVi = true
}

function playAmanece() {
  console.log('amanece!');
  amanece.play(0, 1, 0.25, 0.0);
  playingAm = true;
}

function playVenado() {
  console.log('perdi mi ojo');
  venado.play(0, 1, 0.25, 0.0);
  playingVe = true;
}

function pauseSound() {
  if(viento.isPlaying() || amanece.isPlaying() || venado.isPlaying()) {
    viento.pause();
    amanece.pause();
    venado.pause();
  }
}