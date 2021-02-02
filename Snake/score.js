let score = 'Score: ' + 0 + ' points'

export function updateScore(showScore) {
    score = 'Score: ' + showScore + ' points'
    document.getElementById('current-score').innerText = score
}

export function getScore() {
    return score.replace('Score: ', '').replace(' points','')
}
