# Main Task
1. 按下按鈕，播放出相關的聲音，並產生出特效（特效已寫在CSS的playing當中）。
2. 按下其他按鈕，關閉當前案件之特效與聲音，並把特效放在新按之按鈕。

# 如何實作
1. 使用keydown listener來監聽keyboard的動作。
    * 使用keydown的原因是**按下**按鈕。
    * 相關code在window.addEventListener('keydown', playSound);
2. 建立function playSound來進行audio的播放和處理
   * 利用傳入的event.keyCode來取得相應的audio和按鈕的div標籤。（P.S. MDN文件已經指出keyCode在未來不會受到support，可能要新的code去進行相關的動作）
   * 判斷event.keyCode是否有對應的audio標籤。有的話，請看下一點；若無則推出。
   * 對目前被按下之按鈕加上playing的tag，產生對應的特效。
   * 播放對應之audio file。
3. 新增特效的listener
   * 若元件觸發特效並結束(transitionend)，呼叫removeTransition來移除特效
4. 建立function removeTransition來移除playing
   * 判斷傳入之propertyName是否為transform，若否則推出。
   * 若為transform，刪除playing這個tag。