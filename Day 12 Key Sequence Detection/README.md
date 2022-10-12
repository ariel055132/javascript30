# Main Task
* 模擬以前玩遊戲輸入的秘技。
* 當你直接在網站輸入相對應的密碼，網站會出現特效

# 如何實作
## 1. 設定密碼，保存輸入值，並監聽鍵盤的動作
```javascript
const secretCode = 'wesbos'; // 設定密碼
const pressed = []; // 用作儲存輸入值的容器(array)
window.addEventListener('keyup', (event) => { // 使用keyup來監聽鍵盤的動作
```

## 2. 監聽後的動作
* 觸發keyup的時候，讀取剛才點擊了什麼按鍵(event.key)，並將相關內容放進pressed。
* 使用splice()來控制pressed，pressed的長度不可以超過密碼的長度。
* 當超過時，替換掉pressed的第一個element。
* 利用join()和includes()判斷輸入內容是否和密碼一致。