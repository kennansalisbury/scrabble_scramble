const addCurrentPlayer = (player) => {

playerReadyMessage = `
    <h4>Player ${player}, you're up!</h4>
    <p>When you’re ready, click below to see your tiles:</p>
    <br>`

playerReadyButton = `<button id="player-ready-btn" class='bigbutton'>Player ${player} Ready</button>`

incorrectWordMessage = `<p>Sorry, ${player}, that's not a word!</p>`

correctWordMessage = `
    <h4>Nice job!</h4>
    <h5>That's ${player1Score} points</h5>
    <br>`

confirmPlayMessage = 
    `<h4>Player ${player}, are you ready to play this word?</h4>`

yesNoButtons = `
    <button id='yes' class='smallbutton'>Yes</button>
    <button id='no' class='smallbutton'>No</button>`

if (player === 1) {
    playerPlayMessage = `
    <h4>Player ${player}, you're up!</h4>
    <p>Drag & drop tiles onto the board to create a word.</p>
    <br>
    <p>Click “Recall” if at any point before playing a word you want to bring all of your current play tiles back to your tile board.</p>
    <br>
    <p>Once you are happy with your word, click “Play” to play your word.</p>
    <br>
    <p>Or, if you can’t come up with a word - click “Pass.” This will give up your turn and we’ll see if Player ${player + 1} can come up with a word.</p>
    <br>`

    confirmPassMessage = `
        <h4>Player ${player}, are you sure you want to pass to Player ${player + 1}?`
    
    nextPlayerButton =
        `<p>Click below when you are ready to pass to Player ${player + 1}</p>
        <button id="next-player-btn" class="bigbutton">Pass to Player ${player + 1}</button>`
} 
else {
    playerPlayMessage =`
        <h4>Player ${player}, you're up!</h4>
        <p>Drag & drop tiles onto the board to create a word.</p>
        <br>
        <p>Click “Recall” if at any point before playing a word you want to bring all of your current play tiles back to your tile board.</p>
        <br>
        <p>Once you are happy with your word, click “Play” to play your word.</p>
        <br>
        <p>Or, if you can’t come up with a word - click “Pass.” This will give up your turn and we’ll see if Player ${player - 1} was able to come up with a word.</p>
        <br>`

    confirmPassMessage = `
        <h4>Player ${player}, are you sure you want to pass up your turn?`
    
    nextPlayerButton =
    `<button id="next-player-btn" class="bigbutton">See who won</button>`
    }

resultsText = `<h4>test</h4>`

}