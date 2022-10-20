# Main Task
* 實作一個可以拖曳移動的水平捲軸。

# 如何實作
## Step 1: 取得頁面元素，設定相關初始變數
```javascript
const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;
```

## Step 2: 建立監聽事件框架
* 由於是拖曳移動，因此將會用到大量的mouse event。
1. mousedown：滑鼠按鍵按下（正在點擊）
2. mouseleave：滑鼠滑出browser（這樣的話，有沒有點擊/按下按鈕到無所謂了）
3. mouseup：滑鼠按鍵放開(release，代表沒有點擊)
4. mousemove：滑鼠在移動
```javascript
slider.addEventListener('mousedown', () => {

});
slider.addEventListener('mouseleave', () => {

});
slider.addEventListener('mouseup', () => {

});
slider.addEventListener('mousemove', () => {

});
```

## Step 3: 設定事件框架的內容
* 滑鼠按下（mousedown）時要做的事情
1. 紀錄目前為按下 
2. 紀錄按下是，cursor的X座標
3. 加上抓取效果（作者在CSS裡寫好的）
4. 設定目前捲軸左邊距離
```javascript
slider.addEventListener('mousedown', (event) => {
    // 1.
    isDown = true;
    // 3.
    slider.classList.add('active');
    // 2。
    startX = event.pageX - slider.offsetLeft;
    // 4.
    scrollLeft = slider.scrollLeft;
    //console.log(startX);
  });
```

* 滑鼠滑出範圍（mouseleave）和按鍵放開（mouseup）
1. 取消抓取效果
2. 紀錄目前狀態不為按下
```javascript
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});
```

* 滑鼠在移動（mousemove）
1. 檢測滑鼠是否已按下，若非按下，不用將當前狀態轉成按下；若按下，才進行下面的步驟
2. 設定避免觸發其他預設事件
3. 設定當前位置，移動距離
4. 設定捲軸的偏移量
```javascript
slider.addEventListener('mousemove', (event) => {
    if (!isDown) return; 
    event.preventDefault();
    const x = event.pageX - slider.offsetLeft;
    console.log({x, startX});
    const walk = x - startX;
    console.log(walk);
    slider.scrollLeft = scrollLeft - walk;
  });
```