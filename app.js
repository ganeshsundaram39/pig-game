/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
- Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
- Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/

var scores, roundScore, activePlayer, dice1Dom, dice2Dom, gamePlaying, dice1, dice2;

init();

function diceDisplay(value) {

    dice1Dom.style.display = value;
    dice2Dom.style.display = value;
}

function nextPlayer() {
    var current = document.getElementById('current-' + activePlayer);
    current.textContent = '0';
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer = activePlayer === 1 ? 0 : 1;
    roundScore = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    diceDisplay('none');
}

function addDiceValue() {

    diceDisplay('block');
    //add score
    roundScore += (dice1 + dice2);
    document.getElementById('current-' + activePlayer).textContent = roundScore;

}
document.getElementsByClassName('btn-roll')[0].addEventListener('click', function() {
    if (gamePlaying) {
        //1. Random number.
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;

        //2. assign the result.
        dice1Dom.src = 'dice-' + dice1 + '.png';
        dice2Dom.src = 'dice-' + dice2 + '.png';

        //Update the round score if the rolled number was not a 1
        if (dice1 !== 1 && dice2 !== 1) {
        	addDiceValue();
            } else {
            nextPlayer();
        }

        // if (dice !== 1) {
        //     if (dice === 6) {
        //         rolls.push(dice);

        //         if (rolls[0] === rolls[1]) {
        //             rolls = [];
        //             scores[activePlayer]=0;
        //             document.getElementById('score-' + activePlayer).textContent = '0';
        //             nextPlayer();

        //         } else {

        //             addDiceValue();
        //         }

        //     } else {
        //         rolls = [];
        //         addDiceValue();
        //     }

        // } else {
        //     //next player
        //     nextPlayer();
        // }
    }
});

document.getElementsByClassName('btn-hold')[0].addEventListener('click', function() {
    if (gamePlaying) {
        // add current score to global score
        var score = document.getElementById('score-' + activePlayer);
        scores[activePlayer] += roundScore;
        score.textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;
        if (!input) {
            input = 100;
        }
        if (isNaN(input)) {
            input = 100;
        }
        if (scores[activePlayer] >= input) {
            document.getElementById('name-' + activePlayer).textContent = "Winner";
            gamePlaying = false;
            diceDisplay('none');

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            nextPlayer();
        }

    }
});

document.getElementsByClassName("btn-new")[0].addEventListener('click', init);

function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    rolls = [];
    dice1Dom = document.getElementById('dice-1');
    dice2Dom = document.getElementById('dice-2');
    diceDisplay('none');
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');



}



// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};