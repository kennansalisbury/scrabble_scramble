

// Set event listener on start button to start game
const startGame = () => {

    //show quit button
    showHideElement(QUIT_BUTTON, 'show')
    
    //show scoreboard
    showHideElement(SCORE_BOARD, 'show')

    //show empty tile board
    showHideElement(TILE_BOARD, 'show')

    //update messageboard to "player 1 up" message and "draw tiles" button 
    updateMessage(playerReady)

    //show buttons
    showHideElement(GAME_BUTTONS, 'show')

    //choose 5 random tiles
    randomTiles()
    console.log(playerTiles)

    //add event listener to player ready button
    document.getElementById('player-ready-btn').addEventListener('click', playerTurn)
}

document.getElementById('start-btn').addEventListener('click', startGame)

const playerTurn = () => {
    //show 5 tiles on tile board
    showTiles()

    //update message
    updateMessage(playerPlay)

    //add click event listeners to game buttons

    //highlight 5 middle squares on board

    //add click event listeners to highlighted game squares

}

// add click event listener to "Player x ready"


