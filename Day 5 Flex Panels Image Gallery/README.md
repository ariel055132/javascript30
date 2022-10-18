# Main Task
* 利用flex和transition的效果來做出點擊後的效果

# 如何實作
## Step 1: 將圖片變成左右順序，並且等寬排列
* 需要這樣做的原因：網站一開始的圖片呈現是上到下排序，並非作者呈現的左右排序
1. 在panels新增display:flex的屬性來達到左右排序的效果
2. 在panel新增flex:1來達成等寬填滿的效果
```CSS
.panels{
	...
	display: flex;
}
.panel {
	...
	flex:1;
}
```

## Step 2: 處理字體問題
1. 將文字在不同情況進行水平和垂直置中
    * 水平置中：justify-content: center
    * 垂直置中：align-items: center
2. 將文字排成三等份排好。


## Step 4: 用javascript處理動畫
1. 選取.panel的元素
2. 在上一步選取的元素新增監聽器，點擊圖片後需放大圖片(toggleOpen)
3. 放大圖片後，若回傳的內容包含flex，呈現文字動畫(toggleActive)
```javascript
const panels = document.querySelectorAll('.panel');
function toggleOpen(){
	this.classList.toggle('open');
}

function toggleActive(e) {
      if (e.propertyName.includes('flex')){
        this.classList.toggle('open-active');
      }
    }
panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
```
