let max = 5 //defualt max score played to
let isGameOver = false; //to initiate game state

const maxPts = document.querySelector('#maxPts') //to select elemens from html
const resetBtn = document.querySelector('#reset')

const p1 = {
    score: 0,
    button: document.querySelector('#p1Btn'),
    display: document.querySelector('#p1Display')
} //creating player object to allow more flexible naming in functions

const p2 = {
    score: 0,
    button: document.querySelector('#p2Btn'),
    display: document.querySelector('#p2Display')
}

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score++
        if (player.score === max) {
            if (player.score - opponent.score < 2) { //checks to see if a player is winning by at least 2 points, if not then increase max score 
                max++
            } else {
                isGameOver = true
                player.display.classList.add("has-text-success")
                opponent.display.classList.add("has-text-danger")
                player.button.disabled = true
                opponent.button.disabled = true
            }
        }
    }
    player.display.textContent = player.score
}

function reset() {
    for (let p of [p1, p2]) { //allows for more DRY code by passing in an array and looping over elements
        isGameOver = false
        p.score = 0
        p.display.textContent = p.score
        p.display.classList.remove("has-text-success", "has-text-danger")
        p.button.disabled = false
        max = parseInt(maxPts.value)
    }
}

p1.button.addEventListener('click', function () {
    updateScores(p1, p2)
})
p2.button.addEventListener('click', function () {
    updateScores(p2, p1)
})
maxPts.addEventListener('change', function () {
    max = parseInt(this.value)
    reset()
})
resetBtn.addEventListener('click', reset)

