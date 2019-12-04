# scrabble_scramble
explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc.

SCRAMBBLE - A Scrabble Scramble

ABOUT THE GAME

Scrambble is a one-round, time restricted word game in which 2 players compete to play the best word from a random set of tiles.

HOW IT WORKS

A random set of 5 tiles is created, and both players are working from this same set of tiles. Each player can play a word or pass their turn if they cannot come up with a word.

Once a player clicks to see the tileboard, the timer starts. Drag & drop tiles onto the highlighted squares on the board to try to make a word.

The "Recall" button will reset the board and bring the tiles back to the tileboard.

If a player is having trouble creating a word, the "Pass" button will pass to the next player, or end the game (if Player 2).

Player can move the tiles around until happy with a word on the board. Push the "Play" button next, confirm ready to play the word, and the game will then check the word against the English dictionary. If the letters you played create a word, you'll receive the total number of points on your tiles. If not, you'll receive 0 points. 

Also - players will receive an error if attempting to play tiles with empty spaces between them, or if there are no tiles on the board.

Once both players have played, the game will reveal who won - including the word played (if applicable) and the points received by each player.

TECHNOLOGIES USED
HTML, Materialize, CSS, JavaScript

HTML includes basic structure of mostly empty containers that the JavaScript utilizes. 

Materialize was implemented for some of the overall styling plus specificlly used to create layout of the header and the scoreboard, tileboard, and play/recall/pass buttons.

CSS was used to create the game board squares using grid, and to override some Materialize styling.

JavaScript was used to populate all dynamic text, buttons and tiles. 

Drag & Drop functionality was also implemented using a mix of HTML, CSS and Javascript elements - learned from a mix of the following sites: 
https://www.w3schools.com/html/html5_draganddrop.asp
https://alligator.io/js/drag-and-drop-vanilla-js/
https://medium.com/quick-code/simple-javascript-drag-drop-d044d8c5bed5
https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

APPROACH



INSTALLATION INSTRUCTIONS
??

UNSOLVED PROBLEMS

