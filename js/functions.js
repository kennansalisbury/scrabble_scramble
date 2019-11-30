const showHideElement = (element, showhide) => {
    if (showhide === 'show') {
        element.style.display = "inline-block"
    } 
    else {
        element.style.display = "none"
    }
}

const updateMessage = messageHTML => {
    MESSAGE_BOARD.innerHTML = messageHTML
}

let playerTiles = []
let randomIndex
const randomTiles = () => {
    for (let i = 0; i < 5; i++) {
        randomIndex = Math.floor(Math.random() * (allTiles.length - 1))
        playerTiles.push(allTiles[randomIndex])
    }
    
}

const showTiles = () => {

        //loop through playerTiles
        for (let i=0; i < playerTiles.length; i++) {
        //access image url
            document.getElementById(`tile${i}`).setAttribute('src', `${playerTiles[i].img}`)
            document.getElementById(`tile${i}`).style.display = "inline-block"
        }
        
}