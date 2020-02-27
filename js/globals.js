//*** DRY CODE UPDATE: CREATE GAMEBOARD DIVS - MAKE IDS LOOPABLE

//CONSTANTS
const INTERVAL_TIME = 1000
const NUMBER_TILES_PER_PLAYER = 5
const START_TIME = 30

//CONSTANTS - DOM elements
const GAME_BOARD_DIV_NODES = document.querySelectorAll('#gameboard div')
const GAME_BUTTONS = document.getElementById('game-btns')
const GAME_MESSAGE_BOARD = document.getElementById('message-and-gameboard')
const MESSAGE_BOARD = document.getElementById('messageboard')
const PLAYER_BOARD = document.getElementById('playerboard')
const QUIT_BUTTON = document.getElementById('quit-btn')
const SCORE_BOARD = document.getElementById('scoreboard')
const TILE_BOARD = document.getElementById('tileboard')
const TILE_BOARD_DIV_NODES = document.querySelectorAll('#tileboard div')
const TIMER_ON_SCOREBOARD = document.getElementById('timer-section')


//global variables
let allTiles = [] //set array of tiles at bottom of file
let apiURL
let currentPlayer = 1
let interval
let playedTilesPlayer, playedWordPlayer
let playedTilesP1 = []
let playedTilesP2 = []
let playedTilesPlayerObjects = []
let playedWordP1, playedWordP2
let player1Score = 0
let player2Score = 0
let playerScore
let playerTiles = []
let points
let timer = START_TIME

//messages
let confirmPlayMessage, 
    confirmPassMessage, 
    incorrectWordMessage, 
    noLettersPlayedError,
    playerReadyMessage, 
    playerReadyButton, 
    playerPlayMessage, 
    spaceBetweenLettersError, 
    resultsText

//buttons
let goBackButton, nextPlayerButton, yesNoButtons

//create & store tiles with points and image
let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

class tile {
    constructor(letter, points, img, vowel) {
        this.letter = letter
        this.points = points
        this.img = img
        this.vowel = vowel
    }
}

//loop through letters and create new tile for each
for (let i = 0; i < letters.length; i++) {
    
    //***DRY CODE UPDATE: Switch statement
    //set points based on letters
    if (letters[i] === 'Q' || letters[i] === 'Z') {
        points = 10
    }
    else if (letters[i] === 'J' || letters[i] === 'X') {
        points = 8
    }
    else if (letters[i] === 'K') {
        points = 5
    }
    else if (letters[i] === 'F' || letters[i] === 'H' || letters[i] === 'V' || letters[i] === 'W' || letters[i] === 'Y') {
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

    //set img of tile
    let img = `./assets/img/letter${letters[i]}.png`

    //set whether a vowel or not
    if (letters[i] === 'A' || letters[i] === 'E' || letters[i] === 'I' || letters[i] === 'O' || letters[i] === 'U') {
        vowel = 'true'
    }
    else {
        vowel = 'false'
    }

    //create new array of objects
    allTiles.push(new tile(letters[i], points, img, vowel))
}