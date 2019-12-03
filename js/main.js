
const startGame = () => {

    //show header
    showHideElement(document.querySelector('header'), 'show')

    //show quit button
    QUIT_BUTTON.setAttribute('class', 'smallbutton')

    //show empty tile board
    showHideElement(TILE_BOARD, 'show')

    //update messageboard to "player 1 up" message and "draw tiles" button 
    addCurrentPlayer(currentPlayer)
    updateMessage(playerReadyMessage, playerReadyButton)
    MESSAGE_BOARD.style.background = '#EFEFEF'
    MESSAGE_BOARD.style.color = 'black'

    //choose 5 random tiles  
    randomTiles()
    
    //add tile images to tileboard (hidden)
    createPlayerTiles()

    //add event listener to player ready button
    document.getElementById('player-ready-btn').addEventListener('click', playerTurn)
}

// Set event listener on start button to start game
document.getElementById('start-btn').addEventListener('click', startGame)

const playerTurn = () => {
    //if tiles on board
        //resetTiles()
    
    //show tiles
    showTiles()
    
    //show buttons
    showHideElement(GAME_BUTTONS, 'show')

    //add click event listeners to game buttons
    addGameButtonEventListeners()

    //show scoreboard w/ currentPlayer
    showHideElement(SCORE_BOARD, 'show')
    document.getElementById(`p${currentPlayer}-scoreboard`).textContent = `> Player ${currentPlayer}`
    document.getElementById(`p${currentPlayer}-scoreboard`).style.color = "#E14658"

    //update message
    addCurrentPlayer(currentPlayer)
    updateMessage(playerPlayMessage)

    //highlight the middle squares on board
    document.getElementById('3a').style.border = "1px solid #E14658"
    document.getElementById('3b').style.border = "1px solid #E14658"
    document.getElementById('3c').style.border = "1px solid #E14658"
    document.getElementById('3d').style.border = "1px solid #E14658"
    document.getElementById('3e').style.border = "1px solid #E14658"

    //dragDropSetup()
    dragDropSetup()
}

const confirmPass = () => {
    //update messageboard with confirmPass message and add confirm button
    addCurrentPlayer(currentPlayer)
    updateMessage(confirmPassMessage, yesNoButtons)
    
    //remove click event listeners from game buttons
    removeGameButtonEventListeners()

    //remove click styling on buttons

    //add event listeners to confirm button, on click playerTurn
    document.getElementById('yes').addEventListener('click', () => {
        if (currentPlayer === 1) {
            nextPlayerScreen()
        }
        else {
            showResults()
        }
    })

    //add event listener to no button 
    document.getElementById('no').addEventListener('click', backToTurnScreen)

    console.log(`Player ${currentPlayer}`)
}

const confirmPlay = () => {
    //remove game button event listeners
    removeGameButtonEventListeners()
    
    //update messageboard with confirmPlay message and add confirm button and nevermind button
    addCurrentPlayer(currentPlayer)
    updateMessage(confirmPlayMessage, yesNoButtons)

    //add event listeners to confirm button, on click playTiles
    document.getElementById('yes').addEventListener('click', playTiles)

    //add event listener to nevermind button, on click 
    document.getElementById('no').addEventListener('click', backToTurnScreen)

}

