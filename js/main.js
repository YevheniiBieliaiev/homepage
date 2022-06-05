const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

//the sides of the square
let squareSide = 20;
//variables for random speed
let minSpeed = 0.5;
let maxSpeed = 2;
//variable for random interval
let minTime = 200;
let maxTime = 3000;
//to determine coordinate X
let startX = 0;
let endX = canvas.width - squareSide;
//for color
let starColor = 0;
let endColor = 255;
//function for random number (in the range) - color, speed, coordinate Х, time interval
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//function for random speed
function randomSpeedd(min, max) {
  return Math.random() * (max - min) + min;
}
//function for random color
function randomColor() {
  return "rgb(" + randomNumber(starColor, endColor) + "," + randomNumber(starColor, endColor) + "," + randomNumber(starColor, endColor) + ")";
}
//storage array
let squares = [];
//counter
let scoreCounter = 0;


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //square drawing
  function drawSquare(obj) {
    ctx.beginPath();
    ctx.rect(obj.x, obj.y, obj.squareSide, obj.squareSide);
    ctx.fillStyle = obj.color;
    ctx.fill();
    ctx.closePath();
  }
  function draw() {
    for (let i = 0; i < squares.length; i++) {
      drawSquare(squares[i]);
      if (squares[i].y <= canvas.height) {
        squares[i].y += squares[i].ySpeed;
      } else {
        squares.splice(i, 1);
      }
    }
  }
  draw();
  requestAnimationFrame(animate);
}

let timeID;
//drawing start
document.querySelector(".start").addEventListener("click", event => {
  if (event.target) {
    timeID = setInterval(function () {
      const square = {
        x: randomNumber(startX, endX),
        y: 0,
        squareSide: squareSide,
        color: randomColor(),
        ySpeed: randomSpeedd(minSpeed, maxSpeed),
      };
      squares.push(square);
    }, randomNumber(minTime, maxTime));
  }
});
//stop and clearance
document.querySelector(".stop").addEventListener("click", event => {
  if (event.target) {
    clearInterval(timeID);
    squares.splice(0);
    document.querySelector("#score").textContent = 0;
  }
});

canvas.addEventListener('click', (event) => {
  squares.map((item, index) => {
    if ((event.offsetX > item.x && event.offsetY > item.y) &&
      (event.offsetX < item.x + squareSide && event.offsetY < item.y + squareSide)) {
      squares.splice(index, 1);
      document.querySelector("#score").textContent = ++scoreCounter;
    }
  })
});
document.body.onload = animate;

