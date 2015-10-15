//Creates empty target variable
var target = 0;
//Creates empty array to track guesses
var guesses = [];
//Generates random number from 1-100 and sets target variable
var generateRandNum = function (){
  target = Math.floor(Math.random() * 100 + 1);
};
var prevGuess = 0;
var prevPrevGuess = 0;

//Generates random number
generateRandNum();

var updatePrevGuess = function(){
  prevGuess = guesses[guesses.length - 1];
  prevPrevGuess = guesses[guesses.length - 2];
};

var guessingGame = function(){
    guesses.push($('#number-input').val());
    updatePrevGuess();
    setLowHigh();
    hotOrCold();
    inputValidator();
    document.getElementById("guessing-form").reset();
    guessTracker();
    displayPrevGuesses();
    repeatChecker();

    console.log(target);
    console.log(guesses);
    console.log(prevGuess);
 
};

//Resets the game and starts over
var startOver = function(){
  guesses = [];
  generateRandNum();
  resetBackground('white');
  $('#prev-guesses').empty();
  changeHelperText('Enter a guess from 1-100. Guess right to win a prize!');
  $('#guesses-remaining').text(5);
  $("#prize-image").children('img').remove();

};

//Creates a hint 
var giveHint = function(){
  var strTarget = target.toString();
  var hintNum = '';
  if(strTarget.length == 1){
    hintNum = 'single digits.';
  } else if(strTarget.length == 2){
    hintNum = target.toString()[0] + '0s.';
  }
  alert("Here's a hint...the number is somehwere in the " + hintNum);
};

//Pushes guess to 'guesses' array when 'submit' button is clicked
$('#submit-btn').on('click', guessingGame);
//Calls 'start over' function when start over button is clicked
$('#startover-btn').on('click', startOver);
//Calls 'give hint' function when start over button is clicked
$('#hint-btn').on('click', giveHint);

//Resets the background color
var resetBackground = function(color){
  $('.background').css('background-color', color);
};

//Creates hot and cool color variables, to be used as background colors
var hotRed = '#FF4136';
var coolBlue = '#7FDBFF';
var burningUp = '#FF0000';
var iceCold = '#C4EFFF';
var warmRed = '#FC6868';

//Lets player know whether they're hot or cold and changes the background color accordingly
var hotOrCold = function(){
  var range = Math.abs(target - prevGuess);
  if(range >0 && range <=5){
    resetBackground(burningUp);
    changeHelperText("You're BURNING UP! Try guessing a little " + lowHigh);
  }
  if(range >5 && range <=10){
     resetBackground(hotRed);
     changeHelperText("You're getting HOT! Try guessing " + lowHigh);
  }
  if(range >10 && range <=15){
    resetBackground(warmRed);
    changeHelperText("You're warming up! Try guessing " + lowHigh);
  }
  if(range >15 && range <=25){
    resetBackground(coolBlue);
    changeHelperText("It's chilly in here... Try guessing " + lowHigh);

  }
  if(range >25){
    resetBackground(iceCold);
    changeHelperText("Brrr...you're ice cold. Try guessing a lot " + lowHigh);
  }
};

//Changes text at the top of the page
var changeHelperText = function(text){
  $('#helper-text').text(text);
};

//Creates and sets variable to inform player whether their guess is low or high
var lowHigh = '';
var setLowHigh = function(){
  if(prevGuess < target)
    lowHigh = 'higher.';
  if(prevGuess > target)
    lowHigh = 'lower.';
};

//Generates a 'prize' and alerts the winner they've won
var prizeGenerator = function(){
  //Generate random number 1-3
  var randNum = Math.floor(Math.random() * 3);
  var prizes =[{name:'Tamagotchi', link: "<img id='theImg' src='http://php.scripts.psu.edu/dmh5086/t/i/shells/v4/orange_stars.jpg'/>"},
  {name:'Pet Rock', link: "<img id='theImg' src='http://a.abcnews.go.com/images/Lifestyle/gty_pet_rock_150401_4x3_992.jpg'/>"},
  {name:'Honeybadger', link: "<img id='theImg' src='http://i.ytimg.com/vi/x9Jr9JKpsX8/maxresdefault.jpg'/>"}]
  alert('You win! Click OK to see your prize');
      resetBackground('white');
      $("#prize-image").append(prizes[randNum].link);
      $('#prev-guesses').empty();
      changeHelperText('Congratulations! You won a ' + prizes[randNum].name);
      
}

