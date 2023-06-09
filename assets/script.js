var timerEl = document.querySelector('#timer');
var body = document.body;
var startBtnEl = document.querySelector('#start-btn')
var gameTitle = document.querySelector('#start-screen h2')
var quizScreen = document.querySelector('#quiz-wrap')
var startScreen = document.querySelector('#start-screen')
var questionText = document.querySelector('#question-display');
var choicesEl = document.querySelector('.choices');
var messageEl = document.querySelector('#message');
var endScreen = document.querySelector('#end-screen')
var initialsForm = document.querySelector('#initialsInput')
var initialsInput = document.querySelector('#initials')
var currentQuestionIndex = 0;
var time = 60;
var timer;

var savedScores = [];


// When the user clicks the start button, then I need the start button to disappear and the timer to appear

function startGame() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    timerEl.classList.remove('hide');
    quizScreen.classList.add('flex');
    timer = setInterval(countDown, 1000);
    countDown();
    displayQuestion();
}

function countDown() {
    time--;
    timerEl.innerText = time;

    if (time <= 0) {
        clearInterval(timer);
        // gameOver();
    }
}

function playGame(){
    if(currentQuestionIndex < 5){
    questionText.textContent = questionData[currentQuestionIndex].question;
    choicesEl.innerHTML = '';
    for(var i = 0; i<4; i++){
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
        messageEl.textContent = 'Correct!'
    }else{
        messageEl.textContent = 'Wrong'
        time-=10
    }
    setTimeout(function(){
        messageEl.textContent = ''
    }, 1000)
    currentQuestionIndex++;
    playGame();
}

function endScreenShow(){
    quizScreen.classList.add('hide');
    endScreen.classList.remove('hide');
}

function saveScore (event) {
    event.preventDefault();

    const score = time;
    const initials = initialsInput.value;

    const entry = {
        score,
        initials
    }

    savedScores.push(entry)

    localStorage.setItem("savedScores", JSON.stringify(entry))

}

startBtnEl.addEventListener('click', startGame);
initialsForm.addEventListener("submit", saveScore)

