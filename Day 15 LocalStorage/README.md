# Main Task
* 模擬menu在網站的效果，可在網站中新增新的item，並且在refresh之後不會清空已在清單裡的item。
* 作者也有利用這個課程來介紹localStorage這個在進行CRUD的時候蠻好的功能。
* (額外功能)對每一個item新增刪除的功能，而且加一個可將目前item都變成true的按鍵。

# 如何實作
## 1. 輸入欄位新增功能
* 取得form和ul元素裏的內容，並declare一個空array來存放新增的資料，以便之後進行html的新增。
```javascript
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates'); // 存放目前的item
const items = []; // 空array，用來存放新增的資料
```
* 撰寫新增功能(addItem)
```javascript
function addItem(event) {
    // stop the page from reloading (避免每次submit後，網頁會重整的情況)
    event.preventDefault(); 
    // use querySelector to obtain the value of input tag in form
    const text = (this.querySelector('[name=item]')).value;
    // declare the object 
    const item = {
        text: text,
        done: false
    }
    // empty the input of form
    this.reset();
}
addItems.addEventListener('submit', addItem);
```
* 上面的function只會把新增的物件放到items這個array，因此需要寫function來顯示items裏面的物件
```javascript
function populateList(plates = [], platesList = itemsList) {
    platesList.innerHTML = plates.map((plate, index) => {
      // form string with map + join
      return `
        <li>
          <input type="checkbox" data-index=${index} id="item${index}" ${plate.done ? 'checked' : ''}/>
          <label for="item${index}">${plate.text}</label>
        </li>
      `;
    }).join('');;
  }
```
* addItem最下面要加上populateList，否則不會生效

## 2. LocalStorage
* LocalStorage的功用：讓browser可以存取你設定在這個網站的資料。
* edge如何打開localstorage：f12 -> Application -> Storage -> LocalStorage
* 相關介紹可參考此網站：https://5xruby.tw/posts/localstorage。
* 先修改最一開始declare的items
```javascript
const items = JSON.parse(localStorage.getItem('items')) || [];
```
* 讓網站在refresh後，會先判斷localstorage是否有存放items的物件，沒有的話會給出empty array。
* 這種寫法可以提升網站的穩定性。
* 然後在addItem中新增下列用作存取localstorage的code
```javascript
populateList(items, itemsList);
localStorage.setItem('items', JSON.stringify(items));
this.reset();
```
* 這裡將items的資料存放在localstorage裡叫作items的自訂物件
* 存入的資料必須透過JSON.stringify轉為string（localstorage的限制，這邊在參考網站也有講到），才能進行存取
* 若直接存取，只會得到"object object"的string

## 3. 儲存checkbox的狀態
* 新增一個function來監聽itemsList的click
```javascript
  function toggleDone(event) {
    if (!event.target.matches('input')) return; // skip this unless it's an input
    // get the data-index value of checkbox
    const el = event.target;
    const index = el.dataset.index;
    // change the status of done from true and false (T-->F, F-->T)
    items[index].done = !items[index].done;
    // put the updated status into localStorage
    localStorage.setItem('items', JSON.stringify(items));
    // update the list
    populateList(items, itemsList);
  }
  itemsList.addEventListener('click', toggleDone);
```
* 這樣子就把作者教授的內容都實作出來了。

## 4. 增加delete功能