//board
let blocksize = 10;
let rows = 40.0;
let column = 40.0;
let board;
let context;
let count = 0;

//snake
let snakeX = blocksize * 20.0;
let snakeY = blocksize * 20.0;

let velocityX = 0.0;
let velocityY = 0.0;

var snakebody = [];

// food
let foodX = 0;
let foodY = 0;


let gameover = false;


window.onload = function () {
    board = document.getElementById("gamecontainer")
    board.height = rows * blocksize;
    board.width = column * blocksize;
    context = board.getContext("2d")

    placefood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000 / 8)
}
function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    if (snakeX == foodX && snakeY == foodY) {
        snakebody.push([foodX, foodY])
        placefood();
        count++;
        document.getElementById("score").innerHTML = count;
    }

    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1];
    }
    if (snakebody.length) {
        snakebody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "white";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);

    for (var i = 0; i < snakebody.length; i++) {
        context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize);
    }

    //gameover conditon
    if (snakeX < 0 || snakeX > column * blocksize || snakeY < 0 || snakeY > rows * blocksize) {
        gameover = true;
        // alert("gameOver")
       // update();
    }

    for (let i = 0; i < snakebody.length; i++) {
        if (snakeX == snakebody[i][0] && snakeY == snakebody[i][1]) {
            // alert('gameOver');
           // update();
        }
    }

}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// placing food at random places
function placefood() {
    foodX = Math.floor(Math.random(0.0) * column) * blocksize;
    foodY = Math.floor(Math.random(0.0) * rows) * blocksize
}