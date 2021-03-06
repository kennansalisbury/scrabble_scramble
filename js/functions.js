//** DRY CODE UPDATE: ternaries

const showHideElement = (element, showhide) => {
    if (showhide === 'show') {
        element.style.display = "inline-block"
    } 
    else if (showhide === "hide") {
        element.style.display = "none"
    }
}

const updateMessage = (messageHTML, buttonHTML) => {
    if (buttonHTML) {
        MESSAGE_BOARD.innerHTML = messageHTML + buttonHTML 
    }
    else {
        MESSAGE_BOARD.innerHTML = messageHTML
    }
}

let randomIndex
let vowelIndices = [0, 4, 8, 14, 20]
let randomVowel
const randomTiles = () => {
    //randomly select tiles for the players, making the first tile always a vowel
    for (let i = 0; i < NUMBER_TILES_PER_PLAYER; i++) {
        if (i === 0) {
            randomIndex = Math.floor(Math.random() * vowelIndices.length)
            randomVowel = vowelIndices[randomIndex]
            playerTiles.push(allTiles[randomVowel])
        }
        else {
            randomIndex = Math.floor(Math.random() * allTiles.length)
            playerTiles.push(allTiles[randomIndex])
        }  
    }
    
}

const createPlayerTiles = () => {

        //loop through playerTiles
        for (let i=0; i < playerTiles.length; i++) {
        //access image url & create new image element for each
            let tileImage = document.createElement('img')
            tileImage.setAttribute('id', `tile${i}`)
            tileImage.setAttribute('src', `${playerTiles[i].img}`)
            document.querySelector(`.tile${i}`).appendChild(tileImage)
        }

}

//** DRY CODE UPDATE: move code from this function to main.js
const hideTiles = () => {
    //hide tileboard
    showHideElement(TILE_BOARD, 'hide')
}

const showTiles = () => {
    //loop thorugh player tiles and show
    for (let i = 0; i < NUMBER_TILES_PER_PLAYER; i++) {
        showHideElement(document.getElementById(`tile${i}`), 'show')
    }
    if (TILE_BOARD.style.display === 'none') {
        showHideElement(TILE_BOARD, 'show')
    }
}

const timesUp = () => {
    //clear interval
    clearInterval(interval)

    //drag & drop off
    dragDropOff()

    //game button click event listeners off
    removeGameButtonEventListeners()

    //add 0 to player scoreboard
    playerScore = 0
    document.getElementById(`p${currentPlayer}-scoreboard`).textContent = `Player ${currentPlayer}: ${playerScore}`
    
    //update message to incorrect word message with next player/results button
    addCurrentPlayer(currentPlayer)
    updateMessage(timesUpMessage, nextPlayerButton)
    
    if (currentPlayer === 1) {
        //add event listener on next player button, on click function nextPlayerScreen
        document.getElementById('next-player-btn').addEventListener('click', nextPlayerScreen)
        playedWordP1 = 'Ran Out Of Time'
    }
    else {
        document.getElementById('next-player-btn').addEventListener('click', showResults)
        playedWordP2 = 'Ran Out Of Time'
    }

    timer = START_TIME
}

const timerCountdown = () => {
    timer -= 1
    TIMER_ON_SCOREBOARD.textContent = `Time Remaining: ${timer}`
    TIMER_ON_SCOREBOARD.style.color = 'black'

    if (timer === 0) {
        timesUp()
    }
    else if (timer === 10) {
        TIMER_ON_SCOREBOARD.style.fontSize = '20px'
    }
    else if (timer <= 5) {
        TIMER_ON_SCOREBOARD.style.fontSize = '25px'
        TIMER_ON_SCOREBOARD.style.color = 'red'
    }
}

const addGameButtonEventListeners = () => {
    PLAY_BUTTON.addEventListener('click', confirmPlay)
    RECALL_BUTTON.addEventListener('click', recallTiles)
    PASS_BUTTON.addEventListener('click', confirmPass)

    //reapply css if not already there
    PLAY_BUTTON.setAttribute('class', 'smallbutton')
    RECALL_BUTTON.setAttribute('class', 'smallbutton')
    PASS_BUTTON.setAttribute('class', 'smallbutton')
}

const removeGameButtonEventListeners = () => {
    PLAY_BUTTON.removeEventListener('click', confirmPlay)
    RECALL_BUTTON.removeEventListener('click', recallTiles)
    PASS_BUTTON.removeEventListener('click', confirmPass)

    //gray out and remove hover/click styles
    PLAY_BUTTON.setAttribute('class', 'smallbutton-disable')
    RECALL_BUTTON.setAttribute('class', 'smallbutton-disable')
    PASS_BUTTON.setAttribute('class', 'smallbutton-disable')
}

const updateScoreBoard = () => {
    document.getElementById(`p${currentPlayer}-scoreboard`).textContent = `Player ${currentPlayer}`
    document.getElementById(`p${currentPlayer}-scoreboard`).style.background = "#E14658"
    document.getElementById(`p${currentPlayer}-scoreboard`).style.color = "white"
    document.getElementById(`p${currentPlayer}-scoreboard`).style.display = "inline-block"
    document.getElementById(`p${currentPlayer}-scoreboard`).style.padding = "1px"
}

const highlightPlayableSquares = () => {
    for (let i = 11; i < 16; i++){
        document.getElementById(`square${i}`).style.background = "#CAEBF2"
    }
}

