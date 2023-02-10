let board = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎", "♟︎"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
]

var elements = document.body.querySelectorAll("td");
var selectedPiece;
var cellIndex;
var rowIndex;

for (i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", function(event) {
    if (!selectedPiece) {
      selectPiece(event);
    } else if (event.target === selectedPiece) {
      deselectPiece();
    } else {
      selectDestination(event);
    }
  });
}

function selectPiece(event) {
  selectedPiece = event.target;
  cellIndex = selectedPiece.cellIndex;
  rowIndex = selectedPiece.parentNode.rowIndex;
  if (!checkPiece(cellIndex-1, rowIndex-1)) {
    selectedPiece = null;
  } else {
    selectedPiece.classList.add("selected");
  }
}

function deselectPiece() {
  selectedPiece.classList.remove("selected");
  selectedPiece = null;
}

function selectDestination(event) {
  var selectedDestination = event.target;
  var destinationcellIndex = selectedDestination.cellIndex;
  var destinationrowIndex = selectedDestination.parentNode.rowIndex;
  selectedPiece.classList.remove("selected");
  selectedPiece = null;
  move(cellIndex-1, rowIndex-1, destinationcellIndex-1, destinationrowIndex-1)
}

function draw() {
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      elements[x*8+y].innerText = board[x][y];
    }
  }
}

function move(x, y, newx, newy) {
  board[newy][newx] = board[y][x];
  board[y][x] = "";
  draw();
}

function checkPiece(x, y) {
  if (board[y][x] == "") {
    return false;
  }
  return true;
}

draw();