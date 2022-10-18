const buttons = document.querySelectorAll('button');
// how much time left
const timerDisplay = document.querySelector('.display__time-left');
// when do the current timer ends
const endTime = document.querySelector('.display__end-time'); 
let countdown;


function timer(seconds) {
    //console.log(seconds);
    clearInterval(countdown);

    const now = Date.now();
    const timeStamp = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(timeStamp);

    countdown = setInterval( () => {
        const secondsLeft = Math.round((timeStamp - Date.now()) / 1000) ;
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainSeconds = seconds % 60;
    // padding with 0 if remain seconds < 10
    if (remainSeconds < 10) {
        remainSeconds = '0' + remainSeconds;
    }
    let result = `${minutes}:${remainSeconds}`
    timerDisplay.textContent = result;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `${hour}:${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    //console.log(seconds);
    timer(seconds);
}

console.log(buttons);
buttons.forEach(button => button.addEventListener('click', startTimer));