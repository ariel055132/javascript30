# Main Task
* 使用navigator.gelocation來取得device的目前位置和速率

# 如何實作
1. 取得HTML中的element。
2. 使用watchPosition來取得user的地理位置，海拔，速度。
```javascript
const arrow = document.querySelector('.arrow');
    const speed = document.querySelector('.speed-value');

    navigator.geolocation.watchPosition((data) => {
      console.log(data);
      speed.textContent = data.coords.speed;
      arrow.style.transform = `rotate(${data.coords.heading}deg)`;
    }, (err) => {
      console.error(err);
    });
```