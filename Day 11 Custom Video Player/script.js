// Get the elements in html
// <div class="player"> and the contents below
const player = document.querySelector('.player'); 
// <video class="player__video viewer" src="652333414.mp4"></video>
const video = player.querySelector('.viewer'); 
// <div class="progress">
const progress = player.querySelector('.progress'); 
// <div class="progress__filled">
const progressBar = player.querySelector('.progress__filled'); 
// <button class="player__button toggle" title="Toggle Play"></button> toggle button
const toggle = player.querySelector('.toggle'); 
//const skipButtons = player.querySelectorAll('.player__button'); // 3 buttons will be selected, while one of them is useless
// 2 useful buttons will be selected
const skipButtons = player.querySelectorAll('[data-skip]'); 
// all sliders (volume and playbackRate) will be selected
const ranges = player.querySelectorAll('.player__slider'); 

// build the corresponding functions

// control the video player (play, pause)
function togglePlay() {
    /* Original Method
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    */
    // new method to toggle play and pause 
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

// update the play and pause buttons
function updateButtons() {
    //console.log("Update the buttons");  
    const icon = this.paused ? '►' : '❚ ❚'; // this refers to video
    //console.log(icon);
    toggle.textContent = icon;
}

// skip functions
function skip() {
    // this.dataset: show which skip button is pressed
    console.log(this.dataset); // DOMStringMap {skip: '25' / skip: '-10'}
    console.log(this.dataset.skip, typeof this.dataset.skip); // show 25 and -10 respectively, data-type: string
    video.currentTime += parseInt(this.dataset.skip); // parseFloat also ok in this case
}

// handle the video playing progress
// <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
// <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
function handleRangeUpdate() {
    //console.log(this.name); // volume / playbackRate
    //console.log(this.value);  // this refers to ranges
    video[this.name] = this.value;
}

// real time update of progress bar
// update the flex-basis percentage in .progress__filled in CSS to update the progress
function handleProgress() {
    // get the curren progress of the video, divide it by the video duration to calculate the percentage
    const percent = (video.currentTime / video.duration) * 100;
    //console.log(percent);
    // update the flex-basis percentage in CSS 
    progressBar.style.flexBasis = `${percent}%`;
}

// scrub the progress bar
function scrub() {

}

// hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButtons);
video.addEventListener('pause', updateButtons);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

//skipButtons.addEventListener('click', skip);

// use forEach to initialize skip buttons because there are two buttons in skipButtons
skipButtons.forEach(button => button.addEventListener('click', skip)); 

// change event is fired for <input>, <select>, <textarea> elements when the user modifies the element's value
// I test with click instead of change, it is also ok
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
// mousemove event is fired when the cursor is moving in the sliders.
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));