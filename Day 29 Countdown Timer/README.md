# Main Task
* 製作一個倒數計時器

# 實作步驟
## Step 1: 取得頁面元素
```javascript
const buttons = document.querySelectorAll('button'); // 獲取所有按鈕，tag可以不用加.
const timerDisplay = document.querySelector('.display__time-left'); // 倒數時間
const endTime = document.querySelector('.display__end-time'); // 結束時間
```

## Step 2: 設定計時器
### 設定顯示倒數時間和結束時間
* 主要是測試出要怎麼才能夠在頁面裡顯示時間 --> timerDisplay.textContent
* 當minutes小於10的時候，補0
```javascript
// 倒數時間
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

// 結束時間
function displayEndTime(timestamp) {
    let end = new Date(timestamp);
    let hour = end.getHours();
    // adjust the hour 
    if (hour > 12) {
        hour -= 12;
    }
    let minutes = end.getMinutes();
    // padding with 0 if minutes < 10
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    endTime.textContent = `Be back at ${hour}:${minutes}`;
}
```

### 設計計時器
* 使用Date物件來取得目前的時間，並把它以timestamp來傳給結束時間，進行計算
* 使用clearInterval來避免多個計時器會同時啟動
```javascript
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
```

## Step 3: 開始計時，並進行倒數
* 為每個按鈕加上監聽('click')的時間，用來啟動計時的功能
```javascript
function startTimer() {
    const seconds = parseInt(this.dataset.time);
    //console.log(seconds);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
```

## Step 4: 自訂時間倒數
* 監聽自訂倒數時間的欄位，如果按下enter的話，就把欄位的值送進timer，並清空欄位
```javascript
document.customForm.addEventListener('submit', function(event) {
    // prevent refresh the value after reload
    event.preventDefault();
    const mins = this.minutes.value;
    // convert minutes to seconds
    timer(mins * 60);
    this.reset();
})
```