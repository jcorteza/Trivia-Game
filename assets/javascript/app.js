var rights = 0;
var wrongs = 0;
var timeLeft = 10;
var questionIndex = 0;
var correctOption = "";
var gameInProgress;
var intervalId;

var questionsArrays = [];
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

/* function resizes videos by applying a css class */
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

/* function that displays and hides video */
function videoVisibility() {
    //console.log("clicked on watch video");
    if ($("iframe").css("display") === "none") {
        //console.log("display was none but now it's block");
        resizeVid();
        $("iframe").css("display", "block");
    }
    else if($("iframe").css("display") === "block"){
        //console.log("display was block but now it's none");
        $("#vidDiv").removeAttr("class");
        $("iframe").css("display", "none");  
        //$("#vidDiv").removeAttr("style");
        /*console.log($("#vidDiv").attr("class"));
        if(!$("#vidDiv").hasClass()) {
            
        }*/
    }
}

/* function that sets up #video div */
function displayVideo() {
    let video = questionsArrays[questionIndex]["video"];
    if(video){
        $("#video").html("<div id=\"vidDiv\"></div>");
        $("#vidDiv").html(video);
        var vidDivText = $("<p>").text("Watch Video");
        $(vidDivText).attr("id", "watchText");
        $(vidDivText).prependTo("#video");
        $(vidDivText).css("background-color", "#f9f9f9");
        $("#watchText").click(videoVisibility);
    }
}

/* function uses holdQuestions as a way to push the questions to the final array in a random order so each round doesn't repeat questions in the same order each time */
function questionOrder() {
    for (i = 0; i < holdQuestions.length; i++) {
        do {
            let question = Math.floor(Math.random() * holdQuestions.length);
            if (!questionsArrays.includes(holdQuestions[question])) {
                questionsArrays.push(holdQuestions[question]);
            }
        } while (questionsArrays.length < holdQuestions.length)
    }
}

/* function uses holdAnswer as a way to push the possible answer options into the final answersArray in a random order */
function answerOrder(current) {
    let holdAnswer = [];
    for (i = 0; i < current.options.length; i++) {
        /* this for do while sets up the available answer options in a random order */
        do {
            let answer = Math.floor(Math.random() * current.options.length);
            if (!holdAnswer.includes(current.options[answer])) {
                holdAnswer.push(current.options[answer]);
            }
        } while (holdAnswer.length < current.options.length);
    }
    return holdAnswer;
}

/* function sets the html game text based on the current questionIndex */
function changeQuestionsText(questionIndex) {
    /* if nextQ button is showing, hide it on the new question */
    if ($("#nextQ").css("display")==="block") {
        $("#nextQ").css("display", "none");
    }
    /* remove anything inside the #video div */
    $("#video").empty();
    /* define the current question based on the question index */
    current = questionsArrays[questionIndex];
    /* set up the question ans answer option text bassed on the curernt question index */
    $("#questionText").text(current.question);
    let answersArray = answerOrder(current);
    answersArray.forEach(function (op) {
        let aswerText = $("<li>").text(op);
        $("#answerOptions").append(aswerText);
    });
    $("#answerOptions").click(isWrongRight);
    $("li").hover(function(){
        $(this).css("background-color", "#f9f9f9");
    }, function(){
        $(this).css("background-color", "inherit");
    });
}

/* function to reset trivia game html answer text. otherwise it continues to append to previous answer options */
function resetAnswers() {
    $("nextQ").css("display", "none");
    //questionIndex++;
    console.log("On interation " + questionIndex);
    $("#answerOptions").empty();
    changeQuestionsText(questionIndex);
    correctOption = questionsArrays[questionIndex]["correct"];
    //console.log(correctOption);
}

/* handles what happnes on nextQ click */
function nextClick() {
    $("#nextQ").css("display", "block");
    $("#nextQ").click(function () {
        console.log("click");
        if(questionIndex > 9) {
            gameOver();
        }
        else {
            timeLeft = 11;
            contGame();
        }
    });
}

/* function keeps the game moving forward as time left decrements by 1 each second */
function triviaGame() {
    timeLeft--;
    $("#timeLeft").text(timeLeft);
    if (timeLeft === 0) {
        questionIndex++;
        wrongs++;
        pauseGame();
        nextClick();
        displayVideo();
    }
    if (timeLeft === 10) {
        resetAnswers();
    }
}

/* function that determines if users choice is wrong or right. */
function isWrongRight() {
    questionIndex++;
    pauseGame();
    nextClick();
    displayVideo();
    if ($(event.target).text() === correctOption) {
        rights++;
        $(event.target).css("background-color", "#98FB98");
    }
    else {
        wrongs++;
        $(event.target).css("background-color", "#FFB2B2");
    }
}

/* game over function */
function gameOver() {
    console.log("Inside game over function");
    $("#nextQ").css("display", "none");
    $("#gameElements").css("display", "none");
    $("#gameResults").css("display", "block");
    let rightsText = $("<p>").text("Right Answers: " + rights);
    let wrongsText = $("<p>").text("Wrong Answers: " + wrongs);
    $(rightsText).add(wrongsText).appendTo("#gameResults");
    $("#bonusQ").css("display", "block");
    $("#bonusQ").click(function () {
        console.log("clicked to answer bonus question.");
        questionIndex = questionIndex - 1;
        resetAnswers()
        timeLeft = 10;
        $("#timeLeft").text(timeLeft);
        $("#gameElements").css("display", "block");
        $("#gameResults").css("display", "none");
    });
}

/* function to reset trivia game */
function resetGame() {
    rights = 0;
    wrongs = 0;
    timeLeft = 10;
    questionIndex = 0;
    correctOption = "";
    questionsArrays = [];
    holdQuestions = [];
}

/* function to pause game and stop allowing player to select answer choice */
function pauseGame() {
    clearInterval(intervalId);
    gameInProgress = false;
    $("li").css("background-color", "inherit");
    $("li").off("mouseenter mouseleave");
    $("#answerOptions").off("click");
}

function contGame() {
    if (!gameInProgress) {
        intervalId = setInterval(triviaGame, 1000);
        gameInProgress = true;
    };
}

$(document).ready(function () {
    $("#startGame").click(function () {
        $("#startGame").css("display", "none");
        $("#gameElements").css("display", "block");
        questionOrder();
        gameInProgress = false;
        contGame();
        changeQuestionsText(questionIndex);
        correctOption = questionsArrays[questionIndex]["correct"];
    });
});