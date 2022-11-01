# Main Task
* 實作當使用者scroll down/up的範圍已超過navigation menu(nav)的原有位置時，將nav固定在上方的效果。

# 如何實作
## 主要步驟
1. 比較目前scroll down的距離是否超過nav的原生位置(scrollY vs topOfNav)
2. 根據上一步的結果來修改CSS的結果
3. 新增相關動畫效果

## Step 1：偵測選單到頂部的高度
* window.scrollY：使用者目前已scroll down的距離
* element.offSetTop：element與window之間的距離
```javascript
const nav = document.getElementById('main'); // document.querySelector('#main')
const topofNav = nav.offsetTop;

function fixNav(){
    console.log(topOfNav, window.scrollY);
}
window.addEventListener('scroll', fixNav);
```
* 透過以上的code，可發現topOfNav會固定不變，window.scrollY則會隨著使用者scrolling而產生變化

## Step 2：根據Step 1的結果來修改CSS的結果
* 若高度超過，同時在body和CSS新增fixed-nav的效果和相關樣式，反之則移除。
* fixed-nav：將nav變為fixed，並加上陰影，增加Logo的寬度（使其更加突出）
```javascript
function fixNav() {
    console.log(topofNav);
    if (window.scrollY >= topofNav) {
      document.body.style.paddingTop = nav.offsetHeight + 'px';
      document.body.classList.add('fixed-nav');
    } else {
      document.body.style.paddingTop = 0;
      document.body.classList.remove('fixed-nav');
    }
  }

  window.addEventListener('scroll', fixNav);
```

``` CSS
/* 將nav變為fixed，並加上陰影 */
body.fixed-nav nav {
  position: fixed;
  box-shadow: 0 5px 0 rgba(0,0,0,0.1);
}
/* 增加Logo的寬度 */
.fixed-nav li.logo {
  max-width: 500px;
}
/* 若為fixed-nav，將site-wrap縮放回1，造成整體放大效果 */
.fixed-nav .site-wrap {
  transform: scale(1);
}
```