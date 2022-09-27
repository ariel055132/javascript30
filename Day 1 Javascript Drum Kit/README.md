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

# Javascript remarks
## 鍵盤監聽
1. 由KeyboardEvent來負責，監聽活動分為3種（keydown, keypress, keyup)。
   * keydown：當**任何一個**按鍵被按下時，就會觸發keydown的事件
   * keypress： 