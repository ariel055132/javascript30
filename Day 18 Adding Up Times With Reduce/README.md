# Main Task
* 作者在初始文件提供了一個unordered list，裡面的list包含58個元素，每一個每一個元素到有一個data-time的properties，代表該元素的分和秒。
* 作者要求將所有元素所代表的時間進行加總，並用時(hour)：分(minute)：秒(second)來表示計算的結果。

# 如何實作
## 1. 取得所有li中data-time屬性的值
* 作者把時間都寫在**li[data-time]**中，因此使用document.querySelectorAll('li[data-time]'));將所有時間都拿下來。
* 要轉成array是因為使用上述的程式碼所得的時間會以nodeList表示，難以操作。
* 轉成array會比較好操作
```javascript
// 作者的寫法
const timeNodes = Array.from(document.querySelectorAll('[data-time'));
// 我的寫法
const timeArray = Array.from(document.querySelectorAll('li[data-time]')); 
```

## 2. 將分和秒都直接轉換成秒，進行加總。
* 取得第一步的timeArray裡的每個元素
* dataset['time']的原因是元素被time包著。
* timeElement的type是string，並且分minute和秒，因此需使用：進行分割，同時使用parseInt將元素轉成int。
* timeElement的第一個元素為分，所以需要乘上60。
* 然後就加總，這邊看你愛用什麼方法。
```javascript
// 作者的寫法，使用map()和reduce直接得到結果
const seconds = timeNodes
      // 取出每個元素中的data-time資料
      .map(node => node.dataset.time)
      .map(timeCode => {
        // 用解構賦值的方式分別取出split(':')後的分與秒
        // 再透過一個map執行parseFloat將字串轉數值
        const [mins, secs] = timeCode.split(':').map(parseFloat);
        // 回傳這組資料轉換後的總秒數
        return (mins * 60) + secs;
      })
      // 用reduce來加總每次執行結果
      .reduce((total, seconds) => total + seconds);

// 我的寫法，先用for loop得到每個元素的總秒數，放到time裡面
let time = [];
for (let index = 0; index < timeArray.length; index++) {
    let timeElement = timeArray[index].dataset['time'].split(':');
    time.push(parseInt(timeElement[0], 10) * 60 + parseInt(timeElement[1], 10)); 
}
// 使用reduce進行加總，這邊也可以用for啦
let totalSeconds = time.reduce(
    (time1, time2) => time1 + time2, 0
  );
  console.log(totalSeconds);
  /*
  let totalTime2 = 0;
  for (let index = 0; index < time.length; index++) {
    totalTime2 += time[index];
  }
  console.log(totalTime2);
  */
```
## 2. 將結果轉化成新格式。
* 就一般數學......
```javascript
let second = totalSeconds % 60;
let hour = Math.floor(totalSeconds / 3600);
let minute = (totalSeconds - 3600 * hour - second) / 60;
console.log(`"Total hour ${hour}`);
console.log(`"Total minute ${minute}`);
console.log(`"Remain Second ${second}`);
console.log(`${hour}:${minute}:${second}`);
```