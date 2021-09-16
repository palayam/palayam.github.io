let gameScreen = document.getElementById("gameScreen")
let endScreen = document.getElementById("endScreen")
let canvas = document.getElementById("myCanvas")
let scoreDisplay = document.getElementById("score-display")
let finalScoreDisplay = document.getElementById("final-score-display")
let liveDisplay = document.getElementById("live-display")
let livesDisplay = document.getElementById("lives-display")
let ctx = canvas.getContext("2d")
let ballRadius = 5
let x = canvas.width/2
let y = canvas.height-10-30
let velocity = 6
let dx = velocity
let dy = -velocity

let lArrow = document.getElementById("lArrow")
let rArrow = document.getElementById("rArrow")
$(lArrow).hide()

let startLeft = false
document.addEventListener('keyup', event => {
  if (event.keyCode === 78 && gameStarted === false) {
    dx = -velocity
    startLeft = true
    $(lArrow).show()
    $(rArrow).hide()
  } else if (event.keyCode === 77 && gameStarted === false) {
    dx = velocity
    startLeft = false
    $(lArrow).hide()
    $(rArrow).show()
  }
})
let paddleHeight = 10
let paddleWidth = 80
let paddleX = (canvas.width-paddleWidth)/2
let paddleY = canvas.height-10-paddleHeight

let twoPaddleHeight = 10
let twoPaddleWidth = 80
let twoPaddleX = (canvas.width-twoPaddleWidth)/2
let twoPaddleY = canvas.height-30-twoPaddleHeight

let rightPressed = false
let leftPressed = false

let rightPressedTwo = false
let leftPressedTwo = false

let wantSecondPaddle = false

let brickRowCount = 10
let brickColumnCount = 10
let brickWidth = 40
let brickHeight = 10
let brickPadding = 5
let brickOffsetTop = 30
let brickOffsetLeft = 20
let gameStarted = false
let score = 0
let lives = 3
liveDisplay.innerHTML = lives
livesDisplay.innerHTML = lives
let wantAutoPaddle = false
let gameEnded = false
let maxScore = 0

let bricks = []
for(c=0; c<brickColumnCount; c++) {
  bricks[c] = []
  for(r=0; r<brickRowCount; r++) {
    let randNum = Math.random()
    if (randNum<0.150) {
      // 15% chance
      bricks[c][r] = { x: 0, y: 0, status: 2 }
      maxScore+=5
    } else if (randNum<0.250) {
      // 10% chance
      bricks[c][r] = { x: 0, y: 0, status: 3 }
      maxScore+=6
    } else if (randNum<0.280) {
      // 3% chance
      bricks[c][r] = { x: 0, y: 0, status: 4 }
      maxScore+=10
    } else if (randNum<0.285) {
      // 0.5% chance
      bricks[c][r] = { x: 0, y: 0, status: 5 }
      maxScore+=100
    } else if (randNum<0.305) {
      // 2% chance
      bricks[c][r] = { x: 0, y: 0, status: 6 }
      maxScore+=10
    } else if (randNum<0.320) {
      // 1.5% chance
      bricks[c][r] = { x: 0, y: 0, status: 7 }
      maxScore+=10
    } else {
      // 71.5% chance
      bricks[c][r] = { x: 0, y: 0, status: 1 }
      maxScore+=3
    }
  }
}

document.addEventListener("keydown", keyDownHandler)
document.addEventListener("keyup", keyUpHandler)

function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true
  } else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true
  }
}

function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false
  } else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false
  }
}

document.addEventListener("keydown", keyDownHandlerTwo)
document.addEventListener("keyup", keyUpHandlerTwo)

function keyDownHandlerTwo(e) {
  if(e.keyCode === 68) {
    rightPressedTwo = true
    console.log("d");
  } else if(e.keyCode === 65) {
    leftPressedTwo = true
    console.log("a");
  }
}

function keyUpHandlerTwo(e) {
  if(e.keyCode === 68) {
    rightPressedTwo = false
  } else if(e.keyCode === 65) {
    leftPressedTwo = false
  }
}

document.addEventListener("mousemove", mouseMoveHandler)

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2
  }
}

function autoPaddle() {
  paddleX = x - (paddleWidth/2)
}

