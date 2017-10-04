var scores, roundScore, activePlayer, dicePrevious, dice1Previous, gamePlaying = true;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        //Random Number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;
        console.log(dice);
        console.log(dice1);
        //Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        var dice1DOM = document.querySelector('.dice1');
        dice1DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice1 + '.png';

        //Update round score if rolled number is NOT a 1
        if (dice > 1 && dice1 > 1) {
            //if two sixes
            if(dice === dice1 && dice === 6) {
                roundScore = 0;
                document.getElementById('current-' + activePlayer).textContent = roundScore;
                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]; 
                nextPlayer();                                                                      
            } else {
                //add score
                roundScore += dice + dice1; 
                console.log('roundScore'+roundScore);
                document.getElementById('current-' + activePlayer).textContent = roundScore;
            }
        dicePrevious = dice;
        dice1Previous = dice1;
        } else {
            nextPlayer();
        }
    }
}); 


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundScore;

        //update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        var winningScore;
        var input = document.querySelector('.final-score').value;
        if(input){
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        if (scores[activePlayer] >= winningScore){
            //player wins
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else{
            //next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        //highlight active player
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //hide dice
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice1').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    dicePrevious = 0;
    dice1Previous = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    document.getElementById('score-0').textContent ='0';
    document.getElementById('score-1').textContent ='0';
    document.getElementById('current-0').textContent ='0';
    document.getElementById('current-1').textContent ='0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}