const resetTiles = () => {

    //clear tiles from gameboard
    for (let i = 10; i < GAME_BOARD_DIV_NODES.length-10; i++) {
        if (GAME_BOARD_DIV_NODES[i].hasChildNodes()) {
            GAME_BOARD_DIV_NODES[i].removeChild(document.querySelector('img'))
        }
    }

    //clear tiles from tileboard
    for (let i = 0; i < TILE_BOARD_DIV_NODES.length; i++) {
        if (TILE_BOARD_DIV_NODES[i].hasChildNodes()) {
            TILE_BOARD_DIV_NODES[i].removeChild(document.querySelector('img'))
        }
    }

    //add tiles in tile board
    createPlayerTiles()

}

const backToTurnScreen = () => {
    recallTiles()
    addCurrentPlayer(currentPlayer)
    updateMessage(playerPlayMessage)

    addGameButtonEventListeners()
}

//set up for drag & drop functions -- draggable attributes on tiles, droppable attributes on game squares

//when drag begins, set data being transfered to be the img id
const drag = e => {
    e.dataTransfer.setData("text", e.target.id)
    e.dataTransfer.dropEffect = "move"
    e.target.style.border = '1px solid #E14658'

    //add drop attributes to parent element so another tile can be dropped in square if tile is moved out of it
    e.path[0].parentNode.style.background = "#CAEBF2"
    e.path[0].parentNode.setAttribute('ondragover', 'allowDrop(event)')
    e.path[0].parentNode.setAttribute('ondrop', 'drop(event)')
    e.path[0].parentNode.setAttribute('ondragenter', 'dragEnter(event)')
    e.path[0].parentNode.setAttribute('ondragleave', 'dragLeave(event)')
}

//set square background when something dragged over
const dragEnter = e => {
    e.target.style.background = "#E14658"
}

//set square background back when draggable element moves on and doesnt drop
const dragLeave = e => {
    e.target.style.background = "#CAEBF2"
}

//remove border on tile when drag ends
const dragEnd = e => {
    e.target.style.border = ''
}

//remove the default that keeps elements/data from being dropped in other elements
const allowDrop = e => {
    if (!e.target.contains(document.querySelector('img'))) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
}
}

//when dropped:
const drop = e => {


    //change background back to blue
    e.target.style.background = "#CAEBF2"

    //play click sound
    document.getElementById('drop-sound').play()
    
    //can only drop if there is not already a tile image there
    if (!e.target.contains(document.querySelector('img'))) {
    
        //need to also prevent default so data can be transferred
        e.preventDefault()

        //tell the item being dropped in that it should get the data set for transfer on the draggable element
        let data = e.dataTransfer.getData("text")

        //append the draggable element's data to the droppable element
        
        if (e.target !== document.getElementById(data)) {
        e.target.appendChild(document.getElementById(data))
        document.getElementById(data).style.height = "100%"
        document.getElementById(data).style.width = "100%"
        document.getElementById(data).style.border = ''
        }

        //remove attribute to allow drops
        e.target.setAttribute('ondrop', '')
    }
}

const dragDropSetup = () => {
    
    //loop through tiles and set draggable attribute to true for each tile
     //*** DRY CODE UPDATE: string together
    for (let i=0; i < playerTiles.length; i++) {
        let currentTile = document.getElementById(`tile${i}`)
        currentTile.setAttribute('draggable', 'true')
        currentTile.setAttribute('ondragstart', 'drag(event)')
        currentTile.setAttribute('ondragend', 'dragEnd(event)')
        
    }
    //add attributes to squares to allow a drop, tell it what to do when something is dragged over it and when something is dropped on it
    for (let i = 11; i < 16; i++) {
        let currentSquare = document.getElementById(`square${i}`)
        currentSquare.setAttribute('ondragover', 'allowDrop(event)')
        currentSquare.setAttribute('ondrop', 'drop(event)')
        currentSquare.setAttribute('ondragenter', 'dragEnter(event)')
        currentSquare.setAttribute('ondragleave', 'dragLeave(event)')
    }
}

const dragDropOff = () => {
    //loop through tiles and set draggable attribute to '' for each tile
    //*** DRY CODE UPDATE: string together
    for (let i=0; i < playerTiles.length; i++) {
        let currentTile = document.getElementById(`tile${i}`)
        currentTile.setAttribute('draggable', 'false')
        currentTile.setAttribute('ondragstart', '')
        currentTile.setAttribute('ondragend', '')
        
    }
}

const checkForIllegalSpaces = () => {
    for (let i = 0; i < playedTilesPlayer.length; i++) {
        //if playedTilesPlayer[i] is an empty string AND playedTilesPlayer[i-1] has a letter AND playedTilesPlayer[i+1] or i+2 or i+3 has a letter
        if (!playedTilesPlayer[i] && playedTilesPlayer[i-1] && (playedTilesPlayer[i+1] || playedTilesPlayer[i+2] || playedTilesPlayer[i+3])) {
            return true
        }
    }
}

//FETCH API
const fetchAPI = (url) => {
    
    fetch(url)
    .then(response => response.json())
    .then(data => {

        if(data[0].meta && data[0].fl != "abbreviation" && data[0].fl != "biographical name") {  //if fetch returns an array whose first index is an object called meta, it's true and should move to correctword function
        
            correctWord()
        }
        else {  //else it is false and should move to incorrect word (if not a word, data comes back just 1 single array of words that are similar to the input word)
            
            incorrectWord()
        }
    })
    .catch(err => {
        console.log('error', err)
    })
}


const refreshClick = btnId => {
    document.getElementById(btnId).addEventListener('click', () => {
        document.location.reload(true);
    })
}