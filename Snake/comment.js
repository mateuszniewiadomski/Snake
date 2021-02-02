const place = document.getElementById('rates-and-comments-new')
let enterRate = new Array(10)

setButton()

function setButton() {
    const button = document.createElement('button')
    button.innerHTML = '+ Add'
    
    place.appendChild(button)
    button.addEventListener('click', function() { 
        button.parentNode.removeChild(button)
        addForm() 
    })
}

function addForm() {
    
    place.style = 'margin: 0;min-width: 80vh; width: 70vw;background-color: #fff;border: 1px solid lightgray; margin-top: 2vw'


    const form = document.createElement('form')
    const enterNick = document.createElement('input')
    const enterNickTitle = document.createElement('div')
    const rateTitle = document.createElement('div')
    const commentTitle = document.createElement('div')
    const rate = document.createElement('input')
    const enterComment = document.createElement('textarea')
    const submit = document.createElement('input')
    const topBox = document.createElement('div')
    const leftBox = document.createElement('div')
    const rightBox = document.createElement('div')
    const bottomBox = document.createElement('div')

    let tmpRate

    topBox.id = 'top-box'
    leftBox.id = 'left-box'
    rightBox.id = 'right-box'
    bottomBox.id = 'bottom-box'

    enterNickTitle.innerHTML = 'Enter your name *'
    rateTitle.innerHTML = 'Rate *'
    commentTitle.innerHTML = 'Comment'

    enterNick.type = 'text'
    enterNick.name = 'fname'
    enterNick.placeholder = 'YOUR NAME'
    enterNick.name = 'nick'

    enterComment.rows = '4'
    enterComment.placeholder = 'Comment'
    enterComment.name = 'comment'
    enterComment.value = ' '
    enterComment.maxLength = '300'

    submit.type = 'submit'
    submit.id = 'comment-submit'
    submit.value = 'Submit'.toUpperCase()
    

    rate.style.display = 'none'
    rate.name = 'rate'

    for(let i = 0; i < 10; i++) {
        enterRate[i] = document.createElement('span')
        enterRate[i].innerHTML = '☆'
        enterRate[i].style = 'cursor: pointer; margin: 3px;'
    }

    enterComment.id ='comment'

    place.appendChild(form)
    form.appendChild(topBox)
    topBox.appendChild(leftBox)
    topBox.appendChild(rightBox)
    form.appendChild(bottomBox)
    form.appendChild(rate)
    leftBox.appendChild(enterNickTitle)
    leftBox.appendChild(enterNick)
    rightBox.appendChild(rateTitle)

    for(let i = 0; i < 10; i++) {
        rightBox.appendChild(enterRate[i])
        enterRate[i].addEventListener('click', function() { 
            updateStars(i)
            tmpRate = i
            rate.value = i+1
        })
        enterRate[i].addEventListener('mouseover', function() { 
            updateStars(i)
        })
        enterRate[i].addEventListener('mouseout', function() { 
            updateStars(tmpRate)
        })
    }

    bottomBox.appendChild(commentTitle)
    bottomBox.appendChild(enterComment)
    bottomBox.appendChild(submit)

    document.getElementById('comment-submit').addEventListener('click', function() { 
        if(rate.value == null || enterNick.value == '' || enterNick.value == null) {
            submit.disabled = true
        } else {
            form.action = './updateComments.php'
            form.method = 'post'   
        }     
        setTimeout(function() { submit.disabled = false }, 1)
    })
}

function updateStars(rate) {
    for(let i = 0; i < 10; i++) {
        if (i <= rate) {
            enterRate[i].innerHTML = '★'
            enterRate[i].style = 'color: orange; cursor: pointer; margin: 3px;'
        } else {
            enterRate[i].innerHTML = '☆'
            enterRate[i].style = 'color: black; cursor: pointer; margin: 3px;'
        }
    }
}