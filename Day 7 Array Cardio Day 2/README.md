# Main Task
* 作者透過5個題目來介紹Array的進階操作方式。

# 如何實作
## 範例內提供了2組資料：
1. people: 裡面的element會包含name（型態為string）和year（型態為number)
2. comments: 裡面的element會包含text（型態為string）和id（型態為number)

## 題目：
1. is at least one person 19? （在people這個container裏，是否有19歲以上的人？）
2. is everyone 19? （在people這個container裏，是否每個人都19歲以上？）
3. find the comment with the ID of 823423 （在comments這個container裏，找出id為823423的資料內容）
4. delete the comment with the ID of 823423 （在comments這個container裏，刪除id為823423的資料）

# Solution
## 1. 在people這個container裏，是否有19歲以上的人？
* 使用 **Date()** 物件和 **getFullYear()** 來取得今年的年份，盡量不要用 **getYear()** ，因為這個方法已過時
* 使用 **some()** 來將Array裡面的element逐一進行判斷，若有一筆通過判斷，則回傳true。
```javascript
const isAdult = people.some(person => {
    const currentYear = (new Date().getFullYear());  // returns the current year
    return currentYear - person.year >= 19;
});
```
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some

## 2. 在people這個container裏，是否每個人都19歲以上？
* 使用 **every()** 對每一筆資料進行判斷，若有一筆資料沒通過判斷，回傳false並結束。
```javascript
const allAdult = people.every(person => {
    const currentYear = (new Date().getFullYear());  // returns the current year
    return currentYear - person.year >= 19;
});
```
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every

## 3. 在comments這個container裏，找出id為823423的資料內容
* 使用 **find()** 對array裡面的element逐一進行判斷，並回傳第一筆符合條件的value。
* 若對沒有符合的值，將回傳undefined。
```javascript
const comment = comments.find(comment => comment.id == 823423);
```
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
* 這邊只使用 == 是因為用 === 會回傳undefined，但我完全不知道為什麼作者使用 === 會通過。

## 4. 在comments這個container裏，刪除id為823423的資料
* 利用 **findIndex()** 對Array中每一筆element進行判斷，並回傳符合條件的index。
* 利用 **slice()** 直接開切
```javascript
// 我自己的寫法
const index = comments.findIndex(comment => comment.id == 823423);
comments.splice(index, 1); // use splice to remove, remove 1 item only (which is index)

// 作者寫法
const index = comments.findIndex(comment => comment.id === 823423);
const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
];
```
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
* 接著利用spared也就是省略符號...來進行展開陣列並透過slice()組合陣列，
* ...comments.slice(0, index),這段先將陣列開頭到索引值前的資料加進來，
* ...comments.slice(index + 1)這段則是將索引值+1後延續到陣列結束的資料加進來。