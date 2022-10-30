# Main Task
* 使用SpeechSynthesisUtterance，啟動browser的speechSynthesis的API，實作電腦說話的功能
* 在同時實作說話功能，也可以設定講話速度(rate)和音頻(pitch)

# 如何實作
## Step 1: 取得頁面元素，設定SpeechSynthesisUtterance
```javascript
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
// 將SpeechSynthesisUtterance的值設定為html的text area的值
msg.text = document.querySelector('[name="text"]').value
```

## Step 2:設定語言播放的選擇清單
```javascript
function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    // filter english only
    .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value=${voice.name}>${voice.name} (${voice.lang})</option>`)
    // join: combine all the values in array and delete the comma 
    .join('');
}
// update the options in voice dropdown menu
speechSynthesis.addEventListener('voiceschanged', populateVoices);
```

## Step 3:播放設定
1. 設定播放(play)和暫停(pause)
2. 設定講話速度(rate)和音頻(pitch)
3. 設定發音的方式

```javascript
// exchange between play and pause
function toggle(starOver = true) {
  speechSynthesis.cancel();
  if (starOver) {
    speechSynthesis.speak(msg);
  }
}
// set the way to pronounce
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}
// set the speed and pitch
function setOption() {
  msg[this.name] = this.value;
  toggle();
}

voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle); // play
stopButton.addEventListener('click', () => toggle(false)); // pause 
```