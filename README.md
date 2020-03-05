# SCRAMBBLE - A Scrabble Scramble

## ABOUT THE GAME

Scrambble is a one-round, time restricted word game in which 2 players compete to play the best word from a random set of tiles.

Click [HERE](https://kennansalisbury.github.io/scrabble_scramble/) to play.


## HOW IT WORKS

A random set of 5 tiles is created, and both players are working from this same set of tiles. Each player can play a word or pass their turn if they cannot come up with a word.

Once a player clicks to see the tileboard, the timer starts. Drag & drop tiles onto the highlighted squares on the board to try to make a word.

The "Recall" button will reset the board and bring the tiles back to the tileboard.

If a player is having trouble creating a word, the "Pass" button will pass to the next player, or end the game if Player 2.

Player can move the tiles around until happy with a word on the board. Push the "Play" button, then confirm ready to play the word, and the game will then check the word against the English dictionary. If the letters you played create a word, you'll receive the total number of points on your tiles. If not, you'll receive 0 points. 

Also - players will receive an error if attempting to play tiles with empty spaces between them, or if there are no tiles on the board.

Once both players have played, the game will reveal who won - including the words played (if applicable) and the points received by each player.


## TECHNOLOGIES USED
HTML, CSS, Materialize, JavaScript


HTML was used for the basic structure, which is mostly empty containers to be utilized by the JavaScript DOM manipulation. 

Materialize was implemented for some of the overall styling plus specifically used to create the layout of the header and the scoreboard, tileboard, and play/recall/pass buttons.

CSS was used to create the game board squares using grid, and to override some Materialize styling.

JavaScript was used to populate all dynamic text, buttons and tiles.

Drag & Drop functionality was also implemented using a mix of HTML and Javascript elements - learned from a mix of the following sites: 

* https://www.w3schools.com/html/html5_draganddrop.asp

* https://alligator.io/js/drag-and-drop-vanilla-js/

* https://medium.com/quick-code/simple-javascript-drag-drop-d044d8c5bed5

* https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API


## 2.0 Updates

1. Additional parameters to the dictionary API for stricter word-checking.

3. Additional parameters for randomizing the tiles, and possibly add more tiles to the player board, to ensure more consistency in the random tiles providing well-known word options.

4. Keep track of scores over multiple games.

5. Option to play against the computer.