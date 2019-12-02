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
            document.querySelector(`.tile${i}`).appendChild(tileImage)
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

//set up drag & drop functions, add draggable attributes to tiles, and add droppable attributes to game squares

//when drag begins, set data being transfered to be the img src
const drag = e => {
    // console.log(e)
    e.dataTransfer.setData("text", e.target.id)
    e.dataTransfer.dropEffect = "move"
    e.target.style.border = '1px solid #E14658'

    //add drop attributes to parent element so another tile can be dropped in square if tile is moved out of it
    e.path[0].parentNode.style.background = "#EFEFEF"
    e.path[0].parentNode.setAttribute('ondragover', 'allowDrop(event)')
    e.path[0].parentNode.setAttribute('ondrop', 'drop(event)')
    e.path[0].parentNode.setAttribute('ondragenter', 'dragEnter(event)')
    e.path[0].parentNode.setAttribute('ondragleave', 'dragLeave(event)')
}

//remove the default that keeps elements/data from being dropped in other elements
const allowDrop = e => {
    if (!e.target.contains(document.querySelector('img'))) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
}
}

const dragEnter = e => {
    e.target.style.background = "#E14658"
}

const dragLeave = e => {
    e.target.style.background = "#EFEFEF"
}

//when dropped:
const drop = e => {
    console.log(e)
    
    //only if there is not already a tile image there
    if (!e.target.contains(document.querySelector('img'))) {
    
    //need to also prevent default so data can be transferred
    e.preventDefault()

    //tell the item being dropped in that it should get the data set for transfer on the draggable element
    let data = e.dataTransfer.getData("text")

    //append the draggable element's data to the droppable element
    e.target.appendChild(document.getElementById(data))
    document.getElementById(data).style.height = "100%"
    document.getElementById(data).style.width = "100%"
    document.getElementById(data).style.border = ''

    //remove attribute to allow drops
    e.target.setAttribute('ondrop', '')
    }
}

const dragDropSetup = () => {
    
    //loop through tiles and set draggable attribute to true for each tile
    for (let i=0; i < playerTiles.length; i++) {
        let currentTile = document.getElementById(`tile${i}`)
        currentTile.setAttribute('draggable', 'true')
        currentTile.setAttribute('ondragstart', 'drag(event)')
        console.log(currentTile)
    }
    //add attributes to squares to allow a drop and tell it what to do when something is dropped on it
    document.getElementById('3a').setAttribute('ondragover', 'allowDrop(event)')
    document.getElementById('3b').setAttribute('ondragover', 'allowDrop(event)')
    document.getElementById('3c').setAttribute('ondragover', 'allowDrop(event)')
    document.getElementById('3d').setAttribute('ondragover', 'allowDrop(event)')
    document.getElementById('3e').setAttribute('ondragover', 'allowDrop(event)')
    
    document.getElementById('3a').setAttribute('ondrop', 'drop(event)')
    document.getElementById('3b').setAttribute('ondrop', 'drop(event)')
    document.getElementById('3c').setAttribute('ondrop', 'drop(event)')
    document.getElementById('3d').setAttribute('ondrop', 'drop(event)')
    document.getElementById('3e').setAttribute('ondrop', 'drop(event)')

    document.getElementById('3a').setAttribute('ondragenter', 'dragEnter(event)')
    document.getElementById('3b').setAttribute('ondragenter', 'dragEnter(event)')
    document.getElementById('3c').setAttribute('ondragenter', 'dragEnter(event)')
    document.getElementById('3d').setAttribute('ondragenter', 'dragEnter(event)')
    document.getElementById('3e').setAttribute('ondragenter', 'dragEnter(event)')

    document.getElementById('3a').setAttribute('ondragleave', 'dragLeave(event)')
    document.getElementById('3b').setAttribute('ondragleave', 'dragLeave(event)')
    document.getElementById('3c').setAttribute('ondragleave', 'dragLeave(event)')
    document.getElementById('3d').setAttribute('ondragleave', 'dragLeave(event)')
    document.getElementById('3e').setAttribute('ondragleave', 'dragLeave(event)')
}

const fetchAPI = url => {
    
    fetch(url)
    .then()
    //if fetch does not return data, return false
    
    if (!data) {
        return false
    }
    //if fetch returns data, return true
    else {
        return true
    }

}