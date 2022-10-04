# Main Task
* 使用JavaScript和CSS製作即時的4個效果。
  1. Spacing（調整邊框距離）
  2. Blur（模糊）
  3. Grayscale（灰階）
  4. Base Color（調整邊框顏色）

# 如何實作
1. 使用CSS variable來定義CSS的變數。
2. 利用addEventListener來綁定HTML的控制桿。
3. 更新第一步定義的CSS變數來達成即時調整的效果。

# 語法
## CSS變數
```CSS
:root元素基本可以和整個HTML掛鉤
:root {
    --base: #ffc600;
    --spacing: 10px;
    --blur: 10px;
}
```

## 使用JS來和CSS溝通
* 使用style.setProperty