//Displays the players' previous guesses
var displayPrevGuesses = function(){
  var guessStr ='';
  if(guesses.length >= 1){
     for(var i =0; i < guesses.length; i++){
      guessStr += guesses[i] + ' ';
     }
    $('#prev-guesses').text('Your previous guesses are: \n' +guessStr);
  }
};

//Tracks amount of guesses
var guessTracker = function(){
  var guessNum = guesses.length;
  //Changes 'Guesses Remaining' number
  $('#guesses-remaining').text(5 - guessNum);
  //Checks if guess is a winner
  if(prevGuess == target){
      prizeGenerator();
  } else{
      //Alerts game over
      if(guessNum === 5){
        alert("Sorry that's all your guesses! The number was " + target);
        startOver();
      }
  }
};

//Checks if guess has already been made. If it has been, removes that guess and prompts the users to guess again
var repeatChecker = function(){
  for(var i =0; i < guesses.length -1; i++){
    if(guesses[i] === guesses[guesses.length -1]){
      alert('Wait you already guessed that! Guess again');
      //Removes last guess
      guesses.splice(-1,1);
    }
  }
};

//Checks to make sure the input is between 1 and 100
var inputValidator = function(){
  var num = parseInt(prevGuess);
  if(num < 0 || num > 100){
    alert('Whoooa sorry that number is out of range! Try guessing again');
    //Removes last guess
    guesses.splice(-1,1);
  }
};

/*

//Tracks whether user is hot or cold
var isWarm = false;
var isHot = false;
var isBurningUp = false;
var isCold = false;
var isIceCold = false;

//Resets temperature variables
var tempResetter = function(){
  isWarm = false;
  isHot = false;
  isBurningUp = false;
  isCold = false
  isIceCold = false;
};

*/

/*
var higherOrLower = function(){
  if(isWarm){
    changeHelperText("You're warming up! Try guessing " + lowHigh);
  };
  if(isHot){
    changeHelperText("You're getting HOT! Try guessing " + lowHigh);
  };
  if(isBurningUp){
    changeHelperText("You're BURNING UP! Try guessing a little " + lowHigh);
  };
  if(isIceCold){
    changeHelperText("Brrr...you're ice cold. Try guessing a lot " + lowHigh);
  };
   if(isCold){
    changeHelperText("It's chilly in here... Try guessing " + lowHigh);
  };
};

*/

/*var changeHelperTextCreator = function(text){
  return function(){
    $('#helper-text').text(text);
  }:
};

var changeHelperText = changeHelperTextCreator(" Your guess of " + guesses[guesses.length-1]+ " was a little high. Guess lower!")



var higherOrLower = function(){
  if(guesses[guesses.length -1] > target){
    changeHelperText(" Your guess of " + guesses[guesses.length-1]+ " was a little high. Guess lower!");
  };
  if(guesses[guesses.length -1] < target){
    changeHelperText('Your guess of ' + guesses[guesses.length-1]+ ' was a little low. Guess higher!');
  };
};

*/

/*
//Changes background color depending on whether user is hot or cold
var bgdChange = function(){
  if(isHot === true){
    resetBackground(hotRed);
    
  };
  if(isCold === true){
    resetBackground(coolBlue);
    
  }; 
  if(isBurningUp === true){
    resetBackground(burningUp);
   
  }; 
  if(isWarm === true){
    resetBackground(warmRed);
  
  };
  if(isIceCold === true){
    resetBackground(iceCold);
   
  };  
};
*/

/*
//Checks for winner
var winChecker = function(){
    if(prevGuess == target){
      alert('You win! Click OK to see your prize');
      resetBackground('white');
      $("#prize-image").append("<img id='theImg' src='http://php.scripts.psu.edu/dmh5086/t/i/shells/v4/orange_stars.jpg'/>");
    }
};
*/




