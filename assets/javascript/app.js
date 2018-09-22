var rights = 0;
var wrongs = 0;
var timeLeft = 10;
var questionIndex = undefined;
var currentQ = undefined;
var correctOption = undefined;
var gameInProgress = false;
var intervalId = undefined;
//var current;

var questionsArray = [];
var holdQuestions = [];

/* question objects set "question," answer "options," and "correct" answer keys and push object to array */
var actionLeague = {
    question: "Fill in the blank: The Flesh—he’s super strong and super _____.",
    options: ["smart", "handsome", "blonde", "naked"],
    correct: "naked",
    video: "<iframe width=\"560\" height=\"315\" style=\"display: none\" src=\"https://www.youtube.com/embed/GihnbWsv_1U?rel=0\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>"
}
holdQuestions.push(actionLeague);

var dextersLab = {
    question: "Dexter uses a hidden button to access his laboratory. What’s the title of the book?",
    options: ["The Genius of Me Vol. I", "Chemistry for Geniuses", "Quantum Physics for Lonely People", "Ridiculously Difficult Math 2nd"],
    correct: "The Genius of Me Vol. I",
    video: "<iframe width=\"560\" height=\"315\" style=\"display: none\" src=\"https://www.youtube.com/embed/vxRezZ2FpBo?rel=0&amp;start=24\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>"
}
holdQuestions.push(dextersLab);

var powerpuff1 = {
    question: "In the first short episode of The Powerpuff Girls, Fuzzy Lumpkins turns Bubbles' pigtail into a _____?",
    options: ["meatball", "pigtail", "hairball", "chicken drumstick"],
    correct: "chicken drumstick",
    video: "<iframe width=\"560\" height=\"315\" style=\"display: none\" src=\"https://www.youtube.com/embed/TDBdzsCFWQg?rel=0&amp;start=13\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>"
}
holdQuestions.push(powerpuff1);

var powerpuff2 = {
    question: "What was the original name for the show, The Powerpuff Girls?",
    options: ["Girl-Power Crime Fighters", "Kick-Ass Girls", "Whoop-Ass Girls", "Sugar, Spice, Everything Nice"],
    correct: "Whoop-Ass Girls",
    video: "<iframe width=\"560\" height=\"315\" style=\"display: none\" src=\"https://www.youtube.com/embed/APnZCdiStKI?rel=0\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>"
}
holdQuestions.push(powerpuff2);

var justiceLeague = {
    question: "In the Justice League Unlimited episode, “This Little Piggy,” Batman sings which song?",
    options: ["A Boy Named Sue, Johnny Cash", "Am I Blue, Eddie Cochran", "Mad World, Gary Jules", "Run Pig Run, The Queens of the Stone Age"],
    correct: "Am I Blue, Eddie Cochran",
    video: "<iframe width=\"560\" height=\"315\" style=\"display: none\" src=\"https://www.youtube.com/embed/w4XIAjNuHPg?rel=0\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>"
}
holdQuestions.push(justiceLeague);

var rugrats = {
    question: "What was the name of Angelica’s favorite doll?",
    options: ["Barbie", "Betsy", "Carol", "Cynthia"],
    correct: "Cynthia"
}
holdQuestions.push(rugrats);

var heyArnold = {
    question: "Which of the following did Helga not have?",
    options: ["A lock of Arnold’s hair", "A locket with Arnold’s picture", "A bust of Arnold made out of gum", "She had all of the above"],
    correct: "She had all of the above",
    video: "<iframe width=\"560\" height=\"315\" style=\"display: none\" src=\"https://www.youtube.com/embed/gmHKSUnIXQQ?rel=0\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>"
}
holdQuestions.push(heyArnold);

var cowardlyDog1 = {
    question: "Courage the Dog and his owners live out in the middle of  _____?",
    options: ["Florida", "Georgia", "The Saharah", "Nowhere"],
    correct: "Nowhere"
}
holdQuestions.push(cowardlyDog1);

var cowardlyDog2 = {
    question: "Fill in the blank: ____ dog! You made me look bad!",
    options: ["Cowardly", "Silly", "Stupid", "Genius"],
    correct: "Stupid",
    video: "<iframe width=\"560\" height=\"315\" style=\"display: none\" src=\"https://www.youtube.com/embed/UtMLRQtCblw?rel=0\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>"
}
holdQuestions.push(cowardlyDog2);

var cowChicken = {
    question: "What was the title of the short cartoon segment that played during episodes of Cow and Chicken?",
    options: ["I Am Man", "I Am Legend", "I Am Weasel", "I Am Batman"],
    correct: "I Am Weasel",
    video: "<iframe width=\"560\" height=\"315\" style=\"display: none\" src=\"https://www.youtube.com/embed/VvLV3OZAcyg?rel=0\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>"
}
holdQuestions.push(cowChicken);

