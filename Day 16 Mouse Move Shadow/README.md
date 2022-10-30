# Main Task
* 實作滑鼠在圖片的四周移動，並且會產生不同的效果

# 如何實作
## Step 1：選取頁面元素和基本偏移量，建立監聽事件
```javascript
const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 100;
function shadow(e){
	console.log(e); // 看一下browser回傳什麼
  }
hero.addEventListener('mousemove', shadow);
```

## Step 2：建立觸發條件和相關事情
```javascript
const {offsetWidth: width, offsetHeight: height} = hero;
let {offsetX: x, offsetY: y} = event;

console.log(this, event.target);
if (this !== event.target) {
    x = x + event.target.offsetLeft;
    y = y + event.target.offsetTop;
}

const xWalk = Math.round((x / width * walk) - (walk / 2));
const yWalk = Math.round((y / height * walk) - (walk / 2));
console.log(xWalk, yWalk);

text.style.textShadow = 
    `${xWalk}px ${yWalk}px 0 rgba(255, 0, 255, 0.7),
     ${xWalk * -1}px ${yWalk} 0 rgba(0, 255, 255, 0.7),
     ${yWalk}px ${xWalk - 1} 0 rgba(0, 255, 0, 0.7),
     ${yWalk * -1}px ${xWalk} 0 rgba(0, 0, 255, 0.7)`;
}
hero.addEventListener('mousemove', shadow);
```
* 使用offsetX和offsetY來計算滑鼠移動的位置
* 使用textShadow來處理動畫