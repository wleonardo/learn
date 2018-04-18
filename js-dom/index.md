前端开发始终绕不过的就是操作DOM，在以前，我们使用Jquery，zepto等库来操作DOM，之后在vue，Angular，React等框架出现后，我们通过操作数据来控制DOM（绝大多数时候），越来越少的去直接操作DOM，更不用说用原生的JS来操作DOM了。

但是并不是所有时候都一定要引入这些库，对于基础的JS操作DOM的一些方法，还是要有些了解的。这里就算是回顾一下JS那些熟悉却也陌生的DOM操作函数。

### 查询
#### 按照ID查询

> document.getElementById(id) // 兼容最好

```
// demo
// HTMl
<body>
  <div id="main">
    <div id="content"></div>
  </div>
</body>

// Script
const mainDom = document.getElementById('main');

const contentDom = document.getElementById('content');
```

#### 按照class查询

> element.getElementsByClassName // ie9+
> element.querySelectorAll // ie8
> 遍历 // ie7-

```
// demo
// HTMl
<body>
  <div id="main">
    <div id="content">
      <p class="info test">info1</p>
      <p class="info">info2</p>
      <p class="info">info3</p>
    </div>
  </div>
</body>

// Script
const mainDom = document.getElementById('main');
const infoDomList1 = mainDom.querySelectorAll('.info.test');
const infoDomList2 = mainDom.getElementsByClassName('info test');
```

#### 按照Tag查询
