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

const addGameButtonEventListeners = () => {
    document.getElementById('play-btn').addEventListener('click', confirmPlay)
    document.getElementById('recall-btn').addEventListener('click', recallTiles)
    document.getElementById('pass-btn').addEventListener('click', confirmPass)
}

const removeGameButtonEventListeners = () => {
    document.getElementById('play-btn').removeEventListener('click', confirmPlay)
    document.getElementById('recall-btn').removeEventListener('click', recallTiles)
    document.getElementById('pass-btn').removeEventListener('click', confirmPass)
}


let randomIndex
const randomTiles = () => {
    for (let i = 0; i < NUMBER_TILES_PER_PLAYER; i++) {
        randomIndex = Math.floor(Math.random() * (allTiles.length - 1))
        playerTiles.push(allTiles[randomIndex])
    }
    
}

const createPlayerTiles = () => {

        //loop through playerTiles
        for (let i=0; i < playerTiles.length; i++) {
        //access image url & create new image element for each
            let tileImage = document.createElement('img')
            tileImage.setAttribute('id', `tile${i}`)
            tileImage.setAttribute('src', `${playerTiles[i].img}`)
            TILE_BOARD.appendChild(tileImage)
            // showHideElement(tileImage, 'show')
        }

}

const hideTiles = () => {
    //loop through player tiles and hide
    for (let i = 0; i < NUMBER_TILES_PER_PLAYER; i++) {
        showHideElement(document.getElementById(`tile${i}`), 'hide')
    }
}

const showTiles = () => {
    //loop thorugh player tiles and show
    for (let i = 0; i < NUMBER_TILES_PER_PLAYER; i++) {
        showHideElement(document.getElementById(`tile${i}`), 'show')
    }
}


const recallTiles = () => {
    console.log('this will recall tiles')
    
    //resetTiles()

    //dragDropSetup()
}

const resetTiles = () => {
    console.log('this will clear game board and remove event listeners')
    
        //clear tiles from gameboard
        //show tiles in tile board
        //remove event listeners or droppable from board squares
        //remove event listeners or draggable from tiles
    
}

const dragDropSetup = () => {
    //CONFIRM HOW TO DO THIS
}

const fetchAPI = (data) => {
    
    //if fetch does not return data, return false
    
    if (!data) {
        return false
    }
    //if fetch returns data, return true
    else {
        return true
    }

}