# Main Task
* 作者在網站中給了一個array
* 需將array裡以A, An, The開頭的element替換
* 替換後，進行排序，並把相關結果放到HTML

# 如何實作
## 1. 建立篩選a, an, the的function
* 使用string的replace，搭配regex來將包含a, the, and開頭的文字替換成空白
```javascript
function strip(bandName) {
    return bandName.replace(/^(a |the |an )/i, '').trim();
}
```
* ^：只匹配以a,the或an開頭的string
* |：or的意思

## 2. 對相關array進行篩選與排序
```javascript
//原本的寫法
const sortedBands = bands.sort(function(a, b){
    if(strip(a) > strip(b)) {
        return 1;
    }else {
        return -1;
    }
})
//利用箭頭函數與三元運算式進行簡寫：
const sortedBands = bands.sort((a, b) => (strip(a) > strip(b)) ? 1 : -1);
```

## 3. 將排序好的array結果放到HTML
```javascript
// 作者的寫法，使用querySelector，利用#代表選取id為bands的區塊，並直接使用innerHTML，將程式碼直接丟進去
document.querySelector('#bands').innerHTML = 
      sortedBands.map(band => `<li>${band}</li>`).join('');
// 我的寫法，使用getElementById來進行選取
let band = document.getElementById("bands");
band.innerHTML = sorted.map(band => `<li>${band}</li>`).join('');
```