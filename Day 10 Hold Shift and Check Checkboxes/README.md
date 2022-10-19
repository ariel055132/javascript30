# Main Task
* 實現點擊Checkbox之後，點擊shift鍵後可一次過選取多個checkbox的功能

# 如何實作
## Step 1: 選取checkbox，加入eventlistener('click')，定義click後要實作的方法
```javascript
// 用querySelectorAll是因為有多個checkbox
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
// 使用for each為每一個checkbox添加方法，實作方法的名字叫handleEvent
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleEvent));
```

## Step 2: 實作點擊shift鍵後可一次過選取多個checkbox的功能
* 點擊checkbox後，按下shift（利用shiftKey來判斷是否有按下shift）
* 當兩者皆啟動後，再點擊另外一個checkbox才會出現效果
* solution：先定義最後一個點擊的是lastChecked，而這邊用inBetween參數當做在兩個checkbox 之間的內容，若在兩個之間為true, 其他則會false。所以最後只要判斷inBetween為true時打勾即可。
```javascript
   let lastChecked;

    function handleEvent(event) {
        let inBetween = false;
        if (event.shiftKey && this.checked) {
            checkboxes.forEach(checkbox => {
                console.log(checkbox);
                if (checkbox === this || checkbox === lastChecked) {
                    inBetween = !inBetween;
                    console.log("starting to check in between");
                }

                if (inBetween) {
                    checkbox.checked = true;
                }
            });
        }
    }
```