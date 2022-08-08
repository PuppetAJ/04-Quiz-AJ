var startQuizEl = document.querySelector("#quizStart");
var mainEl = document.getElementById("content");
var timer = document.querySelector("#timer");
var counter = 89;
var buttonID = 0;

var timerCount = function () {
    if (counter >= 0) {
        timer.textContent = ("Time: " + counter);
        counter--;
    } else {
        return;
    }
};

var questionBuilder = function() {
    var sectionEl = document.createElement("section");
    var h2El = document.createElement("h2");
    var divEl = document.createElement("div");

    h2El.textContent = "hello there";

    for (var i = 4; i > 0; i--) {
        var buttonEl = document.createElement("button");
        buttonEl.textContent = "hello";
        buttonEl.setAttribute("id", buttonID);
        buttonEl.setAttribute("name", "answerButton");
        buttonID++;
        divEl.appendChild(buttonEl);
    }

    sectionEl.appendChild(h2El);

    sectionEl.appendChild(divEl);

    mainEl.appendChild(sectionEl);
    buttonID = 0;
};

var startQuiz = function () {
    var container = document.querySelector("#start");
    container.remove();
    buttonID = 0;

    timer.textContent = "Time: 90";
    setInterval(timerCount, 1000);

    questionBuilder();

};

startQuizEl.addEventListener("click", startQuiz);

/* Ok, last added the name "answer button" to each button. if it's pressed it should run a check to see
if the answer is correct (maybe by ID?). also store each question's data in an object and pass it through
question builder */