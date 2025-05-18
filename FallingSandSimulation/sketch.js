const SCALE = 10;
let WIDTH, HEIGHT;

let cols, rows;
let grid;

function createEmptyGrid(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function drawGrid(grid, rows, cols, scale) {
  colorMode(HSB, 360, 255, 255);
  noStroke();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j]) {
        fill(grid[i][j], 255, 255);
      } else {
        noFill();
      }
      rect(j * scale, i * scale, scale, scale);
    }
  }
}

function updateGrid(grid, rows, cols) {
  let nextGrid = createEmptyGrid(rows, cols);

  for (let i = rows - 1; i >= 0; i--) {
    for (let j = 0; j < cols; j++) {
      const current = grid[i][j];
      if (!current) continue;

      if (i + 1 < rows && !grid[i + 1][j]) {
        nextGrid[i + 1][j] = current;
      } else {
        if (random() < 0.7) {
          // Chance to just stay here and stop sliding, making clumps
          nextGrid[i][j] = current;
          continue;
        }

        let dir = random([1, -1]);
        let newJ = j + dir;

        if (newJ < 0 || newJ >= cols || (i + 1 < rows && grid[i + 1][newJ])) {
          dir *= -1;
          newJ = j + dir;
        }

        if (newJ >= 0 && newJ < cols && i + 1 < rows && !grid[i + 1][newJ]) {
          nextGrid[i + 1][newJ] = current;
        } else {
          nextGrid[i][j] = current;
        }
      }
    }
  }

  return nextGrid;
}

let hueValue = 0;
let hueDirection = 1; // 1 for increasing, -1 for decreasing
const MAX_HUE = 360;

function handleMouseInput(grid, rows, cols, scale) {
  if (!mouseIsPressed) return grid;

  const i = floor(mouseY / scale);
  const j = floor(mouseX / scale);

  // Mouse bound checking - early return if out of bounds
  if (i < 0 || i >= rows || j < 0 || j >= cols) return grid;

  return addSand(i, j);
}

function addSand(x, y, brushSize = floor(random(WIDTH / SCALE))) {
  // Cycle smoothly
  hueValue += 0.5 * hueDirection;

  // Reverse direction when reaching boundaries of hot zone
  if (hueValue >= MAX_HUE) {
    hueValue = MAX_HUE;
    hueDirection = -1;
  } else if (hueValue <= 0) {
    hueValue = 0;
    hueDirection = 1;
  }

  // Apply brush to surrounding cells
  for (let i = floor(-brushSize / 2); i <= floor(brushSize / 2); i++) {
    for (let j = floor(-brushSize / 2); j <= floor(brushSize / 2); j++) {
      const newI = x + i;
      const newJ = y + j;

      if (
        newI >= 0 &&
        newI < rows &&
        newJ >= 0 &&
        newJ < cols &&
        !grid[newI][newJ]
      ) {
        if (random(1) < 0.5) grid[newI][newJ] = hueValue;
      }
    }
  }

  return grid;
}

let handX = 0;
let tick = 0;

function randomallyDropSand() {
  tick++;
  if (tick % 2 !== 0) return grid;

  const handY = floor(rows / 10);
  if (isRowFull(handY)) return createEmptyGrid(WIDTH * SCALE, HEIGHT * SCALE);

  const speed = map(noise(tick * 0.02), 0, 1, 0.1, 2);
  handX += speed;

  if (handX > cols) handX = 0;

  return addSand(handY, floor(handX), floor(random(1) < 0.99 ? 1 : 20));
}

function isRowFull(row) {
  for (let j = 0; j < cols; j++) {
    if (!grid[row][j]) return false;
  }

  return true;
}

function setup() {
  WIDTH = floor(windowWidth / SCALE);
  HEIGHT = floor(windowHeight / SCALE);

  createCanvas(WIDTH * SCALE, HEIGHT * SCALE);

  cols = width / SCALE;
  rows = height / SCALE;

  grid = createEmptyGrid(rows, cols);
}

function draw() {
  background(20);

  drawGrid(grid, rows, cols, SCALE);
  grid = handleMouseInput(grid, rows, cols, SCALE);
  // OPTIONAL: random hand dropping sand
  grid = randomallyDropSand();

  grid = updateGrid(grid, rows, cols);
}
