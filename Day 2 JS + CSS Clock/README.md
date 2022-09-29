# Main Task
* 最一開始的HTML檔案裏面有三個div標籤，對應時鐘裏的三個指針（hour-hand，minute-hand，second-hand）。
* 利用Javascript，動態更新這3個指針的狀態。

# 如何實作
## 獲取目前時間
  * 利用Javascript的Date Object來取得目前的時間。
  * getHours()來取得目前的hour。
  * getMinutes()來取得目前的minute。
  * getSeconds()來取得目前的seconds。
  * 但是這樣只會在網站首次開啟或更新才會調整時間，不會自動更新時間，無法實現second-hand一直轉動的效果。
  * 為了解決以上問題，需要使用setInterval。
  * setInterval(獲取時間funtion, 秒數) ：固定延遲了某段時間之後，才去執行對應的程式碼，然後「不斷循環」。 當然也會回傳一個獨立的 timer ID
## 讓每個指針根據目前時間，指到相應的位置
  * 基本上只會動到.hand的內容
  * 根據getHours()，getMinutes()，getSeconds()所得的數據，計算每個指針對應的角度，計算方式如下
  * let hourDegree = (hour / 12) * 360 + 90;
  * let minDegree = (min / 60) * 360 + 90;
  * let secondDegree = (second / 60) * 360 + 90;
  * 都加90是因為沒加90的話，去進行調試的時候，會明顯看到每個指針的位置都很奇怪
  * 在.hand裏新增transform-origin（調整元素的原始位置）和transform（元素如何進行調整）來進行角度的改變
## 需要在每一秒中，改變一次second-hand的狀態
  

# Reference
* https://kuro.tw/posts/2019/02/23/%E8%AB%87%E8%AB%87-JavaScript-%E7%9A%84-setTimeout-%E8%88%87-setInterval/ (講述了setTimeout和setInterval的不同)
* https://developer.mozilla.org/en-US/docs/Web/API/setTimeout (MDN：setTimeout的定義)