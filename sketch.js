let campoMinado;

function setup() {
  createCanvas(1280, 720);
  campoMinado = new CampoMinado();
}

function draw() {
  campoMinado.render();
}

function mousePressed() {
  campoMinado.click(mouseX, mouseY);
}