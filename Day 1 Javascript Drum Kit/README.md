# Main Task
1. 按下按鈕，播放出相關的聲音，並產生出特效（特效已寫在CSS的playing當中）。
2. 按下其他按鈕，關閉當前案件之特效與聲音，並把特效放在新按之按鈕。

# 如何實作
## 使用keydown listener來監聽keyboard的動作。
   1. 使用keydown的原因是**按下**按鈕。
   2. 相關code在window.addEventListener('keydown', playSound);
## 建立function playSound來進行audio的播放和處理
   1. 利用傳入的event.keyCode來取得相應的audio和按鈕的div標籤。（P.S. MDN文件已經指出keyCode在未來不會受到support，可能要新的code去進行相關的動作）
   2. 判斷event.keyCode是否有對應的audio標籤。若無則推出。有的話，請看下一點。
   3. 對目前被按下之按鈕加上playing的tag，產生對應的特效。
   4. 讓對應之audio file的播放時間為0（只會從頭到尾進行播放）。
   5. 播放對應之audio file。
## 新增特效的listener
   1. 偵測所有包含className='key'的元件。
   2. 若元件觸發特效並結束(transitionend)，呼叫removeTransition來移除特效
## 建立function removeTransition來移除playing
   1. 判斷傳入之propertyName是否為transform，若否則推出。
   2. 若為transform，刪除playing這個tag。

# Remarks
## 鍵盤監聽
* 由KeyboardEvent來負責，監聽活動分為3種（keydown, keypress, keyup)。
   1. keydown：當**任何一個**按鍵被按下時，就會觸發keydown事件
   2. keypress：當**一個產生字元**（例如：數字，英文按鍵）的按鍵被按下時，才會觸發keypress事件（這個event已被標籤為以後不會支援的）
   3. keyup：當**鬆開**按鍵的時候，就會觸發keyup事件
## template literals 模板文字
* 利用反引號（`）來組合字串，加上${}來進行變數的編輯
## audio operation
* HTML會使用audio來進行語音的embed指定的語音檔案
* 可透過javascript來進行播放，暫停，停止等操作
   1. element.play: 播放
   2. element.pause: 暫停
   3. element.stop: 停止
   4. element.currentTime: 指定播放秒數，若將播放的時間軸設定為0，代表再播放為從頭播放
## element.classList
* 以array形式，回傳element的class值。若不存在的className會被忽略。
* add()：新增多個className
* remove()：移除多個className
## Array.from
* 這個function的目的是：將一個object或string轉為array。
* 有看到其他人的寫法是這樣，原因是若無轉型為Array使用nodeList來forEach可能會導致某些瀏覽器版本錯誤。
* 我自己是沒有寫成這樣子，但是還是能跑，不知道為什麼。
* Reference: https://guahsu.io/2017/05/JavaScript30-01-Java-Script-Drum-Kit/