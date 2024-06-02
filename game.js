var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(buttonColours[randomNumber]);
    level ++;
    $("h1").text("Level "+level);
    // return randomNumber;
}


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");  
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {$("#"+currentColor).removeClass("pressed")}, 100);
}

$(document).keypress(nextSequence);


function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            nextSequence();
        }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);

        startOver();
    }

    // for (let i = 0; i < gamePattern.length; i++) {
    //     if(gamePattern[i] == userClickedPattern[i]){
    //         console.log("success")
    //         if(i == gamePattern.length - 1){  
    //             setTimeout(nextSequence, 1000);
    //             userClickedPattern = [];
    //         }
    //         if (i == userClickedPattern.length - 1) break;
    //     }else {
    //         console.log("wrong")
    //         playSound("wrong");
    //         $('body').addClass("game-over");
    //         setTimeout(() => {$('body').removeClass("game-over")}, 200);
    //         $("h1").text("Game Over, Press Any Key to Restart");
    //         startOver();
    //         break;
    //     }  
    // }
} 

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}