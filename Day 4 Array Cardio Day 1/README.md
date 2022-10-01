# Main Task
* 作者透過8個題目來介紹Array的操作方式。

# 如何實作
## 範例內提供了3組資料：
1. inventors(發明家)：first(名)，last(姓)，year(出生年份)，passed(過世年份)
2. people：以逗點分隔的姓名，逗點前為First name，逗點後為Last name
3. data：一組包含重複資料的Array，裡面的內容為代步方式

## 題目：
1. Filter the list of inventors for those who were born in the 1500's (篩選出在16世紀內出生的inventor)
2. Give us an array of the inventors' first and last names (將investors的姓和名組合在一起，以array的形式表示)
3. Sort the inventors by birthdate, oldest to youngest (依據出生年份，從大到小排序所有的investors)
4. How many years did all the inventors live? (對所有investor的在世時間進行加總)
5. Sort the inventors by years lived (依據年齡/inventor的在世時間，從大到小排序所有的investors)
6. create a list of Boulevards in Paris that contain 'de' anywhere in the name (列出wiki中所有在巴黎，包含de的路名)
7. Sort the people alphabetically by last name (依據lastname，排序所有people裡的資料)
8. Sum up the instances of each of these (分別計算data裡每個種類的數量)

# Solution
## 1. 篩選出在16世紀(在1500年-1599年出生)內出生的inventor
* 利用 **filter()** 來對inventor進行篩選，並會將結果為true的資料組成array，並且return
```javascript
const fifteen = inventors.filter(inventor => {
    if (inventor.year >= 1500 && inventor.year <= 1599>){
        return true;
    } 
    return false;
})
```
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
* filter()會return array是因為filter()會在進行篩選前先建立一個array的shallow copy。然後根據這個shallow copy來進行篩選。

## 2. 將investors的姓和名組合在一起，以array的形式表示
* 利用map將first name和last name組合，並返回array
```javascript
// 我自己的寫法，就單純的組合字串
const fullName = inventors.map(inventor => inventor.first + ' ' + inventor.last); 
// 作者使用template literals 模板文字來寫
const fullName = inventors.map(inventor => `${inventor.first} ${inventor.last}`); 
```
* https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/map
* map()和filter()一樣，都會建立一個array，並回傳該array

## 3. 依據出生年份，從大到小排序所有的investors
* 利用sort()來進行排序
```javascript
// 我自己的寫法
const birthRate = inventors.sort((inventorA, inventorB) => {
    if (inventorA.year > inventorB.year) {
        return 1;
    } else {
        return -1;
    }
});
// 可利用arrow function和ternary operator來進行簡寫
const ordered = inventors.sort((a, b) => a.year > b.year ? 1: -1)
```
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
* 第一次寫的時候，我把return 1和return -1的位置分別寫成return true和return false，但是這樣子並不會回傳出結果
* MDN文件指出，當你要在自行定義sort的compare函數[compare(a,b)]時:
  * return > 0: 將a放到b的後面
  * return < 0: 將a放到b的前面
  * return === 0: 保持a和b的順序
* 然後才把return true和return false改成return 1和return -1

## 4. 對所有investors的在世時間進行加總
* 利用reduce()