const playTiles = () => {
    console.log('play tiles')
    //clear arrays
    playedTilesP1 = []
    playedTilesP2 = []

    //MVP - push from left to right the object data that is in each square to an array - array should be global and specific to player 1 so that we can tally points in correctWord function
    let gameboardDivNodes = document.querySelectorAll('#gameboard div') //<loop through this array
        // console.log(gameboardDivNodes)
        // console.log(gameboardDivNodes[10].childNodes[0].src)
        // let object = playerTiles.find(obj => obj.img === gameboardDivNodes[10].childNodes[0].src)
        // console.log(object)

    //CODE FOR PLAYER 1
    if (currentPlayer === 1) {
        for (let i = 10; i < gameboardDivNodes.length-10; i++) {
           //if image in tile, take img source and push object that has matching img source to array
            if (gameboardDivNodes[i].hasChildNodes()) {
                let object = allTiles.find(obj => obj.img=== gameboardDivNodes[i].childNodes[0].src) 
                playedTilesP1.push(object.letter)
            }
            else {
                playedTilesP1.push('')
            }
        }
        console.log(playedTilesP1)

        let playedLettersP1 = []
        
        //if there is a square that has a letter on the square before it and a letter on the square after it, sorry, no spaces error message
        const checkForIllegalSpaces = () => {
            for (let i = 0; i < playedTilesP1.length; i++) {
                //if playedTilesP1[i] is an empty string (it is false, so ! will return true) AND playedTilesP1[i-1] has a letter AND playedTilesP1[i+1] has a letter
                if (!playedTilesP1[i] && playedTilesP1[i-1] && playedTilesP1[i+1]) {
                    return true
                }
            }
        }

        if (checkForIllegalSpaces() === true) {
            updateMessage(spaceBetweenLettersError, goBackButton)
            document.getElementById('goBack').addEventListener('click', backToTurnScreen)    
        }
        //if there are no letters, no letters here error message
        else if (playedTilesP1.every(el => el === '')) {
                console.log('no letters error')
                updateMessage(noLettersPlayedError, goBackButton)
                document.getElementById('goBack').addEventListener('click', backToTurnScreen)
        }
        else {
            //remove empty strings
            playedLettersP1 = playedTilesP1.filter(el => el !== '')
            //convert to string - save to variable
            playedWordP1 = playedLettersP1.join('')
            console.log(playedLettersP1)
            console.log(playedWordP1)
            //add to api URL
            apiURL = `https://dictionaryapi.com/api/v3/references/collegiate/json/${playedWordP1}?key=7cb66aa0-7487-4666-92aa-393636fd82d9`
        }
    }

    //CODE FOR PLAYER 2
    if (currentPlayer === 2) {
        for (let i = 10; i < gameboardDivNodes.length-10; i++) {
           //if image in tile, take img source and push object that has matching img source to array
            if (gameboardDivNodes[i].hasChildNodes()) {
                let object = allTiles.find(obj => obj.img=== gameboardDivNodes[i].childNodes[0].src) 
                playedTilesP2.push(object.letter)
            }
            else {
                playedTilesP2.push('')
            }
        }
        console.log(playedTilesP2)

        let playedLettersP2 = []
        
        //if there is a square that has a letter on the square before it and a letter on the square after it, sorry, no spaces error message
        const checkForIllegalSpaces = () => {
            for (let i = 0; i < playedTilesP2.length; i++) {
                //if playedTilesP2[i] is an empty string (it is false, so ! will return true) AND playedTilesP2[i-1] has a letter AND playedTilesP2[i+1] has a letter
                if (!playedTilesP2[i] && playedTilesP2[i-1] && playedTilesP2[i+1]) {
                    return true
                }
            }
        }

        if (checkForIllegalSpaces() === true) {
            updateMessage(spaceBetweenLettersError, goBackButton)
            document.getElementById('goBack').addEventListener('click', backToTurnScreen)    
        }

        //if there are no letters, no letters here error message
        if (playedTilesP2.every(el => el === '')) {
                console.log('no letters error')
                updateMessage(noLettersPlayedError, goBackButton)
                document.getElementById('goBack').addEventListener('click', backToTurnScreen)
        }
     
        else {
            //remove empty strings
            playedLettersP2 = playedTilesP2.filter(el => el !== '')
            //convert to string - save to variable
            playedWordP2 = playedLettersP2.join('')
            console.log(playedLettersP2)
            console.log(playedWordP2)
            //add to api URL
            apiURL = `https://dictionaryapi.com/api/v3/references/collegiate/json/${playedWordP2}?key=7cb66aa0-7487-4666-92aa-393636fd82d9`
        }
    }
    //FOR TESTING ONLY:

    //fetchAPI('https://pokeapi.co/api/v2/pokemon/ditto/')

    //REALAPI:

        fetchAPI(apiURL)

        console.log('waiting on data')
}

const correctWord = () => {
    console.log('correct word')
    
    //tally points in played tiles array and save in global variable for comparing at results
        //let object = allTiles.find(obj => obj.img=== 'image src url)
        //object.points -- gives you points for that tile

    //update message to correct word message with button to pass to next player
    addCurrentPlayer(currentPlayer)
    updateMessage(correctWordMessage, nextPlayerButton)
    
    //update scoreboard with score
    document.getElementById(`p${currentPlayer}-scoreboard`).textContent = `> Player 1: ${player1Score}`

    if (currentPlayer === 1) {
        //event listener on next player button, on click - nextPlayerScreen
        document.getElementById('next-player-btn').addEventListener('click', nextPlayerScreen)
    }
    else {
        //event listener on next player button, on click - showResults
        document.getElementById('next-player-btn').addEventListener('click', showResults)
    }
}


const incorrectWord = () => {
    //update message to incorrect word message with next player/results button
    addCurrentPlayer(currentPlayer)
    updateMessage(incorrectWordMessage, nextPlayerButton)
    
    if (currentPlayer === 1) {

        currentPlayer += 1    

        //add event listener on next player button, on click function nextPlayerScreen
        document.getElementById('next-player-btn').addEventListener('click', nextPlayerScreen)
    }
    else {
        document.getElementById('next-player-btn').addEventListener('click', showResults)
    }
}

const nextPlayerScreen = () => {
    //clear/reset drag & drop styles (squares where dropped are staying pink, and tileboard where tiles taken from staying gray)
    
    currentPlayer += 1
    console.log('Player', currentPlayer, 'you are up')

    //hide scoreboard
    //update scoreboard to Player 2
    showHideElement(SCORE_BOARD, 'hide')
    document.getElementById(`p${currentPlayer - 1}-scoreboard`).textContent = `Player ${currentPlayer - 1}`
    document.getElementById(`p${currentPlayer - 1}-scoreboard`).style.color = "black"
    document.getElementById(`p${currentPlayer}-scoreboard`).textContent = `> Player ${currentPlayer}`
    document.getElementById(`p${currentPlayer}-scoreboard`).style.color = "#E14658"

    //hide game buttons
    showHideElement(GAME_BUTTONS, 'hide')

    resetTiles()

    //showHideElement on each tile to hide
    hideTiles()

    //update message board with playerReady message and playerReadyButton
    addCurrentPlayer(currentPlayer)
    updateMessage(playerReadyMessage, playerReadyButton)

    //event listener on button? click - playerTurn
    document.getElementById('player-ready-btn').addEventListener('click', playerTurn)
}

const showResults = () => {
    console.log('show results')

    //hide message and game board
    showHideElement(GAME_MESSAGE_BOARD, 'hide')

    //hide playerboard
    showHideElement(PLAYER_BOARD, 'hide')

    //create new div element
    let resultsDiv = document.createElement('div')
    resultsDiv.innerHTML = resultsText
    resultsDiv.setAttribute('class', 'results')
    document.querySelector('main').appendChild(resultsDiv)
        //message that includes who won, each player's points and word played
        //play again button - on click goes back to start game
}

//add click event to quit button - go back to welcome
// document.getElementById('quit-btn').addEventListener('click', )