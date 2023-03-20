const gameContainer = document.getElementById("game-container");
const tileWidth = 10;
const tileHeight = 10;
const numRows = 50;
const numCols = 50;

let foodCoords = [];

function createTile(x, y) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.style.left = `${x * tileWidth}px`;
  tile.style.top = `${y * tileHeight}px`;
  return tile;
}

function createGrid() {
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const tile = createTile(col, row);
      gameContainer.appendChild(tile);
    }
  }
}

function generateFood() {
  let availableCoords = getAvailableCoords()
  let index = Math.floor(Math.random() * availableCoords.length)
  let prevFood = document.getElementById('food')
  if (prevFood !== null) {
    prevFood.remove()
  }
  const food = document.createElement('div')
  food.classList.add('food')
  food.id = 'food'
  food.style.left = `${(availableCoords[index][0]*tileWidth) + tileWidth/8}px`
  food.style.top = `${(availableCoords[index][1]*tileHeight) + tileHeight/8}px`
  foodCoords = [(availableCoords[index][0]*tileWidth), (availableCoords[index][1]*tileHeight)]
  gameContainer.appendChild(food)
}

function getAvailableCoords() {
  let takenCoords = getTakenCoords();
  let availableCoords = [];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      let coords = [col, row]
      if (!takenCoords.includes(coords)) {
        availableCoords.push(coords)
      }
    }
  }
  return availableCoords
}

function getTakenCoords() {
  let takenCoords = [];
  for (let i = 0; i < playerBody.length; i++) {
    takenCoords.push([playerBody[i].x, playerBody[i].y])
  }
  return takenCoords
}