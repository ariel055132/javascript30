# Main Task
* 在輸入框中輸入欲搜尋的詞，網站會迅速進行匹配，並把相關結果顯示在下方
* 作者已經有預先建立一個存放城市和週份的json清單，並把相關的html和css的code寫上去，只需要把javascript的部分補上即可。

# 如何實作
1. 建立一個空的array(cities)來存放fetch所得的json資料。
2. 使用fetch來取得相關的json資料。
3. 利用regex來進行string的比對。(相關function為displayMatches)
4. 對輸入框加上eventListener來進行監聽，每次鍵盤輸入就觸發displayMatches來進行比對，並把相關結果利用map來return到html的list來顯示
    * 對結果顯示高亮