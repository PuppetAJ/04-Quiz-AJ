var startQuizEl = document.querySelector("#quizStart");
var mainEl = document.getElementById("content");
var wrapperEl = document.getElementById("wrapper");
var timer = document.querySelector("#timer");
var labelEl = document.createElement("p");
labelEl.className = "label";
var counter = 90;
var buttonID = 0;
var questionID = 0;

var questionsArray = [

{
    title: "An object can contain both ____ and ____?",
    answer0: "bits and variables",
    answer1: "bytes and integers",
    answer2: "booleans and properties",
    answer3: "properties and methods",
    correctID: 3
},

{

    title: "What is the use of the isNaN function?",
    answer0: "to determine if a value is null",
    answer1: "to determine if a value is a number",
    answer2: "to determine if a value is NOT a number",
    answer3: "to determine if a value is a boolean",
    correctID: 2
},

{
    title: "Inside which HTML element do we put the JavaScript?",
    answer0: "<script>",
    answer1: "<scripting>",
    answer2: "<javascript>",
    answer3: "<js>",
    correctID: 0
},

{
    title: "How do you write 'Hello World' in an alert box?",
    answer0: "alertBox('Hello World');",
    answer1: "msg('Hello World');",
    answer2: "console.log('Hello World');",
    answer3: "alert('Hello World');",
    correctID: 3
},

{
    title: "How do you call a function named 'myFunction'?",
    answer0: "myFunction();",
    answer1: "call myFunction();",
    answer2: "myFunction().call();",
    answer3: "call function myFunction();",
    correctID: 0
},

{
    title: "Which of these IF statements is correct?",
    answer0: "if i = 5",
    answer1: "if i = 5 then",
    answer2: "if (i === 5)",
    answer3: "if i == 5 then",
    correctID: 2
},

{
    title: "How do you add a comment in HTML?",
    answer0: "//This is a comment",
    answer1: "'This is a comment'",
    answer2: "<!--This is a comment-->",
    answer3: "__This is a comment__",
    correctID: 2
},

{
    title: "Which of these is the correct way to write an array in JavaScript?",
    answer0: "var colors = 'red','green','blue'",
    answer1: "var colors = 1 = ('red'),2 = ('green'), 3 = ('blue')",
    answer2: "var colors = ['red', 'green', 'blue']",
    answer3: "var colors = (1:'red',2:'green',3:'blue')",  
    correctID: 2
},

{
    title: "What does CSS stand for?",
    answer0: "Creative Style Sheets",
    answer1: "Colorful Style Sheets",
    answer2: "Computer Style Sheets",
    answer3: "Cascading Style Sheets",
    correctID: 3
},

{
    title: "Where in an HTML document is the correct place to refer to an external style sheet?",
    answer0: "In the <body> section",
    answer1: "In the <head> section",
    answer2: "At the end of the document",
    answer3: "After the <html> tag",
    correctID: 1
},

{
    title: "Which of these will add a background color for all <h1> elements?",
    answer0: "h1.all {background-color: #FFFFFF;}",
    answer1: "all.h1 {background-color: #FFFFFF;}",
    answer2: ".h1 {background-color: #FFFFFF;}",
    answer3: "h1 {background-color:#FFFFFF;}",
    correctID: 3
}

];

var timerCount = function() {
    if (counter > 0) {
        counter--;
        timer.textContent = ("Time: " + counter);
    } else {
        timer.textContent = "Time: 0";
        return;
    }
};

var questionBuilder = function(question) {

    var sectionEl = document.createElement("section");
    var h2El = document.createElement("h2");
    var divEl = document.createElement("div");

    h2El.textContent = question.title;

    sectionEl.setAttribute("id", "container");

    for (var i = 0; i < 4; i++) {
        var buttonEl = document.createElement("button");
        buttonEl.textContent = question["answer" + i];
        buttonEl.setAttribute("id", buttonID);
        buttonEl.className = "answer";
        buttonEl.setAttribute("name", "answerButton");
        buttonID++;
        divEl.appendChild(buttonEl);

    }

    sectionEl.appendChild(h2El);

    sectionEl.appendChild(divEl);

    wrapperEl.appendChild(sectionEl);
    buttonID = 0;


    var container = document.querySelector("#container");
    container.addEventListener("click", questionChecker);

};

var questionChecker = function(event) {

    var target = event.target;
    var correctID = questionsArray[questionID].correctID;

   
    var correctDisplay = function() {
        wrapperEl.style.borderBottom = "1px solid red";
        labelEl.textContent = "Correct!";
    }

    var wrongDisplay = function() {
        wrapperEl.style.borderBottom = "1px solid red";
        labelEl.textContent = "Wrong!";
    }

    mainEl.appendChild(labelEl);

    if (target.classList.contains("answer")) {

        var correctAnswer = document.getElementById(correctID);

        if (target === correctAnswer) {
            questionID++

            container.remove();
            questionBuilder(questionsArray[questionID]);
            correctDisplay();
        } else {

            wrongDisplay();

            if (counter > 10) {
                counter = counter - 10;
                timer.textContent = ("Time: " + counter);
                questionID++
                container.remove();
                questionBuilder(questionsArray[questionID]);
            } else {
                counter = 0;
                timer.textContent = ("Time: 0");
                container.remove();
            }

        }

    } 

};

var startQuiz = function () {
    var container = document.querySelector("#start");
    container.remove();
    buttonID = 0;
    questionID = 0;

    timer.textContent = "Time: 90";
    setInterval(timerCount, 1000);

    questionBuilder(questionsArray[questionID]);

};

startQuizEl.addEventListener("click", startQuiz);
