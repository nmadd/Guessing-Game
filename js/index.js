



//Creates empty target variable
var target = 0;
//Creates empty array to track guesses
var guesses = [];
//Generates random number from 1-100 and sets target variable
var generateRandNum = function (){
  target = Math.floor(Math.random() * 100 + 1);
};
//Generates random number
generateRandNum();



var guessingGame = function(){


  var guessInput = function(){
    guesses.push($('#number-input').val());
    console.log(target);
    console.log(guesses);
    hotOrCold();
    bgdChange();
    document.getElementById("guessing-form").reset();
    guessTracker();
    repeatChecker();
    higherOrLower();
    hotColdSetter();
  };
  return guessInput();
};

var startOver = function(){
  guesses = [];
  generateRandNum();
  resetBackground('white');
  $('p, h1, h4').css('color','black');
  changeHelperText('Enter a guess from 1-100. Guess right to win a prize!');
  $('#guesses-remaining').text(5);
};


//Pushes guess to 'guesses' array when 'submit' button is clicked
$('#submit-btn').on('click', guessingGame);
//Calls 'start over' function when start over button is clicked
$('#startover-btn').on('click', startOver);

//Resets the background color
var resetBackground = function(color){
  $('.background').css('background-color', color);
};

//Creates 'hot red' and 'cool blue' color variables, to be used as background colors
var hotRed = '#FF4136';
var coolBlue = '#7FDBFF';

var hotOrCold = function(){
  //var guess1 = guesses.pop();
  var guess1 = guesses[guesses.length - 1];
  var guess2 = guesses[guesses.length - 2];
  //Gets absolute value of difference between guess and target 
  var guessDist1 = Math.abs(target - guess1);
  var guessDist2 = Math.abs(target - guess2);

  if(guessDist1 < guessDist2){
    isHot = true;
    isCold = false;
  } else if(guessDist2 < guessDist1) {
    isCold = true;
    ishot = false;
  }

};

//Tracks whether user is hot or cold
var isHot = false;
var isCold = false;

//Changes background color depending on whether user is hot or cold
var bgdChange = function(){
  if(isHot === true){
    resetBackground(hotRed);
    $('p, h1, h4').css('color','white');
  };
  if(isCold === true){
    resetBackground(coolBlue);
    $('p, h1, h4').css('color','white');
  }; 
};

var changeHelperText = function(text){
  $('#helper-text').text(text);
};



var higherOrLower = function(){
  if(guesses[guesses.length -1] > target){
    changeHelperText(" Your guess of " + guesses[guesses.length-1]+ " was a little high. Guess lower!");
  };
  if(guesses[guesses.length -1] < target){
    changeHelperText('Your guess of ' + guesses[guesses.length-1]+ ' was a little low. Guess higher!');
  };
};





//Tracks amount of guesses
var guessTracker = function(){
  var guessNum = guesses.length;
  $('#guesses-remaining').text(5 - guessNum);
  if(guessNum === 5){
    alert("Sorry that's all your guesses! The number was " + target);
    startOver();
  }
};
//Checks if guess has already been made. If it has been, removes that guess and prompts the users to guess again
var repeatChecker = function(){
  for(var i =0; i < guesses.length -1; i++){
    if(guesses[i] === guesses[guesses.length -1]){
      alert('Wait you already guessed that! Guess again');
      guesses.splice(-1,1);
    }
  }
};



