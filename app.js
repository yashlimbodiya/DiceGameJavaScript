/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, isGamePlaying;

init();

document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if (isGamePlaying) {
        dice = Math.floor(Math.random() * 6) + 1;
        // 1. Random Number
        var diceIMG = document.querySelector('.dice');

        // 2. Display result
        diceIMG.style.display = 'block';
        diceIMG.src = 'dice-' + dice + '.png';

        // 3. Updating round number If it is not 1.
        if (dice !==1) {
            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

    }
});

function nextPlayer() {

        activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
        roundScore = 0;

        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';

}

document.querySelector('.btn-hold').addEventListener('click', function () {
   if (isGamePlaying) {
        // Add current score to global score of player
        scores[activePlayer] += roundScore;

        // Update UI of Active player
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if it wons

        if (scores[activePlayer] >= 100) {
            isGamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            
        } else {
            nextPlayer();
        }
   }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    isGamePlaying = true;

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

}

