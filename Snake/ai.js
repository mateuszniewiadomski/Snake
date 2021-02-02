import { setInputDirection, getLastInputDirection } from './input.js'
import { getSnake } from './snake.js'
import { getFoodPosition } from './food.js'

export function ai() {
    let food = getFoodPosition()
    let snake = getSnake()
    let cost = [0,0,0,0]

    function checkUp() {
        let clear = true
        snake.forEach(body => {
            if(body.y % 21 === (snake[0].y - 1) % 21) clear = false
        });
        return clear
    }
    
    function checkDown() {
        let clear = true
        snake.forEach(body => {
            if(body.y % 21 === (snake[0].y + 1) % 21) clear = false
        });
        return clear
    }
    
    function checkLeft() {
        let clear = true
        snake.forEach(body => {
            if(body.x % 21 === (snake[0].x - 1) % 21) clear = false
        });
        return clear
    }
    
    function checkRight() {
        let clear = true
        snake.forEach(body => {
            if(body.x % 21 === (snake[0].x + 1) % 21) clear = false
        });
        return clear
    }

    if((food.y - snake[0].y) > 0) {
        cost[0]++
        cost[2]++
        cost[3]++
    }

    if((food.y - snake[0].y) < 0) {
        cost[1]++
        cost[2]++
        cost[3]++
    }

    if((food.x - snake[0].x) > 0) {
        cost[2]++
        cost[0]++
        cost[1]++
    } 

    if((food.x - snake[0].x) < 0) {
        cost[3]++
        cost[0]++
        cost[1]++
    } 
/*
    if(food.y < snake[0].y) {
        cost[0]++
        cost[2]++
        cost[3]++
    } if(food.y > snake[0].y) {
        cost[1]++
        cost[2]++
        cost[3]++
    }
    if(food.x < snake[0].x) {
        cost[3]++
        cost[0]++
        cost[1]++
    }
    if(food.x > snake[0].x) {
        cost[2]++
        cost[0]++
        cost[1]++
    }
    */
    if(food.x == snake[0].x) {
        cost[2]++
        cost[3]++
        if((food.y - snake[0].y) > 0) {
            cost[0]++
            cost[1]--
        }
    }
    if (food.y == snake[0].y) {
        cost[0]++
        cost[1]++
        if((food.x - snake[0].x) > 0) {
            cost[2]++
            cost[3]--
        }
    }

    if(!checkUp()) cost[0]+=100
    if(!checkDown()) cost[1]+=100
    if(!checkLeft()) cost[2]+=100
    if(!checkRight()) cost[3]+=100

    console.log('up: '+cost[0]+', down: '+cost[1]+', left: '+cost[2]+', righ: '+cost[3]);
    whereToGo(cost.indexOf(Math.min(...cost)))
}

function whereToGo(direction) {
    switch (direction) {
        case 0:
            up()
            break;
        case 1:
            down()
            break;
        case 2:
            left()
            break;
        case 3:
            right()
            break;
        default:
            break;
    }
}

function up() {
    setInputDirection({ x: 0, y: -1 })
}

function down() {
    setInputDirection({ x: 0, y: 1 })
}

function left() {
    setInputDirection({ x: -1, y: 0 })
}

function right() {
    setInputDirection({ x: 1, y: 0 })
}

/*
    if(food.x > snake[0].x) {
        if(lastInputDirection.x !== 0) right()
        else {
            if(food.y > snake[0].y) {
                if(lastInputDirection.y !== 0) down()
            } else if(food.y < snake[0].y) {
                if(lastInputDirection.y !== 0) up()
            }
        }
    } else if(food.x < snake[0].x) {
        if(lastInputDirection.x !== 0) left()
        else {
            if(food.y > snake[0].y) {
                if(lastInputDirection.y !== 0) down()
            } else if(food.y < snake[0].y) {
                if(lastInputDirection.y !== 0) up()
            }
        }
    } else {
        if(food.y > snake[0].y) {
            if(lastInputDirection.y !== 0) down()
        } else if(food.y < snake[0].y) {
            if(lastInputDirection.y !== 0) up()
        }
    }
    */