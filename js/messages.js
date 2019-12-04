//Welcome message

welcomeMessage = `
<h1>SCRAMBBLE</h1>
<p>It's a Scrabble Scramble!</p>
<br>
<p>In this 2-player game, you’ll each have ${START_TIME} seconds to play a word based on the tiles you are given. Whoever has the highest score, wins! </p> 
<br>
<p>Click below to begin.</p>
<br>
<button id="start-btn" class="smallbutton">Start Game</button>`


const addCurrentPlayer = (player) => {

confirmPlayMessage = 
`<h4>Player ${player}, are you ready to play this word?</h4>`


if (playerScore === 1) {
    correctWordMessage = `
        <h4>Nice job!</h4>
        <h5>That's ${playerScore} point!</h5>
        <br>`
}
else {
    correctWordMessage = `
        <h4>Nice job!</h4>
        <h5>That's ${playerScore} points!</h5>
        <br>`
}
    
incorrectWordMessage = `<h4>Sorry, Player ${player}, that's not a word!</h4>`

playerReadyMessage = `
    <h4>Player ${player}, you're up!</h4>
    <p>When you’re ready, click below to see your tiles and start the ${START_TIME} second timer:</p>
    <br>`

playerReadyButton = `<button id="player-ready-btn" class='bigbutton'>Player ${player} Ready</button>`


timesUpMessage = `<h4>Argh! Time's up! Sorry, Player ${player}</h4>`


yesNoButtons = `
    <button id='yes' class='smallbutton'>Yes</button>
    <button id='no' class='smallbutton'>No</button>`



if (player === 1) {
   
    playerPlayMessage = `
        <h4>Player ${player}, you're up!</h4>
        <p>Drag & drop tiles onto the outlined board squares to create a word.</p>
        <br>
        <p>“Recall” brings all of your tiles back from the board.</p>
        <br>
        <p>Click “Play” when you're ready to play your word.</p>
        <br>
        <p>Or click "Pass" to pass your turn to Player ${player + 1}.</p>
        <br>`

    confirmPassMessage = `
        <h5>Player ${player}, are you sure you want to pass to Player ${player + 1}?</h5>`

    nextPlayerButton =
        `<p>Click below when you are ready to pass to Player ${player + 1}</p>
        <button id="next-player-btn" class="bigbutton">Pass to Player ${player + 1}</button>`
} 
else {
    playerPlayMessage =`
        <h4>Player ${player}, you're up!</h4>
        <p>Drag & drop tiles onto the outlined board squares to create a word.</p>
        <br>
        <p>“Recall” brings all of your tiles back from the board.</p>
        <br>
        <p>Click “Play” when you're ready to play your word.</p>
        <br>
        <p>Or click "Pass" to pass your turn and we’ll see if Player ${player - 1} was able to come up with a word.</p>
        <br>`

    confirmPassMessage = `
        <h5>Player ${player}, are you sure you want to pass up your turn?</h5>`
    
    nextPlayerButton =
    `<button id="next-player-btn" class="bigbutton">See who won</button>`
    }
}

const populateResults = (p1word, p2word) => {

    if (player1Score > player2Score) {
        resultsText = `
        <h4>Player 1 wins!</h4>
        <br>
        <h5>Player 1</h5>
        <h6>Word: ${playedWordP1}</h6>
        <h6>Score: ${player1Score}</h6>
        <br>
        <h5>Player 2</h5>
        <h6>Word: ${playedWordP2}</h6>
        <h6>Score: ${player2Score}</h6>
        <br>
        <button id = 'start-over' class = 'bigbutton'>Start a New Game</button>
        <br>
        `
    }
    else if (player2Score > player1Score) {
        resultsText = `
        <h4>Player 2 wins!</h4>
        <br>
        <h5>Player 1</h5>
        <h6>Word: ${playedWordP1}</h6>
        <h6>Score: ${player1Score}</h6>
        <br>
        <h5>Player 2</h5>
        <h6>Word: ${playedWordP2}</h6>
        <h6>Score: ${player2Score}</h6>
        <br>
        <button id = 'start-over' class = 'bigbutton'>Start a New Game</button>
        <br>`
    }
    else {
        resultsText = `
        <h4>It's a tie!</h4>
        <br>
        <h5>Player 1</h5>
        <h6>Word: ${playedWordP1}</h6>
        <h6>Score: ${player1Score}</h6>
        <br>
        <h5>Player 2</h5>
        <h6>Word: ${playedWordP2}</h6>
        <h6>Score: ${player2Score}</h6>
        <br>
        <button id = 'start-over' class = 'bigbutton'>Start a New Game</button>
        <br>
        `
    }
    return resultsText
}



//ERROR MESSAGES

spaceBetweenLettersError = `<p>Error: there can be no spaces in the middle of the word. Please fix and try again. </p>`

noLettersPlayedError = `<p>Error: you have not played any tiles. Please fix and try again or pass your turn.</p>`

goBackButton = `<button id = 'goBack' class = 'bigbutton'>Go Back</button>`