var johnnyBravo = {
    question: "What was the dance during the intro of the cartoon, Johny Bravo?",
    options: ["The Monkey", "The Cabage Patch", "The Electric Slide", "The Robocop"],
    correct: "The Monkey",
    video: "<iframe width=\"560\" height=\"315\" style=\"display: none\" src=\"https://www.youtube.com/embed/KdRhQ669s2c?rel=0\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>"
}
holdQuestions.push(johnnyBravo);

$(document).ready(function () {
    /* clicking #startGame button starts the game and runs the anonymous function */
    $("#startGame").on("click", function () {
        questionIndex = -1;
        /* hide's #startGame button once it has been pressed */
        $("#startGame").css("display", "none");
        /* f questionOrder pushes the question objects into the questions Array in a random order */
        questionOrder();
        console.log(questionsArray);
        playGame();
    });
});

function playGame() {
    changeQuestionText();
    $("#gameElements").css("display", "block");
    startTime();
    $("#answerOptions").one("click", function() {
        pauseGame();
        answerRightWrong($(event.target));
    });
}

/* function uses holdQuestions as a way to push the questions to the final array in a random order so each round doesn't repeat questions in the same order each time */
function questionOrder() {
    for (i = 0; i < holdQuestions.length; i++) {
        do {
            let question = Math.floor(Math.random() * holdQuestions.length);
            if (!questionsArray.includes(holdQuestions[question])) {
                questionsArray.push(holdQuestions[question]);
            }
        } while (questionsArray.length < holdQuestions.length)
    }
}

/* function sets the html game text based on the current questionIndex */
function changeQuestionText() {
    questionIndex++;
    console.log(questionIndex);
    /* if nextQ button is showing, hide it on the new question */
    if ($("#nextQ").css("display")==="block") {
        $("#nextQ").css("display", "none");
    }
    $("#answerOptions").empty();
    /* remove anything inside the #video div */
    $("#video").empty();
    /* define the current question based on the question index */
    currentQ = questionsArray[questionIndex];
    /* set up the question ans answer option text bassed on the curernt question index */
    $("#questionText").text(currentQ.question);
    /* sets variable answerArray equal to an array of possible answer choices (in a random order) for the current question */
    let answersArray = answerOrder(currentQ);
    /* places each possible answer held in answerArray into an in individual list item and appends it to the #answerOptions div */
    answersArray.forEach(function (answerOption) {
        let aswerText = $("<li>").text(answerOption);
        $("#answerOptions").append(aswerText);
    });
    /* function handles answer option list item hover effect */
    $("li").hover(function(){
        $(this).css("background-color", "#f9f9f9");
    }, function(){
        $(this).css("background-color", "inherit");
    });
}

/* function uses holdAnswers as a way to push the possible answer options into the final answersArray in a random order */
function answerOrder(currentQ) {
    let holdAnswers = [];
    for (i = 0; i < currentQ.options.length; i++) {
        /* this for do while sets up the available answer options in a random order */
        do {
            let answerIndex = Math.floor(Math.random() * currentQ.options.length);
            if (!holdAnswers.includes(currentQ.options[answerIndex])) {
                holdAnswers.push(currentQ.options[answerIndex]);
            }
        } while (holdAnswers.length < currentQ.options.length);
    }
    return holdAnswers;
}
/* sets game status to in progress and starts countdown function */
function startTime() {
    if (!gameInProgress) {
        intervalId = setInterval(countdown, 1000);
        gameInProgress = true;
    };
}

/* function keeps the game moving forward as time left decrements by 1 each second */
function countdown() {
    timeLeft--;
    $("#timeLeft").text(timeLeft);
    if (timeLeft === 0) {
        wrongs++;
        pauseGame();
    }
}

/* function that decides wheterht he user choice was right or wrong and lets him or her know it*/
function answerRightWrong(liChosen) {
    correctOption = currentQ.correct;
    var that = liChosen;
    if ($(that).text() === correctOption) {
        rights++;
        $(that).css("background-color", "#98FB98");
        /*let optionText = $(that).text();
        $(that).text(optionText + "—You make the cartoon gods proud.");*/
        pauseGame();
    }
    else {
        wrongs++;
        $(that).css("background-color", "#FFB2B2");
        /*let optionText = $(that).text();
        $(that).text(optionText + "—You call yourself a 90's kid?");*/
        pauseGame();
    }
}

function pauseGame() {
    /* pause time */
    pauseTime();
    /* display option to view related video */
    displayVideo();
    /* show nextClick button */
    nextClick();
}

/* function to pause countdown and set game to no longer in progress  stop allowing player to select answer choice */
function pauseTime() {
    clearInterval(intervalId);
    gameInProgress = false;
    $("li").off("mouseenter mouseleave");
    $("#answerOptions").off("click");
    if(timeLeft === 0) {
        $("li").css("background-color", "inherit");
    }
}

