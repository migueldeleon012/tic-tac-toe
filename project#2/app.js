//score
const board = document.querySelector('#gameBoard');
const cell = document.querySelectorAll('.cell')
const scoreBoard = document.querySelector('#scoreBoard');
const playerOneScore = document.querySelector('#playerOneScore');
const playerTwoScore = document.querySelector('#playerTwoScore');
const playerOneNameParagraph = document.querySelector('#playerOneNameParagraph');
const playerTwoNameParagraph = document.querySelector('#playerTwoNameParagraph');

//divs
const alert = document.querySelector('#alertWin');
const outcomePopUp = document.querySelector('#outcomePopUp');
const playerOneNameDiv = document.querySelector('#playerOneName');
const playerTwoNameDiv = document.querySelector('#playerTwoName');
const howToPlayDiv = document.querySelector('#instructions');
const startButtonDiv = document.querySelector("#startingButtonDiv");
const turn = document.querySelector('#currentTurn');

//buttons
const restartButton = document.querySelector('#restart');
const startButton = document.querySelector('#startingButton');
const howToPlayButton = document.querySelector('#howToPlay');
const goBackButton = document.querySelector('#goBack');
const playerOneButton = document.querySelector('#playerOneButton');
const playerTwoButton = document.querySelector('#playerTwoButton');

//inputs
const playerOneName = document.querySelector('#playerOneNameInput');
const playerTwoName = document.querySelector('#playerTwoNameInput');

//logic 
const green = '<i class="fas fa-play-circle"></i>';
const red = '<i class="fas fa-stop-circle"></i>';
const audio = new Audio('assets/marking sfx.mp4');
let redScore = 0;
let greenScore = 0;
let greenTurn = true;
let counter = 0;

// start button, pick the names for the players
startButton.addEventListener('click', ()=>{
  startButtonDiv.classList.remove('active')
  playerOneNameDiv.classList.add('active');
})

playerOneButton.addEventListener('click', ()=>{
  playerOneNameDiv.classList.remove('active');
  playerTwoNameDiv.classList.add('active');
  playerOneName.value == '' ? alertNameError() : playerOneNameParagraph.innerHTML = playerOneName.value;
  playerOneName.value = ''
  console.log(playerOneName.value)
})

playerTwoButton.addEventListener('click', ()=>{
  playerTwoNameDiv.classList.remove('active');
  playerTwoName.value == '' ? alertNameError() : playerTwoNameParagraph.innerHTML = playerTwoName.value;
  playerTwoName.value = ''
  startGame();
})

// display the content of how to play
howToPlayButton.addEventListener('click', ()=>{
  startButtonDiv.classList.remove('active');
  howToPlayDiv.classList.add('active');
});

//go back to the main screen
goBackButton.addEventListener('click', ()=>{
  howToPlayDiv.classList.remove('active');
  startButtonDiv.classList.add('active');
})

function alertNameError(){
  return;
}

// make each cell clickable
function startGame(){
  // document.getElementById('bgm').play();
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
  // audio.play()

  // swap turns and add counter
  greenTurn = !greenTurn;
  counter ++

  // view turn
  turn.innerHTML = `${displayTurn}'s Turn`;

  //check wins
  checkWin(currentTurn);

  // if a player reaches a score of 5
  if(greenScore == 5 || redScore == 5){
    alertWin.innerHTML = `${currentTurn} wins for Good`;
    restartButton.innerHTML =  `Go back to main menu`;
    startingButtonDiv.classList.add('active');
  }
};


function checkWin(turn){
    // from top (vertical, horizontal and diagonal)
    if (cell[0].innerHTML == turn) {
      if (
        (cell[1].innerHTML == turn && cell[2].innerHTML == turn) || 
        (cell[3].innerHTML == turn && cell[6].innerHTML == turn) || 
        (cell[4].innerHTML == turn && cell[8].innerHTML == turn)
        ) {
        handleWin(turn);
        restartGame();
      } else if (counter == 9){
        alertWin.innerHTML = 'Draw';
        restartGame();
      }
    }
    
    //from bottom (horizontal and vertical)
    else if (cell[8].innerHTML == turn) {
      if (
        (cell[2].innerHTML == turn && cell[5].innerHTML == turn) || 
        (cell[7].innerHTML == turn && cell[6].innerHTML == turn)
        ){
          handleWin(turn);
          restartGame();
      } else if (counter == 9){
        alertWin.innerHTML = 'Draw';
        restartGame();
      }
    }
    
    //from middle (vertical and horizontal and the other diagonal)
    else if (cell[4].innerHTML == turn) {
      if (
        (cell[3].innerHTML == turn && cell[5].innerHTML == turn) || 
        (cell[1].innerHTML == turn && cell[7].innerHTML == turn) ||
        (cell[7].innerHTML == turn && cell[1].innerHTML == turn) ||
        (cell[2].innerHTML == turn && cell[6].innerHTML == turn)
        ) {
        handleWin(turn)
        restartGame();
      }
    } else if (counter == 9){
      alertWin.innerHTML = 'Draw';
      restartGame();
    }  
}

//how to handle the win
function handleWin(turn){
  alertWin.innerHTML = `${turn} wins`;
  if (turn == green){
    greenScore ++;
    playerOneScore.innerHTML = greenScore;
  } else{
    redScore ++;
    playerTwoScore.innerHTML = redScore;
  }
}

//restart the game with or without resetting the score
function restartGame (){
  outcomePopUp.classList.add('active')
  restartButton.addEventListener('click', ()=>{
    outcomePopUp.classList.remove('active');
    alertWin.innerHTML = '';
    if(greenScore == 5 || redScore == 5){
      redScore = 0;
      greenScore = 0
      playerOneScore.innerHTML = greenScore
      playerTwoScore.innerHTML = redScore
    } 
    startGame();
  })
}