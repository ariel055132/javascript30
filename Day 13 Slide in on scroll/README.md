# Main Task
* 在scroll down的時候，圖片會以動畫的形式滑進去相關區域
* 作者其實已經寫好滑入效果和動畫的code
    1. align-right / align-left
    2. slide-in

# 如何實作
## Step 1: 選取image需要進入的區域，並新增監聽事件
* 在新增監聽事件的同時，需要加上時間限制，避免事件發生頻率過多，導致網站的loading太重，這邊是用debounce
```javascript
const sliderImages = document.querySelectorAll('.slide-in');

function checkslide(){
  sliderImages.forEach(sliderImage => {
    
  })
}

window.addEventListener('scroll', debounce(checkSlide));

function debounce(func, wait = 20, immediate = true) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }
```

## Step 2: 讀取圖片的位置
```javascript
function checkSlide() {
    sliderImages.forEach(sliderImage => {
        // 取得圖片1/2高度的定位點（卷軸垂直位移量＋視窗高度）- 1/2圖片高度
        const slideInAt = (window.scrollY + window.innerHeight) - (sliderImage.height / 2);
        // 取得圖片底部定位點（利用圖片頂部定位點+圖片高度取得）
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        // 判斷視窗是否已經超過圖片高度一半
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        // 判斷滾動範圍是否已經超過圖片底部（卷軸垂直位移量）
        const isNotScrolledPast = window.scrollY < imageBottom;
        // 判斷是否超過圖片一半高，且視窗尚未超過圖片底部來增加或移除css效果
        if (isHalfShown && isNotScrolledPast) {
          sliderImage.classList.add('active');
        } else {
          sliderImage.classList.remove('active');
        }
    });
}

```
