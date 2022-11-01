# Main Task
* 透過作者的例子，了解DOM的四種機制：Event Capture（事件捕捉），Event Bubbling（事情冒泡），Propagation，Once（單次執行）。

# 如何實作
## Event Capture & Event Bubbling
* 建立三層div進行測試，包覆順序為：紫色->淺橘色->深橘色，程式碼如下
```HTML
<div class="one"> 
  <div class="two">
    <div class="three">
    </div>
  </div>
</div>
```
```javascript
// get all the divs
const divs = document.querySelectorAll('div'); 
function logText(e) {
  // print the class name of current div
  console.log(this.classList.value);
}
divs.forEach(div => div.addEventListener('click', logText));
```
* 對畫面中間點擊，console window會印出：three two one（從click的位置最深處向外連動所有div的click事件 --> Event Bubbling）
* Capture則是用作控制事情的捕捉順序，若將capture設定為true，則只會印出one。

## stopPropagation()
* 將原本的Event bubbling停止
```javascript
function logText(e) {
  // print the class name of current div
  console.log(this.classList.value);
  e.stopPropagation(); // stop bubbling
}
```

## Once
* 這個事件監聽只執行一次，執行完後即會removeEventListener。因此當once : true時，只會執行一次監聽事件。