function collisionDetection() {
  for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
      let b = bricks[c][r]
      if (b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy
          b.status = 0
          score+=3
          finalScoreDisplay.innerHTML = score
          scoreDisplay.innerHTML = score
          if(score >= maxScore) {
            gameOver()
            gameEnded = true
            return
          }
        }
      } else if (b.status === 2) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dx = -dx
          b.status = 1
          score+=2
          finalScoreDisplay.innerHTML = score
          scoreDisplay.innerHTML = score
          if(score >= maxScore) {
            gameOver()
            gameEnded = true
            return
          }
        }
      } else if (b.status === 3) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dx = -dx
          b.status = 2
          score++
          finalScoreDisplay.innerHTML = score
          scoreDisplay.innerHTML = score
          if(score >= maxScore) {
            gameOver()
            gameEnded = true
            return
          }
        }
      } else if (b.status === 4) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          paddleWidth = 120
          twoPaddleWidth = 120
          setTimeout(function(){ paddleWidth = 80 }, 10000)
          setTimeout(function(){ twoPaddleWidth = 80 }, 10000)
          dx = -dx
          b.status = 0
          score+=10
          finalScoreDisplay.innerHTML = score
          scoreDisplay.innerHTML = score
          if(score >= maxScore) {
            gameOver()
            gameEnded = true
            return
          }
        }
      } else if (b.status === 5) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dx = -dx
          b.status = 0
          score+=100
          finalScoreDisplay.innerHTML = score
          scoreDisplay.innerHTML = score
          if(score >= maxScore) {
            gameOver()
            gameEnded = true
            return
          }
        }
      } else if (b.status === 6) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          wantSecondPaddle = true
          dx = -dx
          b.status = 0
          score+=10
          finalScoreDisplay.innerHTML = score
          scoreDisplay.innerHTML = score
          if(score >= maxScore) {
            gameOver()
            gameEnded = true
            return
          }
        }
      } else if (b.status === 7) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          lives++
          livesDisplay.innerHTML = lives
          dx = -dx
          b.status = 0
          score+=10
          finalScoreDisplay.innerHTML = score
          scoreDisplay.innerHTML = score
          if(score >= maxScore) {
            gameOver()
            gameEnded = true
            return
          }
        }
      }
    }
  }

  if (gameEnded) {
    return
  }
}

function drawBall() {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI*2)
  ctx.fillStyle = "#000000"
  ctx.fill()
  ctx.closePath()
  ctx.beginPath()
  ctx.arc(x, y, ballRadius-1, 0, Math.PI*2)
  ctx.fillStyle = "#0095DD"
  ctx.fill()
  ctx.closePath()
}

function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight)
  ctx.fillStyle = "#000000"
  ctx.fill()
  ctx.closePath()
  ctx.beginPath()
  ctx.rect(paddleX+1, paddleY+1, paddleWidth-2, paddleHeight-2)
  ctx.fillStyle = "#0095DD"
  ctx.fill()
  ctx.closePath()
}

function drawSecondPaddle() {
  ctx.beginPath()
  ctx.rect(twoPaddleX, twoPaddleY, twoPaddleWidth, twoPaddleHeight)
  ctx.fillStyle = "#000000"
  ctx.fill()
  ctx.closePath()
  ctx.beginPath()
  ctx.rect(twoPaddleX+1, twoPaddleY+1, twoPaddleWidth-2, twoPaddleHeight-2)
  ctx.fillStyle = "#004a6e"
  ctx.fill()
  ctx.closePath()
}

