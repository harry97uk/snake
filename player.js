let playerHead

let playerBody
let direction
let previousPositions
let snakeInterval
let intervalTime = 80

//for snakeAnimation
let waveCounter

function initialize() {
  playerHead  = {
    x: 200,
    y: 200,
    speed: 1,
    direction: null,
    targetPosition: null,
  };
  playerBody = [playerHead];
  direction = [tileWidth, 0]
  previousPositions = [[200, 200, null]]
  waveCounter = 0
}

function createPlayer() {
  const player = document.createElement("div");
  player.classList.add("player-head");
  player.id = 'player'
  player.style.left = `200px`;
  player.style.top = `200px`;
  gameContainer.appendChild(player)
  const tongue = document.createElement('div')
  tongue.id = 'tongue'
  tongue.classList.add('tongue')
  player.appendChild(tongue)
}

function addToPlayerBody() {
  playerBody.push({ x: 200, y: 200, speed: 1, direction: 'right', targetPosition: null })
  previousPositions.push([200, 200, null])
  const playerBodyPiece = document.createElement("div");
  playerBodyPiece.classList.add("player-body");
  playerBodyPiece.id = `player-body${playerBody.length - 1}`
  playerBodyPiece.style.left = `200px`;
  playerBodyPiece.style.top = `200px`;
  gameContainer.appendChild(playerBodyPiece)
}

function storePreviousPositions() {
  for (let i = 0; i < playerBody.length; i++) {
    previousPositions[i][0] = playerBody[i].x
    previousPositions[i][1] = playerBody[i].y
    previousPositions[i][2] = playerBody[i].direction
  }
}

function updatePlayerHead(snakeDirection) {
  const playerElement = document.getElementById("player");
  animateSnake(playerHead)
  playerHead.x = playerHead.targetPosition[0]
  playerHead.y = playerHead.targetPosition[1]
  playerElement.style.left = `${playerHead.x}px`;
  playerElement.style.top = `${playerHead.y}px`;
  playerHead.direction = snakeDirection
  if (playerHead.x == foodCoords[0] && playerHead.y == foodCoords[1]) {
    addToPlayerBody()
    generateFood()
  }
}

function updatePlayerBody() {
  let tri = 0
  for (let i = 1; i < playerBody.length; i++) {
    playerBody[i].targetPosition = [previousPositions[i - 1][0], previousPositions[i - 1][1]]
    playerBody[i].x = previousPositions[i - 1][0]
    playerBody[i].y = previousPositions[i - 1][1]
    playerBody[i].direction = previousPositions[i - 1][2]
    const playerElement = document.getElementById(`player-body${i}`);
    let moveX = 1
    let moveY = 1

    if (previousPositions[i - 1][2] === 'up' || previousPositions[i - 1][2] === 'down') {
      if (waveCounter % 4 == 0 + tri) {
        moveX = 2
      } else if (waveCounter % 4 == 2 + tri) {
        moveX = 0
      }
    } else {
      if (waveCounter % 4 == 0 + tri) {
        moveY = 2
      } else if (waveCounter % 4 == 2 + tri) {
        moveY = 0
      }
    }
    if (i % 2 == 0) {
      tri++
    }
    playerElement.style.left = `${playerBody[i].x + moveX}px`;
    playerElement.style.top = `${playerBody[i].y + moveY}px`;
  }
  waveCounter++
}

function movePlayer(dx, dy, snakeDirection) {
  storePreviousPositions();
  playerHead.targetPosition = [dx, dy]
  let taken = getTakenCoords()
  if (playerHead.x < 0 || playerHead.x >= 500 || playerHead.y < 0 || playerHead.y >= 500 || taken.some(c => c[0] == dx && c[1] ==  dy)) {
    alert("Game Over")
    clearInterval(snakeInterval)
    let playAgain = document.getElementById('play-again-button')
    playAgain.style.visibility = 'visible'
  } else {
    updatePlayerHead(snakeDirection);
    updatePlayerBody();
  }
}

document.addEventListener("keydown", event => {
  let tongue = document.getElementById('tongue')
  switch (event.key) {
    case "ArrowLeft":
      if (playerHead.direction !== 'right' && playerHead.direction !== 'left') {
        direction = [-tileWidth, Number(0)]
        tongue.style.width = '5px'
        tongue.style.height = '2px'
        tongue.style.left = '-2px'
        tongue.style.top = '4px'
        startInterval(intervalTime, direction, 'left')
      }
      break;
    case "ArrowRight":
      if (playerHead.direction !== 'left' && playerHead.direction !== 'right') {
        direction = [tileWidth, Number(0)]
        tongue.style.width = '5px'
        tongue.style.height = '2px'
        tongue.style.left = '8px'
        tongue.style.top = '4px'
        startInterval(intervalTime, direction, 'right')
      }
      break;
    case "ArrowUp":
      if (playerHead.direction !== 'down' && playerHead.direction !== 'up') {
        direction = [0, -tileHeight]
        tongue.style.width = '2px'
        tongue.style.height = '5px'
        tongue.style.left = '4px'
        tongue.style.top = '-2px'
        startInterval(intervalTime, direction, 'up')
      }
      break;
    case "ArrowDown":
      if (playerHead.direction !== 'up' && playerHead.direction !== 'down') {
        direction = [0, tileHeight]
        tongue.style.width = '2px'
        tongue.style.height = '5px'
        tongue.style.left = '4px'
        tongue.style.top = '8px'
        startInterval(intervalTime, direction, 'down')
      }
      break;
  }
});


function startInterval(time, snakeDirectionCoords, snakeDirection) {
  clearInterval(snakeInterval); // Stop the previous interval
  snakeInterval = setInterval(() => {
    movePlayer(playerHead.x + snakeDirectionCoords[0], Number(playerHead.y) + Number(snakeDirectionCoords[1]), snakeDirection)
  }, time);
}
