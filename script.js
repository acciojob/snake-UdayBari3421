//your code here
const gameContainer = document.getElementById('gameContainer');
const scoreSpan = document.getElementById('score');

// Generate pixels
for (let i = 0; i < 40; i++) {
  for (let j = 0; j < 40; j++) {
    const pixel = document.createElement('div');
    pixel.id = `pixel${i * 40 + j + 1}`;
    pixel.classList.add('pixel');
    gameContainer.appendChild(pixel);
  }
}