### 关于DOM1, DOM2,DOM3
在[MDN](https://developer.mozilla.org/fr/docs/DOM_Levels)上的解释,应该是没有DOM0,这三个相当于DOM2的三个规范(可以看做css2,css3的感觉),DOM1制定了什么是DOM,指定了`class`, `id`等属性,同时有了一些直接绑定在dom上的事件,比如`click`, `select`, `focus`, `blur`等,具体可以参看[w3c dom-level-1](https://www.w3.org/TR/REC-DOM-Level-1/level-one-html.html#ID-642250288)。在使用上只可以绑定在DOM上,这些事件其实在DOM1的协议中暂时都是DOM的属性, 所以在DOM1中我们绑定事件有如下两个方式
```
// **方式二会覆盖方法一**
// 方式一
<div onclick="handler(event)"></div>

// 方式二
<script>
var dom = document.getElementById('one');
dom.onclick = handler;
</script>
```

> 作为DOM0的规范，几乎所有的浏览器都支持，不需要什么polyfill

[DOM2](https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-eventgroupings-uievents)中,增加了`event`事件,同时也看到了,我们熟悉的`addEventListener`, `removeEventListener`等函数, 还可以看一些我们很常见的属性。

![](http://ozvd64z7s.bkt.clouddn.com/QQ20180203-112810@2x.png)

[DOM3关于事件的协议](https://www.w3.org/TR/DOM-Level-3-Events/#ui-events-intro)在DOM2的基础上增加了一些事件,修改了一些细节。

### 停止事件冒泡和传播
![eventflow](http://ozvd64z7s.bkt.clouddn.com/eventflow.svg)
![止事件冒泡和传播](http://ozvd64z7s.bkt.clouddn.com/201817210161425.png)

```
event.stopPropagation();
event.cancelBubble = true;
```

cancelBubble 并不是ie特有的(除了firefox都有),cancelBubble是一个未统一的规范,在mdn上表示cancelBubble是stopPropagation的“曾用名”。但是ie8及以下无stopPropagation,只有cancelBubble。

```
stopPropagation: function() {
  var e = this.originalEvent;

  this.isPropagationStopped = returnTrue;

  if ( !e || this.isSimulated ) {
    return;
  }

  // If stopPropagation exists, run it on the original event
  if ( e.stopPropagation ) {
    e.stopPropagation();
  }

  // Support: IE
  // Set the cancelBubble property of the original event to true
  e.cancelBubble = true;
}
```

### 事件绑定
IE8及以下没有addEventListener函数,需要使用attachEvent,且attachEvent只有冒泡，所以建议使用冒泡。

`addEventListener`函数可以接收三个参数，前两一个是事件类型的字符串，一个是回调函数，第三个参数则可以使一个对象也可以是一个布尔类型，如果为布尔类型则是控制`useCapture`, `true`表示为在捕获阶段触发，`false`表示为在冒泡阶段触发，默认为false, 第三个参数也可以为一个对象, 语法如下
```
target.addEventListener(type, listener ,{capture: Boolean, bubbling: Boolean, once: Boolean});
// capture: 控制是冒泡还是捕获阶段触发
// once: 为true是表示触发一次就移除该监听事件
// passive: 表示`listener`永远不会调用`preventDefault()`。
```
具体可以参看[ventTarget.addEventListener()]https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener

#### target 和 currentTarget

target: 代表当前目标对象（事件作用的对象）
currentTarget: 代表注册监听器的对象

```
<div id="wapper">
  <div id="inside"></div>
</div>

<script>
  var wapperDom = document.getElementById('wapper');
  wapperDom.addEventListener('click', function(e) {
    console.log(e.target); // <div id="inside"></div>
    console.log(e.currentTarget); // <div id="wapper">...</div>
  })
</script>
```

> 注，其实currentTarget可以更加准确的获取到绑定事件的dom，其实应该更加实用，但是在ie8比较麻烦。ie8下的srcElement等同于target，ie8下无currentTarget对应的属性。

#### W3C标准, IE, firefox 的区别
```
// W3C标准
dom.addEventListener(eventName, function(e){
  // this === dom === e.currentTarget
},false);

// IE8及以下
dom.attachEvent(onEventName, function() {
  // this === window
  var e = window.event;
  // srcElement相当于
  var target = e.srcElement;
});

// firefox
// firefox需要将event以第一个参数的形式传入回调函数中
dom.addEventListener(eventName, function() {
  console.log(event); //undefined
}, false);

dom.addEventListener(eventName, function(e) {
  console.log(e); //event....
}, false);
```

```
// 兼容处理
var EventUtil = {
  addHandler: (element, type, handler) => {},

  removeHandler: (element, type, handler) => {}，
  // 获取event对象
  getEvent: (event) => {
    return event ? event : window.event
  },
  // 获取当前目标
  getTarget: (event) => {
    return event.target ? event.target : event.srcElement
  },
  // 阻止默认行为
  preventDefault: (event) => {
    if (event.preventDefault) {
      event.preventDefault()
    } else {
      event.returnValue = false
    }
  },
  // 停止传播事件
  stopPropagation: (event) => {
    if (event,stopPropagation) {
      event.stopPropagation()
    } else {
      event.cancelBubble = true
    }
  }
}
```
> 注，必须传event参数，使用target，因为currentTarget在ie8下无兼容方案，不使用this，ie8下this错误。最好还是使用jquery的方案。

> 注2，ie8及以下的this解决，可以使用call来实现, 因为ie8及以下没有bind函数
#### 多次绑定
```
var handler = function() {
  console.log('catch');
}
dom.addEventListener('click', handler);

dom.addEventListener('click', handler);
```
向上面这样是会不会多次绑定。

```
var handler = function() {
  console.log('catch');
}

dom.bind('click', handler);
dom.bind('click', handler);
```

但是jquery还是会绑定两次的。需要使用unbind来解决

```
// 解除所有的click事件
dom.unbind('click');

// 解除所有的特定的click事件
dom.unbind('click', handler);


dom.bind('click', handler);
dom.bind('click.test', handler2);
dom.bind('click.test', handler3);
// 这样只会移除handler2和handler3
dom.unbind('click.test');
```


> [whatwg事件列表](https://html.spec.whatwg.org/multipage/webappapis.html#event-handlers-on-elements,-document-objects,-and-window-objects)
