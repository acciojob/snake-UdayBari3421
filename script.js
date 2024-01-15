document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("gameContainer");
    const scoreElement = document.getElementById("score");

    const pixelSize = 40;
    const containerSize = 400;
    const totalPixels = containerSize / pixelSize;

    const snake = [{ row: 20, col: 1 }];
    let direction = "right";
    let food = {};
    let score = 0;

    function createPixel(id, className) {
        const pixel = document.createElement("div");
        pixel.id = "pixel" + id;
        pixel.className = className;
        return pixel;
    }

    function createFood() {
        const foodRow = Math.floor(Math.random() * totalPixels);
        const foodCol = Math.floor(Math.random() * totalPixels);
        const foodId = foodRow * totalPixels + foodCol;

        if (snake.some((pixel) => pixel.row === foodRow && pixel.col === foodCol)) {
            return createFood();
        }

        food = { row: foodRow, col: foodCol };
        const foodPixel = createPixel(foodId, "pixel food");
        gameContainer.appendChild(foodPixel);
    }

    function updateSnake() {
        const head = Object.assign({}, snake[0]);

        switch (direction) {
            case "up":
                head.row--;
                break;
            case "down":
                head.row++;
                break;
            case "left":
                head.col--;
                break;
            case "right":
                head.col++;
                break;
        }

        if (head.row < 0 || head.row >= totalPixels || head.col < 0 || head.col >= totalPixels) {
            gameOver();
            return;
        }

        if (snake.some((pixel) => pixel.row === head.row && pixel.col === head.col)) {
            gameOver();
            return;
        }

        snake.unshift(head);

        if (head.row === food.row && head.col === food.col) {
            score++;
            scoreElement.innerText = score;
            gameContainer.removeChild(document.getElementById("pixel" + (food.row * totalPixels + food.col)));
            createFood();
        } else {
            const tail = snake.pop();
            document.getElementById("pixel" + (tail.row * totalPixels + tail.col)).classList.remove("snakeBodyPixel");
        }

        const headPixel = document.getElementById("pixel" + (head.row * totalPixels + head.col));
        headPixel.classList.add("snakeBodyPixel");
    }

    function changeDirection(event) {
        const key = event.keyCode;
        if (key === 37 && direction !== "