updateMessage(welcomeMessage)

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

    //if there is no interval set
    if (!interval || (currentPlayer === 2 && !interval)) {
        interval = setInterval(timerCountdown, INTERVAL_TIME)
    }
    
    //show tiles
    showTiles()
    
    //show buttons
    showHideElement(GAME_BUTTONS, 'show')

    //add click event listeners to game buttons
    addGameButtonEventListeners()

    //show scoreboard w/ currentPlayer
    showHideElement(SCORE_BOARD, 'show')
    document.getElementById(`p${currentPlayer}-scoreboard`).textContent = `Player ${currentPlayer}`
    document.getElementById(`p${currentPlayer}-scoreboard`).style.background = "#E14658"
    document.getElementById(`p${currentPlayer}-scoreboard`).style.color = "white"
    document.getElementById(`p${currentPlayer}-scoreboard`).style.display = "inline-block"
    document.getElementById(`p${currentPlayer}-scoreboard`).style.padding = "1px"
    TIMER_ON_SCOREBOARD.textContent = `Time Remaining: ${timer}`
    TIMER_ON_SCOREBOARD.style.fontSize = '15px'

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
    //turn drag & drop off
    dragDropOff()
    
    //update messageboard with confirmPass message and add confirm button
    addCurrentPlayer(currentPlayer)
    updateMessage(confirmPassMessage, yesNoButtons)
    
    //remove click event listeners from game buttons
    removeGameButtonEventListeners()

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

    if (currentPlayer === 1) {
        playedWordP1 = 'Passed Turn'
        
    }
    else {
        playedWordP2 = 'Passed Turn'
    }
}

const confirmPlay = () => {
    //turn off drag & drop
    dragDropOff()
    
    //remove game button event listeners
    removeGameButtonEventListeners()
    
    //update messageboard with confirmPlay message and add confirm button and nevermind button
    addCurrentPlayer(currentPlayer)
    updateMessage(confirmPlayMessage, yesNoButtons)

    //add event listeners to confirm button, on click playTiles
    document.getElementById('yes').addEventListener('click', () => {
        playTiles(currentPlayer)
    })

    //add event listener to nevermind button, on click 
    document.getElementById('no').addEventListener('click', backToTurnScreen)

}

const playTiles = (player) => {
    console.log('play tiles')

    //clear arrays
    playedTilesPlayer
    playedWordPlayer
    playedTilesP1 = []
    playedTilesP2 = []
    playedTilesPlayerObjects = []

    if (player === 1) {
        playedTilesPlayer = playedTilesP1
        playedWordPlayer = playedWordP1
    }
    else {
        playedTilesPlayer = playedTilesP2
        playedWordPlayer = playedWordP2
    }

    //MVP - push from left to right the object data that is in each square to an array - array should be global and specific to player 1 so that we can tally points in correctWord function
    //loop through GAME_BOARD_DIV_NODES 
        // console.log(GAME_BOARD_DIV_NODES)
        // console.log(GAME_BOARD_DIV_NODES[10].childNodes[0].src)
        // let object = playerTiles.find(obj => obj.img === GAME_BOARD_DIV_NODES[10].childNodes[0].src)
        // console.log(object)

        for (let i = 10; i < GAME_BOARD_DIV_NODES.length-10; i++) {
           //if image in tile, take img source and push object that has matching img source to array
            if (GAME_BOARD_DIV_NODES[i].hasChildNodes()) {
                object = allTiles.find(obj => obj.img=== GAME_BOARD_DIV_NODES[i].childNodes[0].src) 
                playedTilesPlayerObjects.push(object)
                playedTilesPlayer.push(object.letter)
            }
            else {
                playedTilesPlayer.push('')
            }
        }
        console.log(playedTilesPlayer)
        console.log(playedTilesPlayerObjects)

        let playedLetters = []
        
        //if there is a square that has a letter on the square before it and a letter on the square after it, sorry, no spaces error message
        if (checkForIllegalSpaces() === true) {
            updateMessage(spaceBetweenLettersError, goBackButton)
            document.getElementById('goBack').addEventListener('click', backToTurnScreen)    
        }
        //if there are no letters, no letters here error message
        else if (playedTilesPlayer.every(el => el === '')) {
            console.log('no letters error')
            updateMessage(noLettersPlayedError, goBackButton)
            document.getElementById('goBack').addEventListener('click', backToTurnScreen)
        }
        else {
            //clear interval
            clearInterval(interval)
            timer = START_TIME
            //remove empty strings
            playedLetters = playedTilesPlayer.filter(el => el !== '')
            //convert to string - save to variable
            playedWordPlayer = playedLetters.join('')
            console.log(playedLetters)
            console.log(playedWordPlayer)
            //add to api URL
            apiURL = `https://dictionaryapi.com/api/v3/references/collegiate/json/${playedWordPlayer}?key=7cb66aa0-7487-4666-92aa-393636fd82d9`
            console.log(apiURL)

            //FOR TESTING ONLY:

            // fetchTESTAPI(FETCH_TEST_URL)

            //REALAPI:

            fetchAPI(apiURL)

            // console.log('waiting on data')
        }
        
        //set value of playedWordPlayer back to global playedWordP1 or P2
        if (player === 1) {
            playedWordP1 = playedWordPlayer
        }
        else {
            playedWordP2 = playedWordPlayer
        }
        

}

