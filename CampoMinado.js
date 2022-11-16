//Cria o jogo campo minado.
class CampoMinado {
  constructor() {
    this.board = new Board();
    this.bombs = 10;
    this.createCells();
    this.loadBombs();
    this.loadNeighbor();
  }

  click(x, y) {
    if(x < this.board.margin || x > this.board.margin + this.board.clientHeight) return
    if (y < this.board.margin || y > this.board.margin + this.board.clientWidth) return
    let w = this.board.clientWidth / this.board.size;
    let h = this.board.clientHeight / this.board.size;
    let cx = Math.trunc((x - this.board.margin) / h);
    let cy = Math.trunc((y - this.board.margin) / h);
    if (cx < 0 || cy < 0 || cx >= this.board.size || cy >= this.board.size) return
    let c = this.cells[cx][cy];
    this.openCell(c, true);
  }

  openCell(cell, explode) {
    if (cell.open) return
    if (cell.bomb && !explode) return
    cell.open = true;
    if (cell.bomb) return
    if (cell.bombsNeighbor === 0) {
      cell.neighbor.forEach(nei => {
        this.openCell(nei, false);
      })
    }
  }

  loadNeighbor() {
    this.cells.forEach(line => {
      line.forEach(cell => {
        cell.neighbor = [];
        cell.bombsNeighbor = 0;

        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx != 0 || dy != 0) {
              let x = cell.x + dx;
              let y = cell.y + dy;

              if (x >= 0 && x < this.board.size && y >= 0 && y < this.board.size) {
                let c = this.cells[x][y];
                cell.neighbor.push(c);
                if (c.bomb) {
                  cell.bombsNeighbor++
                }
              }
            }
          }
        }
      })
    })
  }

  loadBombs() {
    let bombExist = 0;
    while (bombExist < this.bombs) {
      let x = Math.floor(Math.random(this.bombs) * this.board.size);
      let y = Math.floor(Math.random(this.bombs) * this.board.size);
      if (this.cells[x][y].bomb === false) {
        this.cells[x][y].bomb = true;
        bombExist++
      }
    }
  }

  render() {
    this.board.render();
    this.cells.forEach(line => {
      line.forEach(cell => {
        cell.render();
      })
    });
  }

  createCells() {
    this.cells = [];
    let line;
    for (let x = 0; x < this.board.size; x++) {
      line = [];
      for (let y = 0; y < this.board.size; y++) {
        line.push(new Cell(x, y, this.board));
      }
      this.cells.push(line);
    }
  }
}

//-------------------------------------------//---------------------------------------------------//
//Cria o tabuleiro do campo minado.
class Board {
  constructor() {
    this.size = 10;
    this.margin = 6;
    this.width = width;
    this.height = height;
    this.clientWidth = this.width - this.margin * 2;
    this.clientHeight = this.height - this.margin * 2;
  }

  render() {
    background("#253939");
    strokeWeight(this.margin);
    stroke('red');
    noFill();
    rect(this.margin / 2, this.margin / 2, this.height - this.margin, this.height - this.margin);
  }
}

//-------------------------------------------//---------------------------------------------------//
//Cria as células do campo minado.
class Cell {
  constructor(x, y, board) {
    this.x = x;
    this.y = y;
    this.board = board;
    this.bomb = false;
    this.open = false;
  }

  render() {
    stroke('blue');
    fill(50);
    strokeWeight(1);
    let h = this.board.clientHeight / this.board.size;
    let px = this.x * h + this.board.margin;
    let py = this.y * h + this.board.margin;
    rect(px, py, h);

    if (this.open) {
      fill(0);
      rect(px, py, h);
      if (this.bomb) {
        noStroke();
        fill(255, 0, 0);
        circle(px + h / 2, py + h / 2, 25);
      } else {
        if (this.bombsNeighbor > 0) {
          textAlign(CENTER)
          textSize(h);
          strokeWeight(2);
          fill('blue');
          stroke('blue');
          text(this.bombsNeighbor, px + (h / 2), py + h * 0.9);
        }
      }
    }
  }
}

//-------------------------------------------//---------------------------------------------------//
//Cria as bombas do campo minado.
class Bomb {
  constructor() {

  }
}