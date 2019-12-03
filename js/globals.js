//constants
const GAME_BUTTONS = document.getElementById('game-btns')
const GAME_MESSAGE_BOARD = document.getElementById('message-and-gameboard')
const MESSAGE_BOARD = document.getElementById('messageboard')
const PLAYER_BOARD = document.getElementById('playerboard')
const QUIT_BUTTON = document.getElementById('quit-btn')
const SCORE_BOARD = document.getElementById('scoreboard')
const TILE_BOARD = document.getElementById('tileboard')
const NUMBER_TILES_PER_PLAYER = 5

//global variables
let apiURL
let currentPlayer = 1
let playerTiles = []
let playerReadyMessage, 
    playerReadyButton, 
    playerPlayMessage, 
    nextPlayerButton, 
    incorrectWordMessage, 
    confirmPlayMessage, 
    confirmPassMessage, 
    yesNoButtons,
    spaceBetweenLettersError,
    noLettersPlayedError,
    goBackButton,
    resultsText
let playedTilesP1 = []
let playedTilesP2 = []
let player1Score = 0
let player2Score = 0
let playedWordP1
let interval


//create & store tiles with points and image
let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

class tile {
    constructor(letter, points, img) {
        this.letter = letter
        this.points = points
        this.img = img
    }
}

let allTiles = []
let points
for (let i = 0; i < letters.length; i++) {
    if (letters[i] === 'Q' || letters[i] === 'Z') {
        points = 10
    }
    else if (letters[i] === 'J' || letters[i] === 'X') {
        points = 8
    }
    else if (letters[i] === 'F' || letters[i] === 'H' || letters[i] === 'W' || letters[i] === 'Y') {
        points = 4
    }
    else if (letters[i] === 'D' || letters[i] === 'G') {
        points = 2
    }
    else if (letters[i] === 'B' || letters[i] === 'C' || letters[i] === 'M' || letters[i] === 'P' || letters[i] ==='U') {
        points = 3
    }
    else {
        points = 1
    }
    let img = `file:///Users/kennansalisbury/sei28/unit_1/projects/scrabble_scramble/assets/img/letter${letters[i]}.png`
    allTiles.push(new tile(letters[i], points, img))
}
