createGrid();
startGame();

function resetGame() {
    let playerBodyPieces = document.querySelectorAll('.player-body')
    let playerHeadPiece = document.getElementById('player')
    playerHeadPiece.remove()
    for (let i = 0; i < playerBodyPieces.length; i++) {
        playerBodyPieces[i].remove();
    }
    startGame()
}

function startGame() {
    initialize()
    createPlayer()
    addToPlayerBody()
    addToPlayerBody()
    addToPlayerBody()
    generateFood();
}