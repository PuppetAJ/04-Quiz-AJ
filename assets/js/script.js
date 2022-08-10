// Global variable declarations (to be accessed by most functions)
var startQuizEl = document.querySelector("#quizStart");
var mainEl = document.getElementById("content");
var wrapperEl = document.getElementById("wrapper");
var timer = document.querySelector("#timer");
var pEl = document.createElement("p");
var counter = 90;
var buttonID = 0;
var questionID = 0;
var highScoreEl = document.querySelector(".hs");

/* 
timerInterval object created so that I can append an interval created in one function to it 
once a button is pressed, and access it in another function as a property of this object
*/
var timerInterval = {};

// scores array that keeps track of the user's high scores
var scores = [];


// array which stores every question in the quiz

var questionsArray = [
    // Ids are in the names of each answer, and the correctID is saved within the object for referencing later
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

// Home page generation function, for use when trying to return to the start page.
var homePageGen = function() {

    // generates the view high scores link with the appropriate event listener, removing ones with no use, and resetting text content
    if (document.querySelector(".hs")) {
        var viewHsEl = document.querySelector(".hs");
        viewHsEl.textContent = "View high scores";
        viewHsEl.removeEventListener("click", homePageGen);
        viewHsEl.addEventListener("click", highScorePage);
    }
    
    // sets the timer element's text to N/A as the quiz hasn't started yet
    var timer = document.getElementById("timer");
    timer.textContent = "Time: N/A";

    // When on the High scores page, it will remove these elements before generating the next section
    // The reason I didn't use an if statement to check if we're on the high scores page first is due to the fact that this function is only called by the "go back" button on that page
    var highScoreSectionEl = document.getElementById("scoreScreen");
    highScoreSectionEl.remove();

    // Element creation
    var sectionEl = document.createElement("section");
    var h2El = document.createElement("h2");
    var divEl1 = document.createElement("div");
    var paragraphEl = document.createElement("p");
    var divEl2 = document.createElement("div");
    var buttonEl = document.createElement("button");

    // Defining attributes for each element
    // This style attribute was necessary for line breaks
    paragraphEl.setAttribute("style", "white-space: pre;");
    sectionEl.setAttribute("id", "start");
    divEl1.setAttribute("class", "welcome");
    divEl2.setAttribute("class", "welcome");
    buttonEl.setAttribute("id", "quizStart");

    // Sets the text content for the elements with line breaks where needed
    h2El.textContent = "Coding Quiz Challenge!";
    paragraphEl.textContent = "Try to answer the following code-related questions within the time limit. \r\n"; 
    paragraphEl.textContent += "Keep in mind that incorrect answers will penalize your score/time \r\n";
    paragraphEl.textContent += "by ten seconds!";
    buttonEl.textContent = "Start Quiz";

    // Appends elements to each other in the order we want
    divEl1.appendChild(paragraphEl);
    divEl2.appendChild(buttonEl);
    sectionEl.appendChild(h2El);
    sectionEl.appendChild(divEl1);
    sectionEl.appendChild(divEl2);

    // Adds an event listener to the start quiz button to run the startQuiz() function
    buttonEl.addEventListener("click", startQuiz);

    // Finally, appends all the previously created elements to a section element with a class of "wrapper", which is always present in the HTML to append children to
    wrapperEl.appendChild(sectionEl);

};

// Function which holds the logic for setting up and initiating the quiz
var startQuiz = function () {

    // When the start quiz button is pressed, we remove the text from the "view high scores" link, to prevent people from trying to leave the quiz while it is in progress
    if (document.querySelector(".hs")) {
        var viewHsEl = document.querySelector(".hs");
        viewHsEl.removeEventListener("click", highScorePage);
        viewHsEl.textContent = "";
    }

    // Selects the container holding the main page's elements and removes them before constructing the first quiz question
    var container = document.querySelector("#start");
    container.remove();

    // Resets all important variables such as the timer
    counter = 90;
    buttonID = 0;
    questionID = 0;

    // Starts an interval function which runs every second
    timerInterval.interval = setInterval(timerCount, 1000);

    // Sets the text content of the timer to 90, as opposed to N/A
    timer.textContent = "Time: 90";

    // Finally, initiates the questionBuilder() function with the first question in questionsArray passed as an argument
    questionBuilder(questionsArray[questionID]);

};

// Logic for timer
var timerCount = function() {

    // If the counter is above 0, then I want it to decrease and display the time
    if (counter > 0) {
        counter--;
        timer.textContent = ("Time: " + counter);

        // In addition, I want it to run the counterCheck() function, to prevent a delay in registering when the game has ended
        counterCheck();
    
    // If the counter is not above 0, then I want the timer to stop, and the timer to be set at 0
    } else {
        timer.textContent = "Time: 0";
        clearInterval(timerInterval.interval);
    }

};

// Logic for checking if the timer is 0
var counterCheck = function() {

    // When the timer is at 0, call the gameOver() function to bring up the end screens
    if (counter == 0) {
        gameOver();
    };
};

// questionBuilder function which contains the logic for building every question onto the page. grabs arguements from an array as opposed to having a different function for each question
var questionBuilder = function(question) {

    // Element creation
    var sectionEl = document.createElement("section");
    var h2El = document.createElement("h2");
    var divEl = document.createElement("div");

    // Sets the h2 element's text to match the title of the question object we passed into this function
    h2El.textContent = question.title;

    // Sets necessary attributes
    sectionEl.setAttribute("id", "container");

    // For loop for button creation
    for (var i = 0; i < 4; i++) {
        // Initially creates a singular button element
        var buttonEl = document.createElement("button");

        // Then, it sets the text content equal to the answer+i property of the question object we passed into the function. 
        buttonEl.textContent = question["answer" + i];

        // Sets the id of the question to equal the global buttonID variable, which starts at 0
        buttonEl.setAttribute("id", buttonID);

        // Sets the class of each button to "answer"
        buttonEl.className = "answer";

        // Increases buttonID by one
        buttonID++;

        // Finally appends the element before repeating the loop
        divEl.appendChild(buttonEl);
    }

    // Appends the rest of the elements
    sectionEl.appendChild(h2El);

    sectionEl.appendChild(divEl);

    wrapperEl.appendChild(sectionEl);

    // After generation, buttonID is reset to 0. This way, when the next answers are generated they will always have an ID of 0 - 3. 
    buttonID = 0;

    // Adds an event listener to the container element to run the questionLogic() function 
    var container = document.querySelector("#container");
    container.addEventListener("click", questionLogic);

};

// Contains the logic for checking if the question a button is pressed on is the final question or not
var questionLogic = function(event) {

    // Similarly repeated code from the questionChecker() function. It's necessary yet different, and is used here to ensure that when we reach the final question, we stop trying to generate new questions
    // Instead, it generates the Game over screen no matter what button is pressed, but makes sure to decrease your score if you get the last answer wrong
    
    // See questionChecker()
    var correctID = questionsArray[questionID].correctID;
    target = event.target;

    // Sets the final question's ID to be equal to the length of all the questions minus one. 
    // This is due to the fact that we increment the questionID by one each time we generate a new question, and once we reach the final one we want to execute this logic
    finalQuestionID = questionsArray.length - 1;

    if (questionID === finalQuestionID) {

        // Stops the timer since it is the final question
        clearInterval(timerInterval.interval);

        // See questionChecker()
        if (target.classList.contains("answer")) {
 
            var correctAnswer = document.getElementById(correctID);
    
            if (target === correctAnswer) {
                
                // Calls gameOver function
                gameOver();
    
            } else {
                // See questionChecker()
                if (counter > 10) {
                    counter = counter - 10;
                    timer.textContent = ("Time: " + counter);
                    gameOver();
                } else {
                    counter = 0;
                    timer.textContent = ("Time: 0");
                    gameOver();
                }
    
            }
    
        }
    // If not the final question, calls the questionChecker() function and passes through the clicked element as an argument to the function
    // then returns to break the statement
    } else {
        questionChecker(target);
        return;
    }

};

// Contains the logic for checking if an answer pressed is correct or incorrect
var questionChecker = function(target) {

    // Since we store the correct answer's ID in the question object, we can access the current question we're on and extract the correctID property
    var correctID = questionsArray[questionID].correctID;

    // Function for displaying when an answer pressed is correct
    var correctDisplay = function() {
        wrapperEl.style.borderBottom = "3px solid green";
        pEl.textContent = "Correct!";
        pEl.className = "Correct"
    }

    // Function for displaying when an answer pressed is incorrect
    var wrongDisplay = function() {
        wrapperEl.style.borderBottom = "3px solid red";
        pEl.textContent = "Wrong!";
        pEl.className = "Wrong";
    }

    // Appends the element
    mainEl.appendChild(pEl);

    // Checks to see if we clicked an element with the class of "answer"
    if (target.classList.contains("answer")) {

        // Since we store the numeric ID of the correct answer, and extracted it previously, we can now determine the correct answer by matching its ID to the correctID
        var correctAnswer = document.getElementById(correctID);

        // checks to see if the ID of the button pressed is the same as the correct answer's ID
        if (target === correctAnswer) {
            // If so, increments the questionID so we know we are on the next question
            questionID++

            // Then it removes all the elements on the page
            container.remove();

            // And then calls the questionBuilder() function with the next question object passed as an argument
            questionBuilder(questionsArray[questionID]);
            
            // Since the answer pressed was correct, we display a message saying they were right
            correctDisplay();
        
        // If not correct then we execute this logic
        } else {

            // First we tell the user that they were wrong
            wrongDisplay();

            // Then we check to see if the counter is greater than 10 since we substract 10 everytime we get an answer wrong
            if (counter > 10) {
                // Since we got the answer wrong and the counter is above 10, we reduce it by 10
                counter = counter - 10;

                // We set the timer to the updated value
                timer.textContent = ("Time: " + counter);

                // Increment the question ID to move on to the next question
                questionID++

                // Remove all elements
                container.remove();

                // And call the questionBuilder() function to construct our next question
                questionBuilder(questionsArray[questionID]);

            } else {
                // If the counter is not above 10, then we set it to 0 to prevent it from becoming negative
                counter = 0;

                // We set the text content to 0
                timer.textContent = ("Time: 0");

                // Remove all elements
                container.remove();

                // And call the gameOver() function since we reached a time of 0, and the game has to end
                gameOver();
            }

        }

    } 

};

// Logic for generating the game over screen
var gameOver = function() {

    // Sets text content of "view high scores" back to being visible
    if (document.querySelector(".hs")) {
        var viewHsEl = document.querySelector(".hs");
        viewHsEl.textContent = "View high scores";
        viewHsEl.addEventListener("click", highScorePage);
    }

    // If link is pressed when a section element with the ID of container is pressed, then it will remove it before generating the next elements
    if (document.getElementById("container")) {
        var container = document.getElementById("container");
        container.remove();
    }

    // Elemnent generation
    var sectionEl = document.createElement("section");
    var h2El = document.createElement("h2");
    var h3El = document.createElement("h3");
    var formEl = document.createElement("form");
    var labelEl = document.createElement("label");
    var inputEl = document.createElement("input");
    var submitEl = document.createElement("input");

    // Setting important attributes to each element
    sectionEl.setAttribute("id", "endScreen");
    h2El.setAttribute("id", "endScreenTitle");
    h3El.setAttribute("id", "endScreenSubtitle");
    labelEl.setAttribute("for", "initials");
    inputEl.setAttribute("id", "initials");
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute("value", "submit");
    submitEl.setAttribute("id", "submit");

    // Sets text content of elements
    h2El.textContent = "All Done!";
    h3El.textContent = "Your final score is " + counter + "!";
    labelEl.textContent = "Enter initials";

    // Appends all elements in the order we desire
    formEl.appendChild(labelEl);
    formEl.appendChild(inputEl);
    formEl.appendChild(submitEl);

    sectionEl.appendChild(h2El);
    sectionEl.appendChild(h3El);
    sectionEl.appendChild(formEl);

    wrapperEl.appendChild(sectionEl);
    
    // Makes sure to remove both the colored border of wrong/right answers, and the paragraph element containing the text
    wrapperEl.style.borderBottom = "none";
    pEl.remove();

    // binds anymous function to the game over's high score submit button
    formEl.addEventListener("submit", function(event) {
        // prevents submit from reloading page
        event.preventDefault();

        var input = document.getElementById("initials").value

        // Input validation, makes sure that initials are actually input and that the text box is not empty
        if (input === null || input === "" || input.length > 3) {

            alert("You must write your initials!");
            
            // Resets invalid input
            formEl.reset()
        
        // When valid criteria is input, package the username and high score into an object, and push it into an array of scores
        } else {
            var score = counter

            var userValues = {
                userName: input,
                userScore: score
            }
    
            scores.push(userValues);
            // Saves scores
            saveScores();
            // Resets inputs
            formEl.reset();
            // Takes the user to the high score page
            highScorePage();

        }


    });
   
};

// Logic for generating the high scores page
var highScorePage = function() {

    // Removes the text content of the timer when on the high score page
    if (document.getElementById("timer")) {
        var timerEl = document.getElementById("timer");
        timerEl.textContent = "";
    }

    // Removes the text content of the view high scores link 
    if (document.querySelector(".hs")) {
        var viewHsEl = document.querySelector(".hs");
        viewHsEl.textContent = "";
        viewHsEl.removeEventListener("click", highScorePage);
        viewHsEl.addEventListener("click", homePageGen);
    }

    // If on the gameover screen, it will remove those elements before generating the high score page
    if (document.getElementById("endScreen")) {
        var endSectionEl = document.getElementById("endScreen");
        endSectionEl.remove();
    }

    // If on the start page, it will remove those elements before generating the high score page
    if (document.getElementById("start")) {
        var startSectionEl = document.getElementById("start");
        startSectionEl.remove();
    }

    // Element creation
    var sectionEl = document.createElement("section");
    var h2El = document.createElement("h2");
    var divEl1 = document.createElement("div");
    var divEl2 = document.createElement("div");
    var buttonEl1 = document.createElement("button");
    var buttonEl2 = document.createElement("button");

    // Reads the length of the scores array and loops through it creating a p element for each high score saved in the array
    for (var i = 0; i < scores.length; i++) {
        // Element creation
        var scoreEl = document.createElement("p");
        // Sets text content to the username and user score of the index the loop is on
        scoreEl.textContent = (i + 1) + ". " + scores[i].userName + " - " + scores[i].userScore;
        // Gives the p element a class of score
        scoreEl.setAttribute("class", "score");
        // Appends element
        divEl1.appendChild(scoreEl);
    }

    // Attribute setting for elements
    sectionEl.setAttribute("id", "scoreScreen");
    h2El.setAttribute("id", "endScreenTitle");
    divEl1.setAttribute("class", "scores");
    divEl2.setAttribute("class", "buttonWrapper");
    buttonEl1.setAttribute("class", "scoreButton");
    buttonEl2.setAttribute("class", "scoreButton");

    // Sets text content for elements
    h2El.textContent = "High Scores:";
    buttonEl1.textContent = "Go back";
    buttonEl2.textContent = "Clear high scores";

    // Appends elements
    divEl2.appendChild(buttonEl1);
    divEl2.appendChild(buttonEl2);

    sectionEl.appendChild(h2El);
    sectionEl.appendChild(divEl1);
    sectionEl.appendChild(divEl2);

    wrapperEl.appendChild(sectionEl);

    // Adds click event listeners to the "go back" and "clear scores" buttons
    buttonEl1.addEventListener("click", homePageGen);
    buttonEl2.addEventListener("click", clearScores);
    
};

// Logic for saving scores to local storage
var saveScores = function() {

    // Sorts scores before saving
    sortScores();

    // stringifies the scores array and sets it a key of "scores" in local storage
    localStorage.setItem("scores", JSON.stringify(scores));

};

// Logic for loading saved scores from local storage into the program
var loadScores = function() {

    // Gets the item linked to key "scores" in local storage
    var savedScores = localStorage.getItem("scores");

    // If nothing is found, return
    if (!savedScores) {
        return false;
    }

    // Otherwise, parse the contents back into an array from a string
    savedScores = JSON.parse(savedScores);

    // Then, iterate through the array and add each element back into the "scores" array for access by the program
    for (var i = 0; i < savedScores.length; i++) {
        scores.push(savedScores[i]);
    }

    // Finally sort the scores now in the array
    sortScores();

};

// Logic for clearing the saved high scores
var clearScores = function() {

    // Empties the scores array of saved scores
    scores = [];

    // Sets the "scores" key in local storage equal to the now empty array
    localStorage.setItem("scores", scores);

    // If on the high scores page, remove all elements before regenerating them to reload the scores
    if (document.getElementById("scoreScreen")) {
        var scoreScreen = document.getElementById("scoreScreen");
        scoreScreen.remove();
    }
    
    // Reloads scores by generating the high scores page again
    highScorePage();
};

// Logic for sorting high scores
var sortScores = function() {

    // arrow function which compares the userScore values of the objects in the scores array, and sorts from highest to lowest as needed
    scores.sort((a, b) => b.userScore - a.userScore);
}

// Loads scores from local storage each time the webpage is opened
loadScores();

// Adds initial event listeners to the start quiz button, as well as the view high scores link
startQuizEl.addEventListener("click", startQuiz);
highScoreEl.addEventListener("click", highScorePage);

/* 
    TO DO:
    - Upload all files
    - add media queries?
*/
