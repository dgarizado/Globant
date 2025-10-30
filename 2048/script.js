// 2048 - Step 1 starter
// Responsibilities:
// - build a 4x4 grid model
// - render the static grid cells
// - spawn two starting tiles (value 2 or 4) in random empty cells

const SIZE = 8;

// Model: a 2D array representing the board. 0 = empty, otherwise tile value.
let board = [];
let score = 0;
// track last spawn to animate it on render
let recentSpawn = null;

const gridContainer = document.querySelector('.grid-container');
const scoreEl = document.getElementById('score');

function initBoard(){
  board = Array.from({length: SIZE}, () => Array(SIZE).fill(0));
  score = 0;
}

function renderGridBackground(){
  gridContainer.innerHTML = '';
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      const cell = document.createElement('div');
      cell.className = 'cell';
      gridContainer.appendChild(cell);
    }
  }
}

function getEmptyCells(){
  const empties = [];
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      if(board[r][c] === 0) empties.push([r,c]);
    }
  }
  return empties;
}

function spawnRandomTile(){
  const empties = getEmptyCells();
  if(empties.length === 0) return false;
  const idx = Math.floor(Math.random() * empties.length);
  const [r,c] = empties[idx];
  // 90% chance of 2, 10% chance of 4 is common in many 2048 implementations
  const value = Math.random() < 0.9 ? 2 : 4;
  board[r][c] = value;
  return {r,c,value};
}

function renderTiles(){
  // Remove previous tiles
  const existing = document.querySelectorAll('.tile');
  existing.forEach(n => n.remove());

  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      const val = board[r][c];
      if(val === 0) continue;
      const tile = document.createElement('div');
      // set classes for value-based styling
      const valueClass = val === 2 ? 'two' : val === 4 ? 'four' : 'v' + val;
      tile.className = 'tile ' + valueClass;
  // account for the grid container padding (var(--gap)) so tiles align with cells
  tile.style.top = `calc(var(--gap) + ${r} * (var(--tile-size) + var(--gap)))`;
  tile.style.left = `calc(var(--gap) + ${c} * (var(--tile-size) + var(--gap)))`;
      tile.textContent = val;
      // mark newly spawned tiles for a pop animation
      if(recentSpawn && recentSpawn.r === r && recentSpawn.c === c && recentSpawn.value === val){
        tile.setAttribute('aria-new', 'true');
      }
      gridContainer.appendChild(tile);
    }
  }
  scoreEl.textContent = String(score);
}

// Helpers for move logic
function cloneBoard(b){
  return b.map(row => row.slice());
}

function boardsEqual(a,b){
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      if(a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

// Slide and merge a single row to the left. Returns {newRow, gained}
function slideAndMergeRow(row){
  const tiles = row.filter(v => v !== 0);
  const newRow = [];
  let gained = 0;
  for(let i=0;i<tiles.length;i++){
    if(i+1 < tiles.length && tiles[i] === tiles[i+1]){
      const merged = tiles[i] + tiles[i+1];
      newRow.push(merged);
      gained += merged;
      i++; // skip next because merged
    } else {
      newRow.push(tiles[i]);
    }
  }
  while(newRow.length < SIZE) newRow.push(0);
  return {newRow, gained};
}

function transpose(b){
  const t = Array.from({length: SIZE}, () => Array(SIZE).fill(0));
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++) t[c][r] = b[r][c];
  }
  return t;
}

function reverseRows(b){
  return b.map(row => row.slice().reverse());
}

function moveLeft(){
  const before = cloneBoard(board);
  let gained = 0;
  for(let r=0;r<SIZE;r++){
    const {newRow, gained: g} = slideAndMergeRow(board[r]);
    board[r] = newRow;
    gained += g;
  }
  score += gained;
  return !boardsEqual(before, board);
}

function moveRight(){
  // reverse rows, move left, reverse back
  board = reverseRows(board);
  const moved = moveLeft();
  board = reverseRows(board);
  return moved;
}

function moveUp(){
  board = transpose(board);
  const moved = moveLeft();
  board = transpose(board);
  return moved;
}

function moveDown(){
  board = transpose(board);
  board = reverseRows(board);
  const moved = moveLeft();
  board = reverseRows(board);
  board = transpose(board);
  return moved;
}

function checkWin(){
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      if(board[r][c] === 2048){
        return true;
      }
    }
  }
  return false;
}

function hasMoves(){
  // if any empty cell, moves available
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE;c++){
      if(board[r][c] === 0) return true;
    }
  }
  // check adjacent merges
  for(let r=0;r<SIZE;r++){
    for(let c=0;c<SIZE-1;c++){
      if(board[r][c] === board[r][c+1]) return true;
    }
  }
  for(let c=0;c<SIZE;c++){
    for(let r=0;r<SIZE-1;r++){
      if(board[r][c] === board[r+1][c]) return true;
    }
  }
  return false;
}

function performMove(direction){
  let moved = false;
  if(direction === 'left') moved = moveLeft();
  else if(direction === 'right') moved = moveRight();
  else if(direction === 'up') moved = moveUp();
  else if(direction === 'down') moved = moveDown();

  if(moved){
    recentSpawn = spawnRandomTile();
    renderTiles();
    if(checkWin()){
      showMessage('You win!');
      return;
    }
    if(!hasMoves()){
      setTimeout(()=> showMessage('Game Over'), 50);
    }
  }
}

// keyboard controls
document.addEventListener('keydown', (ev) => {
  const key = ev.key;
  if(key === 'ArrowLeft'){
    ev.preventDefault();
    performMove('left');
  } else if(key === 'ArrowRight'){
    ev.preventDefault();
    performMove('right');
  } else if(key === 'ArrowUp'){
    ev.preventDefault();
    performMove('up');
  } else if(key === 'ArrowDown'){
    ev.preventDefault();
    performMove('down');
  }
});


// game start / restart wiring
function startGame(){
  initBoard();
  renderGridBackground();
  // spawn two starting tiles
  recentSpawn = spawnRandomTile();
  spawnRandomTile();
  renderTiles();
}

document.getElementById('restart-btn').addEventListener('click', startGame);


startGame();

// message overlay
const overlay = document.getElementById('message');
const messageText = document.getElementById('message-text');
document.getElementById('modal-restart').addEventListener('click', ()=>{
  overlay.classList.add('hidden');
  startGame();
});

function showMessage(msg){
  messageText.textContent = msg;
  overlay.classList.remove('hidden');
}