function drawBricks() {
  for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        let brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft
        let brickY = (c*(brickHeight+brickPadding))+brickOffsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = "#000000"
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.rect(brickX+1, brickY+1, brickWidth-2, brickHeight-2)
        ctx.fillStyle = "#87CEFA"
        ctx.fill()
        ctx.closePath()
      } else if (bricks[c][r].status === 2) {
        let brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft
        let brickY = (c*(brickHeight+brickPadding))+brickOffsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = "#000000"
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.rect(brickX+1, brickY+1, brickWidth-2, brickHeight-2)
        ctx.fillStyle = "#4169E1"
        ctx.fill()
        ctx.closePath()
      } else if (bricks[c][r].status === 3) {
        let brickX = (r*(brickWidth+brickPadding)) + brickOffsetLeft
        let brickY = (c*(brickHeight+brickPadding)) + brickOffsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = "#000000"
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.rect(brickX+1, brickY+1, brickWidth-2, brickHeight-2)
        ctx.fillStyle = "#000080"
        ctx.fill()
        ctx.closePath()
      } else if (bricks[c][r].status === 4) {
        let brickX = (r*(brickWidth+brickPadding)) + brickOffsetLeft
        let brickY = (c*(brickHeight+brickPadding)) + brickOffsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = "#000000"
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.rect(brickX+1, brickY+1, brickWidth-2, brickHeight-2)
        ctx.fillStyle = "#DC143C"
        ctx.fill()
        ctx.closePath()
      } else if (bricks[c][r].status === 5) {
        let brickX = (r*(brickWidth+brickPadding)) + brickOffsetLeft
        let brickY = (c*(brickHeight+brickPadding)) + brickOffsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = "#000000"
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.rect(brickX+1, brickY+1, brickWidth-2, brickHeight-2)
        ctx.fillStyle = "#DAA520"
        ctx.fill()
        ctx.closePath()
      } else if (bricks[c][r].status === 6) {
        let brickX = (r*(brickWidth+brickPadding)) + brickOffsetLeft
        let brickY = (c*(brickHeight+brickPadding)) + brickOffsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = "#000000"
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.rect(brickX+1, brickY+1, brickWidth-2, brickHeight-2)
        ctx.fillStyle = "#FFFDD0"
        ctx.fill()
        ctx.closePath()
      } else if (bricks[c][r].status === 7) {
        let brickX = (r*(brickWidth+brickPadding)) + brickOffsetLeft
        let brickY = (c*(brickHeight+brickPadding)) + brickOffsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = "#000000"
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.rect(brickX+1, brickY+1, brickWidth-2, brickHeight-2)
        ctx.fillStyle = "#007A33"
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.rect(brickX+18, brickY+1, brickWidth/10, brickHeight-2)
        ctx.fillStyle = "#FFFFFF"
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.rect(brickX+14, brickY+4, brickWidth/(10/3), brickHeight/(10/3))
        ctx.fillStyle = "#FFFFFF"
        ctx.fill()
        ctx.closePath()
      }
    }
  }
}

function gameOver() {
  $(gameScreen).slideUp("slow")
  // $(gameScreen).hide()
  $(endScreen).show()
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBricks()
  drawBall()
  drawPaddle()
  collisionDetection()

  if (wantAutoPaddle === true) {
    setInterval(autoPaddle(), 10)
  }

  if (wantSecondPaddle == true) {
    drawSecondPaddle()
    setTimeout(function(){ wantSecondPaddle = false }, 15000)
  }

  if (y + dy > canvas.height-30-ballRadius) {
    if (x > twoPaddleX && x < twoPaddleX + twoPaddleWidth && dy > 0) {
      dy = -dy
    }
  }
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx
  }
  if(y + dy < ballRadius) {
    dy = -dy
  } else if(y + dy > canvas.height-10-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy
    } else {
      lives--
      livesDisplay.innerHTML = lives
      if(!lives) {
        gameOver()
        gameEnded = true
        return
      } else {
        x = canvas.width/2
        y = canvas.height-10-30
        if (startLeft) {
          dx = -velocity
        } else {
          dx = velocity
        }
        dy = -velocity
        paddleX = (canvas.width-paddleWidth)/2
      }
    }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7
  } else if(leftPressed && paddleX > 0) {
    paddleX -= 7
  }

  if(rightPressedTwo && twoPaddleX < canvas.width-twoPaddleWidth) {
    twoPaddleX += 7
  } else if(leftPressedTwo && twoPaddleX > 0) {
    twoPaddleX -= 7
  }

  x += dx
  y += dy

  if (gameEnded == false) {
    requestAnimationFrame(draw)
  }
}

const init = () => {
  drawBricks()
  drawBall()
  drawPaddle()

  document.addEventListener('keyup', event => {
    if (event.code === 'Space' && gameStarted === false) {
      draw()
      gameStarted = true
      $(lArrow).hide()
      $(rArrow).hide()
    } else if (event.keyCode === 67 && gameStarted === true) {
      wantAutoPaddle = true
    } else if (event.keyCode === 86 && gameStarted === true) {
      wantAutoPaddle = false
    } else if (event.keyCode === 71 && gameStarted === true) {
      gameOver()
      gameEnded = true
    }
  })

  $(gameScreen).show()
  $(endScreen).hide()
}

init()
