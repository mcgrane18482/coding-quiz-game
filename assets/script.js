var timerEl = document.querySelector('#timer');
var count = 10;

var timer= setInterval(countDown, 1000)

function countDown() {
    count--;
    timerEl.innerText = count;

    if(count===0){
        clearInterval(timer);
    }
}