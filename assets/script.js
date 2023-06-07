var timerEl = document.querySelector('#timer');
var count = 60;
var body = document.body;
var startBtnEl = document.querySelector('#start-btn')
var quizbody = document.querySelector('#quiz-wrap')

timerEl.classList.add('hide');

function startGame() {
    startBtnEl.classList.add('hide');
    timerEl.classList.remove('hide');
    var timer = setInterval(countDown, 1000)


    function countDown() {
        count--;
        timerEl.innerText = count;

        if (count === 0) {
            clearInterval(timer);
        }
    }

}

startBtnEl.addEventListener('click', startGame);


