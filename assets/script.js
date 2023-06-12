var timerEl = document.querySelector('#timer');
var body = document.body;
var startBtnEl = document.querySelector('#start-btn');
var gameTitle = document.querySelector('#start-screen h2');
var quizScreen = document.querySelector('#quiz-wrap');
var startScreen = document.querySelector('#start-screen');
var questionText = document.querySelector('#question-display');
var choicesEl = document.querySelector('.choices');
var messageEl = document.querySelector('#feedback-message');
var endScreen = document.querySelector('#end-screen')
var resultText = document.querySelector('#end-screen h2');
var endingInstructions = document.querySelector('#end-instructions')
var initialsForm = document.querySelector('#initialsInput');
var initialsInput = document.querySelector('#initials');
var scoreScreen = document.querySelector('#score-screen');
var currentQuestionIndex = 0;
var time = 60;
var timer;
var totalCorrect = 0;


function startGame() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    timerEl.classList.remove('hide');
    quizScreen.classList.add('flex');
    timer = setInterval(countDown, 1000);
    countDown();
    playGame();
}

function countDown() {
    time--;
    timerEl.innerText = time;

    if (time <= 0) {
        clearInterval(timer);
        endScreenShow();
    }
}

function playGame(){
    if(currentQuestionIndex < questionData.length){
    questionText.textContent = questionData[currentQuestionIndex].question;
    choicesEl.innerHTML = '';
    for(var i = 0; i<questionData[currentQuestionIndex].choices.length; i++){
        var newBtn = document.createElement('button');
        newBtn.textContent = questionData[currentQuestionIndex].choices[i];
        newBtn.addEventListener('click', nextQuestion)
        choicesEl.append(newBtn);
    }
}else{
    endScreenShow()

}
}

function nextQuestion(event){
    var userChoice = event.target.textContent;
    var correctChoice = questionData[currentQuestionIndex].answer;
    if (userChoice === correctChoice){
        totalCorrect++;
        messageEl.textContent = 'Correct!';
    }else{
        messageEl.textContent = 'Wrong';
        time-=10;
    }
    setTimeout(function(){
        messageEl.textContent = ''
    }, 2000)
    currentQuestionIndex++;
    playGame();
}


function endScreenShow(){
   
    resultText.textContent = 'Your score is ' + totalCorrect
    quizScreen.classList.add('hide');
    initialsForm.classList.remove('hide');
    endScreen.classList.remove('hide');
    timerEl.classList.add('hide');
    clearInterval(timer);
}

function getSavedScores (){
    var rawData = localStorage.getItem('savedScores');
    var parsed = JSON.parse(rawData);
    return parsed;
}

function saveAllScores(array){
    var jsonVal  = JSON.stringify(array);
    localStorage.setItem('savedScores', jsonVal);
}

function saveCurrentScore (event) {
    event.preventDefault();
    var savedScores = getSavedScores();

    var entry = {
        name: initialsInput.value,
        score: totalCorrect
    }

    savedScores.push(entry)
    localStorage.setItem("savedScores", JSON.stringify(savedScores))
    console.log(savedScores)
    displayScore();

}

function displayScore(){
    endScreen.classList.add('hide')
    scoreScreen.classList.remove('hide');
    var lastScore = document.createElement('h3');
    var parsed = JSON.parse(localStorage.getItem("savedScores"));
    console.log(parsed);
    lastScore.textContent = 'Name: ' + parsed[0].name + ' Score: ' + parsed[0].score;
    scoreScreen.append(lastScore);
}
startBtnEl.addEventListener('click', startGame);
initialsForm.addEventListener("submit", saveScore);

