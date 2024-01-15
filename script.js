let lastRenderTime = 0;
let gameOver = false;
const SNAKE_SPEED = 10;
const gameBoard = document.getElementById('gameContainer'),
      scoreBoard = document.getElementById('score');
const snakeBody = [{x:20,y:1,}];

function main(time) {
    renderGameBoard();
    requestAnimationFrame(main);
      
    const lastRenderSecond = (time - lastRenderTime) / 100;
    if(lastRenderSecond < 1 / SNAKE_SPEED) {

      return
      
    };

    if(gameOver) {
        alert("Game Over");
        scoreBoard.textContent = 0;
        gameOver = false;
        return ;
    }
    lastRenderTime = time;
    gameBoard.innerHTML = '';
    update();
   

}

window.requestAnimationFrame(main);

function update() {
    moveSnake();
    moveFood();
    scoreBoard.textContent = getScore();
    const snakeHead = getSnakeHead();

    if(snakeHead.x > 40 || snakeHead.x < 1 || snakeHead.y > 40 || snakeHead.y <1) {
        gameOver = true;
    }

    if(isSnakeIntersected()) {
        console.log("Intersected");
        gameOver = true;
    }
}

function renderGameBoard() {
    renderSnake(gameBoard);
    renderFood(gameBoard);
}

 function renderSnake(gameBoard) {
    
        snakeBody.forEach(segment=> {
          const snakeBodyElement = document.createElement("div");
          snakeBodyElement.style.gridRowStart = segment.x;
          snakeBodyElement.style.gridColumnStart = segment.y;
          snakeBodyElement.classList.add(".snakeBodyPixel");
          gameBoard.appendChild(snakeBodyElement);
        })
}

function moveSnake () {
   
    for(let i = snakeBody.length-2; i >= 0; i--) {
        snakeBody[i+1] = {...snakeBody[i]};  
    }

    const inputDirection = getInputDirection();
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

function onSnake(position) {
   
  return snakeBody.some((segment) => {
     
    return segment.x === position.x && segment.y === position.y;
  });
}

function checkIntersection(position) {
    const newSnake = [...snakeBody];
    newSnake.shift();
    console.log(newSnake,snakeBody);
     return newSnake.some((segment) => {
       return segment.x === position.x && segment.y === position.y;
     });

}
 function expandSnake() {
    // We will add a segment to this snake
    snakeBody.push({...snakeBody[snakeBody.length-1]});
}

 function getSnakeHead() {
    return snakeBody[0];
}

 function isSnakeIntersected() {
    console.log("Snake intersection")
    const val =  checkIntersection(snakeBody[0]);
    console.log("SNake",val);
}

let food = {
            x: Math.round(Math.random() * 40) +1,
            y : Math.round(Math.random() * 40) + 1
          };
let score = 0;

 function getScore () {
    return score;
}

 function renderFood (gameBoard) {
    const foodElement = document.createElement("div");

    // set its position in our game board
    foodElement.style.gridRowStart = food.x;
    foodElement.style.gridColumnStart = food.y;

    gameBoard.appendChild(foodElement);

    foodElement.classList.add("food");   
}

 function moveFood () {
    // If any part of snake body collide with this food

    if(onSnake(food,false)) {
        score ++;
        // Expand snake by 1
            expandSnake();
            food = {
                x: Math.round(Math.random() * 40) +1,
                y : Math.round(Math.random() * 40) + 1
            };
        // update food position 
    }
}
let inputDirection = {x:0,y:0};

document.addEventListener('keydown',(event) => {
  
      if (event.key == "ArrowUp" && inputDirection.x !== 1 ) {
        
          inputDirection = { x: -1, y: 0 };
          
        }
      else if(event.key == "ArrowDown" && inputDirection.x !== -1 ){

        inputDirection = { x: 1, y: 0 };

      }
      else if(event.key == "ArrowLeft" && inputDirection.y !== 1 ){

        inputDirection = { x: 0, y: -1 };
        
      }
      else if(event.key == "ArrowRight" && inputDirection.y !== -1 ){

        inputDirection = { x: 0, y: 1 };
    
      }
       
})

 function getInputDirection() {
  
  return inputDirection;
  
}