/* function that sets up #video div */
function displayVideo() {
    if(currentQ.video){
        $("#video").html("<div id=\"vidDiv\"></div>");
        $("#vidDiv").html(currentQ.video);
        var vidDivText = $("<p>").text("Watch Video");
        $(vidDivText).attr("id", "watchText");
        $(vidDivText).prependTo("#video");
        $(vidDivText).css("background-color", "#f9f9f9");
        /* click #watchText to run videoVisibility function */
        $("#watchText").on("click", videoVisibility);
        /* sets hover properties for #watchText */
        $("#watchText").hover(function(){$("#watchText").css("background-color", "purple");}, function() {$("#watchText").css("background-color", "yellow");});
    }
}

/* function that displays and hides video when #watchText is clicked*/
function videoVisibility() {
    if ($("iframe").css("display") === "none") {
        /* video is resized depending on it's aspect ratio using f resizeVid */
        resizeVid();
        /* video is set to be displayed to user */
        $("iframe").css("display", "block");
    }
    else if($("iframe").css("display") === "block"){
        /* video is hidden from user */
        $("#vidDiv").removeAttr("class");
        $("iframe").css("display", "none");  
    }
}

/* function uses a switch case to apply  a predetermined css class to #vidDiv in order to resize it to fit the video's aspect ratio */
function resizeVid() {
    switch(correctOption) {
        case "naked": $("#vidDiv").attr("class", "traditionalAspect");
        break;
        case "The Genius of Me Vol. I": $("#vidDiv").attr("class", "traditionalAspect");
        break;
        case "chicken drumstick": $("#vidDiv").attr("class", "traditionalAspect");
        break;
        case "Whoop-Ass Girls": $("#vidDiv").attr("class", "traditionalAspect");
        break;
        case "Am I Blue, Eddie Cochran": $("#vidDiv").attr("class", "wideAspect");
        break;
        case "She had all of the above": $("#vidDiv").attr("class", "wideAspect");
        break;
        case "Stupid": $("#vidDiv").attr("class", "traditionalAspect");
        break;
        case "I Am Weasel": $("#vidDiv").attr("class", "traditionalAspect");
        break;
        case "The Monkey": $("#vidDiv").attr("class", "traditionalAspect");
        break;
    }
}

/* f nextClick displays Next button and handles what happens when nextQ button is clicked */
function nextClick() {
    $("#nextQ").css("display", "block");
    $("#nextQ").off("click").on("click", function () {
        if (questionIndex === 10 ) {
            bonusResults();
        }
        else if(questionIndex === 9) {
            /* when the user has answer index 9 question (question 10) and clicks on next the f gameOver is initiated */
            gameOver();
        }
        else {
            timeLeft = 11;
            playGame();
        }
    });
}

/* game over function */
function gameOver() {
    /* hide the #nextQ button from the user */
    $("#nextQ").css("display", "none");
    /* hide the #gameElements from the user */
    $("#gameElements").css("display", "none");
    /* display the results of the game */
    let rightsText = $("<p>").text("Right Answers: " + rights);
    let wrongsText = $("<p>").text("Wrong Answers: " + wrongs);
    $(rightsText).add(wrongsText).appendTo("#gameResults");
    $("#gameResults").css("display", "block");
    /* displays the #resetGame button */
    $("#resetGame").css("display", "block");
    /* if #resetGame button pressed, game is reset */
    $("#resetGame").one("click",function() {
        resetGame();
    });
    /* displays the #bonusQ option */
    $("#bonusQ").css("display", "block");
    /* if #bonusQ button pressed, user will anser 1 more question */
    $("#bonusQ").off("click").on("click", bonusRound);
}

function bonusRound() {
    console.log("clicked to answer bonus question.");
    $("#gameResults").empty();
    $("#gameResults").css("display", "none");
    $("#bonusQ").css("display", "none");
    //resetAnswers();
    timeLeft = 11;
    playGame();
}

function bonusResults() {
   if ($("#nextQ").css("display")==="block") {
        $("#nextQ").css("display", "none");
    }
   let bonusText = $("<p>").text("Final Results");
   let rightsText = $("<p>").text("Right Answers: " + rights);
   let wrongsText = $("<p>").text("Wrong Answers: " + wrongs);
   $("#gameElements").css("display", "none");
   $("#gameResults").css("display", "block");
   $(bonusText).add(rightsText).add(wrongsText).appendTo("#gameResults");
   $("#resetGame").css("display", "block");
   $("#resetGame").one("click", function() {
        resetGame();
    });
}

/* function to reset trivia game */
function resetGame() {
    rights = 0;
    wrongs = 0;
    timeLeft = 11;
    questionIndex = undefined;
    currentQ = undefined;
    correctOption = undefined;
    gameInProgress = false;
    intervalId = undefined;
    questionsArray = [];
    pauseTime();
    $("#questionText").empty();
    $("#answerOptions").empty();
    $("#video").empty();
    $("#gameResults").empty();
    $("#gameResults").css("display", "none");
    $("#resetGame").css("display", "none");
    $("#bonusQ").css("display", "none");
    $("#gameElements").css("display", "none");
    $("#startGame").css("display", "block");
}