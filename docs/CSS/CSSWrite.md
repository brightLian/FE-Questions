# CSS 手写代码
## 清除浮动实现:star2:
```css
.clearfix:after {
	content: '';
	display: block;
	height: 0;
	clear: both;
}
.clearfix {
	zoom: 1; /* 兼容IE */
}
```

## 圣杯布局

## 双飞翼布局

## CSS 实现三角形
利用 border 实现
```html
<div class="triangle"></div>
```
```css
.triangle {
	width: 0;
	height: 0;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-bottom: 10px solid #000;
}
```

## CSS 实现扇形
利用 border + border-radius 实现
```html
<div class="sector"></div>
```
```css
.sector {
	width: 0;
	height: 0;
	border: 10px solid transparent;
	border-top: 10px solid #000;
	border-radius: 10px;
}
```

## CSS 实现箭头
利用 border + rotate 实现
```html
<div class="arrow"></div>
```
```css
.arrow {
	width: 10px;
	height: 10px;
	border-left: 1px solid #000;
	border-top: 1px solid #000;
	transform: rotate(45deg);
	
}
```

## 1像素问题解决方案:star2:
- 使用伪类 + transform 的形式：以前一些老版本的机型会出现粗细不均的情况，不过这些机型已经基本不在了。
```html
<div class="border-bottom">我有一个border-bottom</div>
```
```css
.border-bottom { 
    overflow: hidden; 
    position: relative; 
    border: none!important; 
} 
.border-bottom:after { 
   content: ""; 
   display: block; 
   position: absolute; 
   left: 0; 
   bottom: 0; 
   width: 100%; 
   height: 1px; 
   background-color: #000; 
   -webkit-transform-origin: 0 0; 
   transform-origin: 0 0; 
   -webkit-transform: scaleY(0.5); 
   transform: scaleY(0.5);
}
```
- 使用 box-shadow 的形式：颜色会变浅。
```html
<div class="border-bottom">我有一个border-bottom</div>
```
```css
.border-bottom {
    box-shadow: inset 0 -1px 1px -1px #000;
}
```
- 使用 svg 实现

## 实现九宫格布局:star2:
```html
<!--可以任意删除元素试一试-->
<div class="content">
   <div class="item">1</div>
   <div class="item">2</div>
   <div class="item">3</div>
   <div class="item">4</div>
   <div class="item">5</div>
   <div class="item">6</div>
   <div class="item">7</div>
   <div class="item">8</div>
   <div class="item">9</div>
</div>
```
```css
.content {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
}
.item {
    width: 30%;
    margin-left: 2%;
    height: 100px;
    border: 1px solid red;
    margin-bottom: 10px;
}
.item:nth-child(3n) {
    margin-right: 2%;
}
```

## 已知如下代码，如何才能让图片宽度为 300px？
```html
<img src="xxx.jpg" style="width:480px!important;”>
```
- max-width: 300px
- transform: scale(0.625,0.625)