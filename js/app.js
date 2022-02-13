//Select elements and attach functions via event listeners
//You will also need a variable to keep track of moves. This will be used to indicate whether or not to draw an X or an O


// identify cells, then add them into one array
const cells = Array.from(document.querySelectorAll('.cell'))

// identify the player and grab from html .player
const displayPlayer = document.querySelector('.display-player')

// identify the winner abd grab from html
const winner = document.querySelector('.winner')

// identify the reset button
const resetButton = document.querySelector('#reset')

// set the game board variable to empty array of strings
let gameBoard = ['', '', '', '', '', '', '', '', '',] 

// identify current player
let currentPlayer = 'X'

// identify game activity
let isGameActive = true;

// identify player X win variable
const playerXWon = 'playerXWon'
// identify player Y win variable
const playerOWon = 'PlayerOWon'
// identify tie variable
const tie = 'tie'

// cell indexes
//  [0],[1],[2]
//  [3],[4],[5]
//  [6],[7],[8]


// wining combinations
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// if the inner text X or O, set it to inactive/false
const availableCell = (cell) => {
    if (cell.innertext === 'X' || cell.innertext === 'O'){
        return false
    } else {
        return true
    }
}

// set the cell index to the current player
const updateBoard = (n) => {
    gameBoard[n] = currentPlayer
}

// change player from X to O
const changePlayer = () => {
    // remove the current player status
    displayPlayer.classList.remove(`player${currentPlayer}`)
    // set current player to a new value
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X' 
    // change the text of the player
    displayPlayer.innerText = currentPlayer
    // apply the curent player class to player
    displayPlayer.classList.add(`player${currentPlayer}`)
}

// display the result
const displayResult = (type) => {
    switch(type){
        case playerXWon:
            winner.innerHTML = 'Player X won!'
            break
        case playerOWon:
            winner.innerHTML = 'Player O won!'
            break
        case tie:
            winner.innerHTML = "It's a tie!"
    }
}

// determine the winner
const gameResults = () => {
    // start with no win
    let roundWon = false 
    // loop through cell indexes
    for (let i = 0; i <= 7; i++){
        const winCombo = winningCombos[i]
        const a = gameBoard[winCombo[0]]
        const b = gameBoard[winCombo[1]]
        const c = gameBoard[winCombo[2]]
        if (a === '' || b === '' || c === ''){
            continue
        }
        if (a === b && b === c){
            roundWon = true
            break
        }  
    }
    if (roundWon) {
        displayResult(currentPlayer === 'X' ? playerXWon : playerOWon)
        isGameActive = false
        return
    }
    if (!gameBoard.includes('')) displayResult(tie)
}

// when a user clicks a tile
const userAction = (cell, n) => {
    if (availableCell(cell) && isGameActive) {
       cell.innerText = currentPlayer
       cell.classList.add(`player${currentPlayer}`)
       updateBoard(n)
       gameResults()
       changePlayer()
    }
}

// add event listener to each cell, click, add index to user
cells.forEach((cell, n) => {
    cell.addEventListener('click', () => userAction(cell, n))
    })

//reset game board
const refreshPage = () => {
    // refresh page
    location.reload()
}
// on click of button refresh page
resetButton.addEventListener('click', refreshPage)

// add event listener to document
document.addEventListener('DOMContentLoaded', () =>{
})