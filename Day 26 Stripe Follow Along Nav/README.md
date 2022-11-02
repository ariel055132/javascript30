# Main Task
* 實作當滑鼠在NAV移動的時候，會展開相關內容的效果

# 如何實作
1. 取得相關的元素(tag)，建立相關的事件框架
2. 撰寫滑鼠移入(mouseenter)到相關選單時的效果
3. 撰寫滑鼠移出(mouseleave)到相關選單時的效果

## Step 1：取得相關的元素和建立相關的事件框架
```javascript
const triggers = document.querySelectorAll('.cool > li');
const background  = document.querySelector('.dropdownBackground');
const nav  = document.querySelector('.top');

function handleEnter() {
}
function handleLeave() {    
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
```
## Step 2：撰寫滑鼠移入事件
* 從作者寫的```<nav class="top">```指的是整個nav div的項目
* 從作者寫的```<div class="dropdownBackground">```指的是包含箭頭的對話視窗
* 從作者寫的```<ul class="cool">```指的是全部li指向個別的資料
* 作者將動畫效果寫在trigger-enter，trigger-enter active和dropdownBackground open，只要把裡面的code寫成相反，資料就會顯示出來
```CSS
.trigger-enter .dropdown {
    display: block;
}
.trigger-enter-active .dropdown {
    opacity: 1;
}
.dropdownBackground.open {
    opacity: 1;
}
```
* 上面的寫法就已經把移入的動畫效果寫出來，但是當使用者快速移動時，可能會產生tag重複出現的bug，使用setTimeout(只會出現一次)trigger-enter進行處理，相關程式碼入下：
```javascript
function handleEnter(){
    // console.log('Enter!');
    this.classList.add('trigger-enter');
    setTimeout(()=>this.classList.add('trigger-enter-active'), 150);
    background.classList.add('open');
```
* 不過這樣會發現箭頭對話框的位置都在左上角出現和跑版的問題，需將nav移動到正確位置。
```javascript
function handleEnter(){
    // console.log('Enter!');
    this.classList.add('trigger-enter');
    setTimeout(()=>this.classList.add('trigger-enter-active'), 150);
    background.classList.add('open');

    const dropdown = this.querySelector('.dropdown');
    const dropdownCoords = dropdown.getBoundingClientRect();
    const navCoords = nav.getBoundingClientRect();

    const coords = {
      height : dropdownCoords.height,
      width : dropdownCoords.width,
      top : dropdownCoords.top,
      left : dropdownCoords.left,
    }

    background.style.setProperty('width', `${coords.width}px`);
    background.style.setProperty('height', `${coords.height}px`);
    background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
  }
```

## Step 3：撰寫滑鼠移出事件
* 移除掉移入所加的class/properties即可
```javascript
function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
}
```

# Remarks
* 產生的動畫效果主要是透過以下的Code來實現
```javascript
.dropdownBackground {
  width: 100px;
  height: 100px;
  position: absolute;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 50px 100px rgba(50, 50, 93, .1), 0 15px 35px rgba(50, 50, 93, .15), 0 5px 15px rgba(0, 0, 0, .1);
  transition: all 0.3s, opacity 0.1s, transform 0.2s;
  transform-origin: 50% 0;
  display: flex;
  justify-content: center;
  opacity: 0;
}

.dropdownBackground.open {
  opacity: 1;
}
```