## :lollipop: 事件对象(event)
监听事件返回的数据.


```javascript
at.on('pan', event=>{
    // event包含速度/方向等数据
});
```

### event
|名称|数据类型|说明|
|-|-|-|
|name|`String`|**识别器名**,对应识别器参数的`name`|
|type|`String`|**事件名**,如tap/panstart等,他比`name`字段范围大,如:当`type`是panstart或panmove, 而`name`返回的都是pan|
|phase|`String`|当前触碰状态: start \| move \|end \| cancel对应: 第一下触碰 \| 屏幕上移动 \| 离开屏幕 \| 非正常离开 \"可anyTouch\"元素 |
|x|`Number`|**当前触点中心**x坐标|
|y|`Number`|**当前触点中心**y坐标|
|deltaX|`Number`|**当前触点**和**前触点**的x轴偏移距离|
|deltaY|`Number`|**当前触点**和**前触点**的y轴偏移距离|
|displacementX|`Number`|**当前触点**与**起始触点**的x位移(矢量)|
|displacementY|`Number`|**当前触点**与**起始触点**的y位移(矢量)|
|distanceX|`Number`|displacementX的绝对值|
|distanceY|`Number`|displacementY的绝对值|
|distance|`Number`|**当前触点**与**起始触点**的距离(标量)|
|deltaTime|`Number`|**当前时间**与**起始触碰时间**的差值|
|velocityX|`Number`|当前x轴速度|
|velocityY|`Number`|当前y轴速度|
|direction|`Number`|**前触点**与**当前触点**的方向,可以理解为瞬时方向|
|angle|`Number`|多点触摸时,**起始触点**与**当前触点**的旋转角度|
|deltaAngle|`Number`|多点触摸时,**前触点**与**当前触点**的旋转角度|
|scale|`Number`|多点触摸时,**起始触点**与**当前触点**的缩放比例|
|deltaScale|`Number`|多点触摸时,**前触点**与**当前触点**的缩放比例|
|maxPointLength|`Number`|本轮识别周期出现过的最大触点数|
|isStart|`Boolean`|是否当前识别周期的开始, 规律为从touchstart->touchend即是一个周期, 即便多点触碰, 有一个点离开,本轮识别结束|
|isEnd|`Boolean`|是否当前识别周期的结束|
|target|`EventTarget`|绑定事件的元素|
|targets|`EventTarget[]`|对应多个触点会存储touches中的每一个target|
|currentTarget|`EventTarget`|实际触发绑定事件的元素|
|timestamp|`Number`|**当前时间**|
|**nativeEvent**|`TouchEvent`|原生事件对象|
|getXYAngle|`(x,y)=>angle`|计算x,y夹角, 比如计算deltaX与deltaY形成的夹角: `getXYAngle(e.deltaX, e.deltaY)`|
|getDirection|`(x,y)=>direction`|计算2个向量的**和向量**的方向,比如计算**开始接触点**和**离开屏幕点**连线的指向: `getDirection(e.displacementX,e.displacementY)`|

