前端开发始终绕不过的就是操作DOM，在以前，我们使用Jquery，zepto等库来操作DOM，之后在vue，Angular，React等框架出现后，我们通过操作数据来控制DOM（绝大多数时候），越来越少的去直接操作DOM，更不用说用原生的JS来操作DOM了。

但是并不是所有时候都一定要引入这些库，对于基础的JS操作DOM的一些方法，还是要有些了解的。这里就算是回顾一下JS那些熟悉却也陌生的DOM操作函数。

[toc]

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
> element.getElementsByTagName // ie6+
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
const divDom = document.getElementsByTagName('div');
const pDom = divDom[0].getElementsByTagName('p');
```

#### 按照属性查询
> element.querySelector //ie8+
> element.querySelectorAll() //ie8+
> querySelector返回返回的是单个DOM元素，querySelectorAll返回NodeList

`querySelector`的语法很类似jquery里面的选择器，`querySelector`和`querySelectorAll`的使用方法是一样，所以下面的一些说法都是适用于两个。
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
const infoDom = document.querySelectorAll('.info');
const infoDom2 = document.querySelectorAll('.info:not(.test)');
```
> querySelectorAll 和 querySelector 在子查询下和jquery不是一样的，详见[DOM元素querySelectorAll可能让你意外的特性表现](http://www.zhangxinxu.com/wordpress/2015/11/know-dom-queryselectorall/)
> 简单的说就是`document.querySelector("#my-id").querySelectorAll("div div");`，直接感觉是查询`#my-id`的子元素下符合`div div`的`dom`，其实不是，而是`#my-id`的子元素中，同时也符合在全局范围内的`div div`的`dom`。

#### 获取父元素
> element.parentNode // 基本都兼容

#### 获取子元素
> element.childNodes // 基本都兼容

`element.childNodes`不止会获取到`DOM`，也会获取到文字等，只有当`nodeType === 1`时才表示`DOM`。


#### 获取兄弟节点
##### 获取前面的兄弟节点
> element.previousSibling //基本都兼容

获取所有前面的兄弟节点就是遍历`previousSibling`, 直到`null`。

> Gecko内核的浏览器会在源代码中标签内部有空白符的地方插入一个文本结点到文档中.因此,使用诸如 Node.firstChild 和 Node.previousSibling 之类的方法可能会引用到一个空白符文本节点, 而不是使用者所预期得到的节点.

##### 获取后面的兄弟节点
> element.nextSibling //基本都兼容

获取所有和注意点都和`previousSibling`一样

### DOM操作
#### 创建DOM
> document.createElement(tagName)

#### 新增DOM
##### 添加到节点的子节点的最后 append
> paranetElement.appendChild(child);

##### 添加到节点的前面
> paranetElement.insertBefore(newElement, Element)

通过`insertBefore`方法可以将`newElement`插入到`Element`后面，如果`Element`是`null`则将`newElement`插入到`paranetElement`的尾部。

如果`newElement`是一个已经存在在文档中的`DOM`, `insertBefore`则会表现为移动该`DOM`(将会保留所有的事件)。

##### 添加到节点的后面
> 没有这个函数 😶
> 可以使用 insertBefore 方法和 nextSibling 来模拟它。

```
parentDiv.insertBefore(sp1, sp2.nextSibling);
```
如果`sp2`没有下一个节点，则它肯定是最后一个节点，则`sp2.nextSibling`返回`null`，且`sp1`被插入到子节点列表的最后面（即`sp2`后面）

详见[Node.insertBefore()](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore)

#### 修改DOM
##### 修改DOM的文案
> Element.innerHTML // 获取标签内的所有内容
> Element.innerText // 只获取标签内的文字内容，不包括标签

##### 修改css
> element.style.cssAttribute

##### 修改属性
> element.setAttribute()
> element.removeAttribute()

> element.className

#### 删除DOM
> paranetElement.removeChild(element)

#### 清空子节点
> 没有专门的函数，可以遍历removeChild来实现

```
var element = document.getElementById("top");
while (element.firstChild) {
  element.removeChild(element.firstChild);
}
```
### 结尾
关于`DOM`的操作，常用的暂时只想到这么多，以后想到了，再慢慢补充
