export function removeElementFadeOut(element) {
    element.style.transition = 'opacity ' + 1 + 's ease'
    element.style.opacity = 0
    setTimeout(function() {
        element.parentNode.removeChild(element)
    }, 1000)
}

export function changeSnakeColor(color) {
    element.style.transition = 'opacity ' + 1 + 's ease'
    element.style.opacity = 0
}