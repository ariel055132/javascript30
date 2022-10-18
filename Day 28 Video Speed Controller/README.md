# Main Task
* 製作控制影片播放速度的bar，並藉此來控制播放速度

# 如何實作
## Step 1: 製作控制影片播放速度的bar
1. 選取與bar有關的元素，並添加**滑鼠移動**(mousemove)時的監聽事件(addEventListener)
```javascript
// 控制影片播放速度bar
const speed = document.querySelector('.speed');
// 展示bar裡的文字
const bar = document.querySelector('.speed-bar');
// 新增監聽事件
function handleMove(event){
	console.log(event);
}
speed.addEventListener('mousemove', handleMove);
```
* 透過mousemove知道位置
1. event.pageY：目前滑鼠在Y軸的位置
2. this.offsetTop：速度bar(元素)在上方的位置
3. this.offsetHeight：速度bar(元素)的高度

## Step 2: 計算播放速度的值，並更新於bar裡
```javascript
/** 滑鼠移動事件 **/
function handleMove (e) {
  // 取得觸發點位置（滑鼠位於整頁頂端的Y軸定位-speed框到整頁頂端的距離）
  const y = e.pageY - this.offsetTop;
  // 設定百分比(y / speed框的高度)
  const percent = y / this.offsetHeight;
  const min = 0.4; // 最慢速度：0.4倍速
  const max = 4;  // 最快速度：4倍速
  // 用Math.round來計算取得四捨五入的百分比值
  const height = Math.round(percent * 100) + '%';
  // 取得播放速率
  const playbackRate = percent * (max - min) + min;
  // 調整speed-bar的樣式高度
  bar.style.height = height;
  // 用toFixed(2)來設定最多取得小數點後兩位，顯示於speed-bar上
  bar.textContent = playbackRate.toFixed(2) + 'x';
```

## Step 3: 套用Step 2的值到播放速度
* 選取與video相關的元素，並利用playbackRate來設定播放速度
```javascript
const video = document.querySelector('.flex');
// speed of video
video.playbackRate = playbackRate;
```