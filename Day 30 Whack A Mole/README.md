# Main Task
* 實作打地鼠遊戲
* 作者寫好的網站會有六個洞，隨機出現地鼠，點擊地鼠即可獲得一分，遊戲時間為10秒

# 如何實作
## 主要流程
1. 設定地鼠出現的時間和位置
2. 讓地鼠出現
3. 點擊地鼠後，得分

## Step 1：設定地鼠出現的時間和位置
* 使用Math.random來進行隨機產生。
* 使用Math.round來對結果進行四捨五入的取捨。
* 利用array的index進行hole的存取可避免取到所有hole。
* randomHole則新增一個variable(lastHole)，檢查是否重複出現，若相同則重新執行randomHole。
```javascript
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    console.log(hole);
    if (hole === lastHole) {
      console.log('Ah nah thats the same one bud');
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}
```

## Step 2：讓地鼠出現
* 使用Step 1的randomTime和randomHole來進行產生。
* 使用setTimeout()來讓地鼠可以一直出現，setInterval()則不會。
* timeUp用來判斷是次遊戲是否還在繼續，true為結束（不會再出現地鼠），false為進行中。
* 出現的樣式已寫在CSS中，如下：
```CSS
.mole {
  background:url('mole.svg') bottom center no-repeat;
  background-size:60%;
  position: absolute;
  top: 100%;
  width: 100%;
  height: 100%;
  transition:all 0.4s;
}
.hole.up .mole {
  top:0;
}
```
* 這樣子要讓地鼠出現，只要在加上('up')就可以了。
```javascript
let timeUp = false;

function peep(){
    const time = randomTime(20, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(()=>{
      hole.classList.remove('up');
      if (!timeUp) peep();
    }, time);
}
```

## Step 3：點擊地鼠，並獲得分數
* 利用score進行分數的計算
* event.isTrusted：若事件是由使用者產生的為true
```javascript
let score = 0;
function bonk(event){
    if(!event.isTrusted) return
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }
moles.forEach(mole => mole.addEventListener('click', bonk));
```