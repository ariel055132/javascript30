# Main Task
* 使用browser內建的語言轉換API，來將你說的話列印在網頁上

# 如何實作
## Step 1: 架設local的server
1. 下載nodeJS
2. 直接使用作者提供的package.json檔案，在terminal輸入npm install，安裝live server套件
3. 輸入npm start，點擊localhost的網址，並打開html檔案，代表live server已啟動
4. 進入網站，同意授權使用麥克風

## Step 2: 處理語音識別
1. 建立語音識別的object
2. 對object進行設定
```javascript
// 使用哪一個語音轉換的API
// window.SpeechRecognition --> 除了firefox，其他browser用的語音轉換的API
// window.webkitSpeechRecognition --> Firefox用語音轉換API
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// 建立語音識別的object
const recognition = new SpeechRecognition();
// 控制語音辨識期間是否返回，若為true會一直返回，若SpeechRecognitionResult.isFinal為true時，即結束當前對話。
recognition.interimResults = true;

// (Optional)設定辨識語言
// recognition.lang = 'en-US'; --> 英文
// 繁體中文：'zh-tw'
```

## Step 3: 設定輸出區域
* 作者其實已經設定好輸出區域(p tag)，只要在每次有停頓的時候，新增新的p tag，並把內容新增在相關區域即可
* 新增監聽事件(result)
```javascript
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', event =>{
    // 講語音辨識結果以物件表示
    console.log(event);
});

recognition.start();
```
* 對著麥克風說話應該可以在console看到回傳的事件SpeechRecognitionEvent
* 轉換的內容在results[0][transcript]

## Step 4: 編輯回傳的事情
1. 取得監聽results回傳的內容，並講它從array排列成string
2. 檢測是否暫停說話(event.result[0].isFinal = true)
3. 若需重啟監聽事件，增加相關事件，並重新啟動
```javascript
recognition.addEventListener('result', e =>{
    const transcript = Array.from(e,results)
                        .map(result => result[0])
                        .map(result => result.transcript)
                        .join('');

    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
      }
  });

  recognition.addEventListener('end', recognition.start);
```