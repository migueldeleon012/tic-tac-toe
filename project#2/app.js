//global variables
const board = document.querySelector('#gameBoard');
const cell = document.querySelectorAll('.cell')
const scoreBoard = document.querySelector('#scoreBoard');
const playerOne = document.querySelector('#playerOneScore');
const playerTwo = document.querySelector('#playerTwoScore');
const alert = document.querySelector('#alertWin');
const popUp = document.querySelector('#popUp');
const restartButton = document.querySelector('#restart');
const startButton = document.querySelector('#startingButton');
const turn = document.querySelector('#currentTurn');
const green = '<i class="fas fa-play-circle"></i>';
const red = '<i class="fas fa-stop-circle"></i>';
const audio = new Audio('assets/marking sfx.mp4');
let redScore = 0;
let greenScore = 0;
let greenTurn = true;
let counter = 0;

// added the button for the music to play
startButton.addEventListener('click', ()=>{
  startButton.classList.remove('active')
  startGame();
})

// make each cell clickable
function startGame(){
  document.getElementById('bgm').play();
  for(let i = 0; i < cell.length; i++){
    counter = 0
    cell[i].innerHTML = '';
    cell[i].addEventListener('click', afterClick, {once: true});
  };
}

// function that handles the click event
function afterClick(e){
  // target the specific cell
  const targetCell = e.target;

  // turn that will decide what icon will be used and displayed
  const currentTurn = greenTurn ? green : red;
  const displayTurn = greenTurn ? red : green;

  // mark the cell and play audio
  targetCell.innerHTML = currentTurn;
  // audio.play();

  // swap turns and add counter
  greenTurn = !greenTurn;
  counter ++

  // view turn
  turn.innerHTML = `${displayTurn}'s Turn`

  //check wins

  // from top (vertical, horizontal and diagonal)
  if (cell[0].innerHTML == currentTurn) {
    if (
      (cell[1].innerHTML == currentTurn && cell[2].innerHTML == currentTurn) || 
      (cell[3].innerHTML == currentTurn && cell[6].innerHTML == currentTurn) || 
      (cell[4].innerHTML == currentTurn && cell[8].innerHTML == currentTurn)
      ) {
      handleWin(currentTurn);
      restartGame();
    } else if (counter == 9){
      alertWin.innerHTML = 'Draw';
      restartGame();
    }
  }
  
  //from bottom (horizontal and vertical)
  else if (cell[8].innerHTML == currentTurn) {
    if (
      (cell[2].innerHTML == currentTurn && cell[5].innerHTML == currentTurn) || 
      (cell[7].innerHTML == currentTurn && cell[6].innerHTML == currentTurn)
      ){
        handleWin(currentTurn);
        restartGame();
    } else if (counter == 9){
      alertWin.innerHTML = 'Draw';
      restartGame();
    }
  }
  
  //from middle (vertical and horizontal and the other diagonal)
  else if (cell[4].innerHTML == currentTurn) {
    if (
      (cell[3].innerHTML == currentTurn && cell[5].innerHTML == currentTurn) || 
      (cell[1].innerHTML == currentTurn && cell[7].innerHTML == currentTurn) ||
      (cell[7].innerHTML == currentTurn && cell[1].innerHTML == currentTurn) ||
      (cell[2].innerHTML == currentTurn && cell[6].innerHTML == currentTurn)
      ) {
      handleWin(currentTurn)
      restartGame();
    }
  } else if (counter == 9){
    alertWin.innerHTML = 'Draw';
    restartGame();
  }

  // if a player reaches a score of 5
  if(greenScore == 5 || redScore == 5){
    alertWin.innerHTML = `${currentTurn} wins for Good, play again?`;
  }
};

//how to handle the win
function handleWin(turn){
  alertWin.innerHTML = `${turn} wins`;
  if (turn == green){
    greenScore ++;
    playerOne.innerHTML = greenScore;
  } else{
    redScore ++;
    playerTwo.innerHTML = redScore;
  }
}

//restart the game with or without resetting the score
function restartGame (){
  popUp.classList.add('active')
  restartButton.addEventListener('click', ()=>{
    popUp.classList.remove('active');
    alertWin.innerHTML = '';
    if(greenScore == 5 || redScore == 5){
      redScore = 0;
      greenScore = 0
      playerOne.innerHTML = greenScore
      playerTwo.innerHTML = redScore
    } 
    startGame();
  })
}