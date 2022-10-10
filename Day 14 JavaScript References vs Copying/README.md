# Main Task
* 作者利用例子，介紹JavaScript的不同數據的Reference和Copy的區別

# 如何實作
## 1. 從string，number和boolean開始
```javascript
let age = 100;
let age2 = age;
console.log(age, age2); // 100 100
age = 200;
console.log(age, age2); // 200 100
```
* 從以上的例子可看出，age的修改不會對age2造成影響。
* string和boolean和number一樣。
* 以上的情況為 **call by value**
  
## 2. 以array進行示範
```javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team = players;
// 第一次console結果如下
// players: ['Wes', 'Sarah', 'Ryan', 'Poppy']
// team: ['Wes', 'Sarah', 'Ryan', 'Poppy']
console.log(players, team); 
```
* 第一次console的結果跟number一樣，好像真的一樣
* 嘗試修改team的值，並印出players和team的element
```javascript
team[3] = 'Lux';
// 第二次console結果如下
// players: ['Wes', 'Sarah', 'Ryan', 'Lux']
// team: ['Wes', 'Sarah', 'Ryan', 'Lux']
console.log(players, team);
```
* 連原本的array，players也被修改了
* 因為team只是players這個array的 **reference** ，並不是copy。
* 代表team和players都是指向同一個array，那麼修改team裏的element也會修改到players的element就不意外了。

## 3. Array複製的方法介紹
* **Array.prototype.slice()**
* 直接使用以上方法，並不指定start和end的位置，等於直接複製整個array
```javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team = players.slice(); // team: ['Wes', 'Sarah', 'Ryan', 'Poppy']
team[3] = 'Lux';
// console結果如下
// players: ['Wes', 'Sarah', 'Ryan', 'Poppy']
// team: ['Wes', 'Sarah', 'Ryan', 'Lux']
console.log(players, team)
```

* **Array.prototype.concat()**
* 可定義一個空array，並使用用作合併array的concat來進行合併，來達到複製整個array的效果
* concat並不會更改原本的array，而是return一個新的array
```javascript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team2 = [].concat(players);
team2[3] = 'Lux2';
// console結果如下
// players: ['Wes', 'Sarah', 'Ryan', 'Poppy']
// team2: ['Wes', 'Sarah', 'Ryan', 'Lux2']
console.log(players, team2); 
```

* **ES6 Spreading**
* 直接使用它來進行複製，這個方法比較簡潔
```javascript
const team4 = [...players];
team4[3] = 'Lux4';
// console結果如下
// players: ['Wes', 'Sarah', 'Ryan', 'Poppy']
// team4: ['Wes', 'Sarah', 'Ryan', 'Lux2']
console.log(players, team4);
```

* **Array.from()**
* 直接使用array物件來創建新的array
```javascript
const team5 = Array.from(players);
team5[3] = 'Lux5';
// console結果如下
// players: ['Wes', 'Sarah', 'Ryan', 'Poppy']
// team5: ['Wes', 'Sarah', 'Ryan', 'Lux5']
console.log(players, team5);
```

## 4. 如何複製object(物件)？
* 先declare一個object
```javascript
const person = {
    name: 'Wes bos',
    age: 80
};
```
* 直接使用number這種複製方法好像不行
```javascript
const captain = person;
captain.number = 99;
// console的結果如下
// person: Object {name: 'Wes bos', age: 80, number: 99}
// captain: Object {name: 'Wes bos', age: 80, number: 99}
console.log(person, captain);
```
* 原因跟array一樣，他們都是 **call by reference**

## array的複製方法
* **Object.assign()**
* 使用assign方法，把最後的參數直接覆蓋最前面參數的container的屬性
```javascript
const cap2 = Object.assign({}, person, { number: 99, age: 12 });
console.log(cap2); // Object {name: "Wes Bos", age: 12, number: 99}
```

* **JSON.parse() + JSON.stringify()**
* 利用JSON，將object轉成string，然後再轉成JSON，來實現複製。
* 這個方法也適用於array
```javascript
var obj = { a: 1, b: 2 };
var obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj, obj2);// { a: 1, b: 2 } { a: 1, b: 2 }
obj2.b = 3;
console.log(obj, obj2);// { a: 1, b: 3 } { a: 1, b: 3 }
```