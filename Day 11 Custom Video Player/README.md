# Main Task
* 製作一個客製化的播放器

# 如何實作
1. 取得頁面的元素
2. 設定播放/暫停控制功能
3. 在不同狀態下，改變播放/暫停按鈕的樣式
4. 控制音量和播放速度
5. 控制跳過(skip)的時間
6. 處理影片進度條的顯示和拖拉效果

## Step 1：取得頁面的元素
```javascript
const player = document.querySelector('.player'); 
const video = player.querySelector('.viewer'); 
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle'); 
const skipButtons = player.querySelectorAll('[data-skip]'); 
const ranges = player.querySelectorAll('.player__slider');
```

## Step 2：設定播放/暫停控制功能
* 對video和toggle addEventListener來進行控制，並在togglePlay()中對影片產生播放
* 作者使用video[method]的寫法，來直接操作video的屬性
* 至於如何控制播放/暫停則是利用影片目前是否已暫停(video.paused)來進行判斷
```javascript
function togglePlay(){
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
```

## Step 3：改變播放/暫停按鈕的樣式
* 對影片播放或暫停市更改相關按鍵樣式即可，利用toggle.textContent來更改內容
```javascript
function updateButton(){
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
```

## Step 4：控制音量
* 作者其實已經寫好音量那邊的HTML程式碼，只要進行listen相關的值就可以了
* ranges透過querySelectorAll來取得， 所以可以用forEach來把所有range加上addEventListener， 也因為range是拖曳條，除了click外，也必須要監聽mousemove， 而name的命名volume與playbackRate也就是video本身的屬性，可直接使用
```javascript
function handleRangeUpadte() {
  video[this.name] = this.value;
}
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpadte);
  range.addEventListener('mousemove', handleRangeUpadte);
})
```

## Step 5：控制跳過(skip)的時間
* 利用作者寫好的data-xxx的屬性來進行時間的加減即可
* video.currentTime：得知影片目前的播放時間
```javascript
function skip() {
    console.log(this.dataset); // DOMStringMap {skip: '25' / skip: '-10'}
    console.log(this.dataset.skip, typeof this.dataset.skip); // show 25 and -10 respectively, data-type: string
    video.currentTime += parseInt(this.dataset.skip); // parseFloat also ok in this case
}
```

## Step 6：處理影片進度條的顯示和拖拉效果
* 利用video.currentTime取得影片當前值，除以影片的長度(video.duration)來得到影片的播放程度，並以此設定進度條的相對位置。
* 利用CSS來設定相關位置
```javascript
function handleProgress(){
	const percent = (video.currentTime / video.duration) *100;
	progressBar.style.flexBasis = `${percent}%`;
}
video.addEventListener('timeupdate', handleProgress);
```
* 拖拉效果則是利用offsetX來取得div的X值，並除以div的全長來得到percentage，乘上影片時長即可得到當前的播放時間