import { getTimdeDiff } from './time.js'
import { getScore } from './score.js'

const menuElement = document.getElementById('menu')

export function createMenuStart() {
    const start = document.createElement('div')
    start.id = 'start-menu'
    start.innerHTML = 'Press any arrow key to start'
    menuElement.appendChild(start)
}

export function createMenuEnd() {
    const end = document.createElement('div')
    const submit = document.createElement('input')
    
    end.id = 'end-menu'
    end.innerHTML = 'Game Over'

    submit.type = 'submit'
    submit.id = 'restart'
    submit.value = 'Restart'.toUpperCase()

    menuElement.appendChild(end)
    menuElement.appendChild(submit)
   
    document.getElementById('restart').addEventListener('click', function() { location.reload() })
}

export function createMenuHighScore() {
    const form = document.createElement('form')
    const highScore = document.createElement('div')
    const enterNick = document.createElement('input')
    const submit = document.createElement('input')
    const time = document.createElement('input')
    const score = document.createElement('input')
    highScore.id = 'high-score-menu'
    highScore.innerHTML = 'New High Score!'
    
    enterNick.type = 'text'
    enterNick.name = 'fname'
    enterNick.placeholder = 'YOUR NAME'
    enterNick.name = 'nick'

    submit.type = 'submit'
    submit.id = 'submit'
    submit.value = 'Submit'.toUpperCase()

    time.type = 'text'
    time.value = getTimdeDiff()
    time.name = 'time'
    time.style.display = 'none'

    time.type = 'text'
    score.value = getScore()
    score.name = 'score'
    score.style.display = 'none'

    menuElement.appendChild(form)
    form.appendChild(highScore)
    form.appendChild(enterNick)
    form.appendChild(submit)
    form.appendChild(time)
    form.appendChild(score)

    document.getElementById('submit').addEventListener('click', function() { 
        form.action = './updateHighScores.php'
        form.method = 'post'
    })
}