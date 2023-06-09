var timerEl = document.querySelector('#timer');
var timerContainerEl = document.querySelector('#timer-container')
var body = document.body;
var startBtnEl = document.querySelector('#start-btn')
var gameTitle = document.querySelector('#start-screen h2')
var quizScreen = document.querySelector('#quiz-wrap')
var startScreen = document.querySelector('#start-screen')
var time = 60;
var timer;


// When the user clicks the start button, then I need the start button to disappear and the timer to appear

function hideStartScreen(){
    startScreen.classList.remove('flex')
    startScreen.classList.add('hide');
    startBtnEl.classList.remove('flex');
    startBtnEl.classList.add('hide');
    gameTitle.classList.remove('flex');
    gameTitle.classList.add('hide');
}

function startGame() {
    hideStartScreen();
    timerContainerEl.classList.remove('hide');
    quizScreen.classList.add('flex');
    timer = setInterval(countDown, 1000);
    countDown();

}

function countDown() {
    time--;
    timerEl.innerText = time;

    if (time <= 0) {
        clearInterval(timer);
        // gameOver();
    }
}

startBtnEl.addEventListener('click', startGame);


