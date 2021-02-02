import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, snakeIntersection, setSnakeSpeed } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { paintBorders } from './grid.js'
import { start as startTimer, timeoutStop } from './time.js'
import { removeElementFadeOut } from './animation.js'
import { createMenuStart, createMenuEnd, createMenuHighScore } from './menu.js'
import { getScore } from './score.js'
import { ai } from './ai.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')
let gameStart = true
let aiGame = false

document.getElementById('turn-on-ai').addEventListener('click', function() { aiStart() })


checkClick()
createMenuStart()


function checkClick() {
    window.addEventListener('keydown', e => {
        if(gameStart === true) {
            if(e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                removeElementFadeOut(document.getElementById('start-menu'))
                startGame()
                gameStart = false
           }
        }
    })
}

export function aiStart() {
    if(gameStart === true) {
        removeElementFadeOut(document.getElementById('start-menu'))
        gameStart = false
        startGame()
    }
    if(aiGame === true) {
        setSnakeSpeed(0)
        aiGame = false
        document.getElementById('turn-on-ai').innerHTML = 'Turn on AI'
    }
    else {
        setSnakeSpeed(10)
        aiGame = true
        document.getElementById('turn-on-ai').innerHTML = 'Turn off AI'
    }
}

function startGame() {
    paintBorders()
    window.requestAnimationFrame(main)
    startTimer()
}

function main(currentTime) {
    if(Number(getScore()) == 240) gameOver = true
    if(gameOver) {
        const newScore = Number(getScore())
        const lastScore = Number(document.querySelector("#high-scores-table > tbody > tr:last-child  > td:nth-child(2)").textContent)
        const fullScore = Number(document.querySelector("#high-scores-table > tbody > tr:last-child  > td:nth-child(1)").textContent)
        if(newScore > lastScore || fullScore < 15) createMenuHighScore()
        else createMenuEnd()
        timeoutStop()
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return
    lastRenderTime = currentTime
    
    update()
    draw()
}

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
    if(aiGame == true) {
        ai()
    }
}

function checkDeath() {
    gameOver = snakeIntersection()
}