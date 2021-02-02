export const GRID_SIZE = 21

export function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

export function paintBorders() {
    const gameBoardBorder = document.getElementById('game-board-border')
    for (let j = 1; j <= GRID_SIZE; j++) {
        for (let i = 1; i <= GRID_SIZE; i++) {
            const border = document.createElement('border')
            border.style.gridColumnStart = j
            border.style.gridRowStart = i
            border.classList.add('border')
            gameBoardBorder.appendChild(border)
            border.style.opacity = 0
            setTimeout(function() { 
                border.style.transition = 'opacity ' + 2 + 's ease'
                border.style.opacity = 1 }, 2)
        }
    }
}