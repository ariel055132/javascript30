# Main Task
* 使用HTML5的Canvas來製作一個畫布
* 使用者可利用滑鼠來畫彩色，粗細不一的線條

# 如何實作
1. 獲取HTML裏的<canvas>元素(畫布)，並設定畫布的width和height，以建立一個畫布。
2. 設定一個變數(程式裡為ctx)，並以.getContext()獲取畫布的操作元素
    * strokeStyle：線條顏色
    * fillStyle：填充顏色
    * lineWidth：線條粗細
    * lineJoin：線條轉角(round圓交,bevel斜交,miter斜接)
    * lineCap：線條末端形式(round圓, butt平, square方)
3. 撰寫繪圖程式(draw)
    * 設定一個變數，判斷目前是否執行繪畫(isDrawing)
    * 設定兩個變數，用來儲存繪畫路徑的起點，終點(lastX, lastY)
    * 監聽滑鼠的事情，不同類型的事情將把isDrawing設定為不同值
        1. mousemove：在畫布上滑動，就會觸發 --> isDrawing = true
        2. mouseout：mouse cursor已經超出畫布的範圍 --> isDrawing = false
        3. mousedown：mouse的按鈕被按下時會觸發 --> isDrawing = true
        4. mouseup:mouse的按鈕release --> isDrawing = false
4. 把線條顏色漸變的效果加上去 (不斷更改hsl的h值)
5. 把線條粗細漸變的效果加上去 (設定一個範圍，當超出範圍時，改變線條的粗細)

# 語法
## canvas的語法
1. beginPath：新建一個繪畫路徑
2. moveTo：設定這次繪畫路徑的起點座標
3. lineTo：連結路徑終點到指定的座標
4. stroke：繪製路徑