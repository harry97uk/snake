function animateSnake(piece, bodyPiece = null) {
    let id = null;
    let elem
    if (!bodyPiece) {
        elem = document.getElementById("player"); 
    } else {
        elem = document.getElementById(`player-body${bodyPiece}`)
    }
      
    clearInterval(id);
    let dx = (piece.targetPosition[0]-piece.x)/40
    let dy = (piece.targetPosition[1]-piece.y)/40
    id = setInterval(frame, 5);
    function frame() {
      if (piece.x == piece.targetPosition[0] || piece.y == piece.targetPosition[1]) {
        clearInterval(id);
      } else {
        elem.style.top = piece.x + dx + "px"; 
        elem.style.left = piece.y + dy + "px"; 
      }
    }
  }