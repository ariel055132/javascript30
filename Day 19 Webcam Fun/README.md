# Main Task
* 使用Javascript的原生功能來驅動電腦的webcam紀錄影像資料，並將結果輸出到canvas，進行拍照和處理。

# 如何實作
1. 建立一個localhost server。
2. 使用webcam來紀錄影像資料
3. 將上一步所紀錄的影像資料放到Canvas上
4. 製作拍照功能

## Step 1：建立localhost server
* 作者其實已經寫好建立localhost server所需要的檔案(package.json)。先安裝nodeJS，然後利用npm來安裝即可。
* 需要使用localhost的原因是作者教導的getUserMedia()需要在安全連線下使用
```javascript
npm install
npm run start
```
* 一些配置好的指令
    1. video：原始鏡頭的位置
    2. canvas：將鏡頭擷取的內容在畫布上展示
    3. strip：放置產生圖檔的容器
    4. snap：點擊拍攝時產生的音效
* 如何使用webcam
    1. browser透過navigator.mediaDevices.getUserMedia()來取得webcam的權限。使用者需點選允許才能進行拍照
    2. browser利用window.URL.createObjectURL(localMediaStream)來取得現在拍攝的內容

## Step 2：將擷取的資料放到畫布
* 利用以下的步驟來進行截取和放置。
1. setInterval(function(){}, minSecs):設定運行頻率。單位為mini secs。
2. ctx.drawImage(img, x, y, width, height):能將畫面擷取下來。
3. ctx.getImageData(x, y, width, height):反回一個ImageData對象，用來描述canvas區域內的像素數據。
4. ctx.putImageData(img, x, y):將數據從已有的ImageData對象繪製到圖像的方法。
5. 綁定事件canplay:當攝影頭準備使用時觸發。

## Step 3：拍照功能
1. 按下拍照鍵後產生聲音。
2. 截取畫面