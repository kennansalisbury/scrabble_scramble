//constants
const GAME_BUTTONS = document.getElementById('game-btns')
const MESSAGE_BOARD = document.getElementById('messageboard')
const QUIT_BUTTON = document.getElementById('quit-btn')
const SCORE_BOARD = document.getElementById('scoreboard')
const TILE_BOARD = document.getElementById('tileboard')

//global variables
let currentPlayer = 1



//create tiles
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
    let img = `./assets/img/letter${letters[i]}.png`
    allTiles.push(new tile(letters[i], points, img))
}
