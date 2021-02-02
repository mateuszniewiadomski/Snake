let startTime, endTime
export let timeDiff
let calculate 

export function start() {
    startTime = new Date()
    timeoutStart()
}

function timeoutStart() {
    calculate = setTimeout(calculateElapsedTime, 1000)
}

export function timeoutStop() {
    clearTimeout(calculate)
}


function calculateElapsedTime() {
    endTime = new Date()
    timeDiff = endTime - startTime
    timeDiff /= 1000
    timeDiff = Math.round(timeDiff)

    if(timeDiff < 60) document.getElementById('current-time').innerText = 'Time: 0 m ' + timeDiff + ' s'
    else document.getElementById('current-time').innerText = 'Time: ' + Math.floor(timeDiff/60) + ' m ' + timeDiff%60 + ' s'
    
    timeoutStart()
}

export function getTimdeDiff() {
    return Math.floor(timeDiff/60) + ' m ' + timeDiff%60 + ' s'
}