const correctWord = (player) => {
    console.log('correct word')
    console.log(playedTilesPlayerObjects)

    // if (player === 1) {
    //     playerScore = player1Score
    // }
    // else {
    //     playerScore = player2Score
    // }

    //tally points in played tiles array and save in global variable for comparing at results
    let total = 0
    playedTilesPlayerObjects.forEach(object => {
        total += object.points
    })
    playerScore = total
    console.log(playerScore)


    //update message to correct word message with button to pass to next player
    addCurrentPlayer(currentPlayer)
    updateMessage(correctWordMessage, nextPlayerButton)
    
    //update scoreboard with score
    document.getElementById(`p${currentPlayer}-scoreboard`).textContent = `Player ${currentPlayer}: ${playerScore}`

    if (currentPlayer === 1) {
        //event listener on next player button, on click - nextPlayerScreen
        player1Score = playerScore
        document.getElementById('next-player-btn').addEventListener('click', nextPlayerScreen)
    }
    else {
        //event listener on next player button, on click - showResults
        player2Score = playerScore
        document.getElementById('next-player-btn').addEventListener('click', showResults)
    }
}


const incorrectWord = () => {
    //set playerscore to 0
    playerScore = 0

    //update message to incorrect word message with next player/results button
    addCurrentPlayer(currentPlayer)
    updateMessage(incorrectWordMessage, nextPlayerButton)

    //update score to 0
    document.getElementById(`p${currentPlayer}-scoreboard`).textContent = `Player ${currentPlayer}: ${playerScore}`
    
    if (currentPlayer === 1) {
        //add event listener on next player button, on click function nextPlayerScreen
        document.getElementById('next-player-btn').addEventListener('click', nextPlayerScreen)
        player1Score = playerScore
    }
    else {
        document.getElementById('next-player-btn').addEventListener('click', showResults)
        player2Score = playerScore
    }
}

const nextPlayerScreen = () => {
    //clear interval
    clearInterval(interval)
    interval = ''
    timer = START_TIME
    
    currentPlayer += 1
    console.log('Player', currentPlayer, 'you are up')

    //hide scoreboard
    //update scoreboard to Player 2
    showHideElement(SCORE_BOARD, 'hide')
    document.getElementById(`p${currentPlayer - 1}-scoreboard`).textContent = `Player ${currentPlayer - 1}`
    document.getElementById(`p${currentPlayer - 1}-scoreboard`).style.color = "black"
    document.getElementById(`p${currentPlayer - 1}-scoreboard`).style.background = ""
    document.getElementById(`p${currentPlayer - 1}-scoreboard`).style.display = "block"

    //hide game buttons
    showHideElement(GAME_BUTTONS, 'hide')

    //hide timer
    showHideElement(TIMER_ON_SCOREBOARD, 'hide')

    //reset tiles
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

    //message that includes who won, each player's points and word played
    populateResults(playedWordP1, playedWordP2)

    //hide message and game board
    showHideElement(GAME_MESSAGE_BOARD, 'hide')

    //hide playerboard
    showHideElement(PLAYER_BOARD, 'hide')

    //create new div element
    let resultsDiv = document.createElement('div')
    resultsDiv.innerHTML = resultsText
    resultsDiv.setAttribute('class', 'results')
    document.querySelector('main').appendChild(resultsDiv)

    
    //play again button - on click goes back to start game
    refreshClick('start-over')
}

//add click event to quit button - go back to welcome
refreshClick('quit-btn')


