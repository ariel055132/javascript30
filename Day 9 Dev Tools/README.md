# Main Task
* 介紹如何在Chrome系列的Browser進行測試
* 如何打開Chrome的console開發工具--> F12
* 我自己使用edge來進行這次的作業，也是可以用的

# 如何實作
## DOM Break On (設置DOM的中斷點)
1. 打開Console開發工具
2. 點擊element按鈕，頁面將顯示網站的HTML內容
3. 選擇頁面的某個tag，例如：p，h1 之類
4. Right click -> Break on -> Attributes modifications
5. 這樣就可以為元素添加Breakpoint，當元素的屬性發生變化時，就會定位到對應的頁面代碼執行
* 其他觸發模式介紹如下：
  * 當子元素點發生變化時，選擇subtree modifications
  * 當元素被移除時，選擇node removal

## Console用法
### console.log()
* 最基本的用法，會將()內的內容印到console window

### console.log('%s', value)
* 利用%s和value，來指定顯示的參數
* %d：整數(int)
* %f：浮點數(float)
* %o：物件(object)
* %c：將文字顯示的方式指定為value帶入的CSS樣式

### console.warning()
* console window將把console warning內的文字標上警告圖示(以黃色的感嘆號顯示)

### console.error()
* console window將把console error內的文字標上錯誤圖示(以紅色的cross顯示)

### console.info()
* console window將把console info內的文字標上資訊圖示(以藍色的i顯示)

### console.assert(condition, message)
* 測試判斷(condition)是否為true，若為false，回傳對應的錯誤訊息(message)。true的話，則不會有任何反應

### console.clear()
* 清除console裏的所有訊息

### console.dir(element)
* 顯示選取物件(element)裏的所有屬性

### console.group() && console.group
* 將輸出資料包起來

### console.count()
* 計算累加出現次數

### console.time() && console.timeEnd()
* 計算被這兩個function包著的區塊裡的程式執行時間。

### console.table()
* 將資料整理成table格式