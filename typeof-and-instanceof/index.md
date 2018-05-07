首先我们先了解一下js的数据类型，js中一共有6中数据类型
* Primitive(原始类型)
  * Boolean
  * Null
  * Undefined
  * Number
  * String
  * Symbol
* Object
 * Number
 * Array
 * function
 * Date
 * String
 .
 .
 .

`Boolean`有`true`和`false`, `Null`只有一个值`null`, `Undefined`只有一个值`Undefined`

Boolean，Number，String和Object下的Boolean，Number，String是不一样的。一个是基本数据类型，一个是一种对象类型。如下
```
// Number
var a  = 1;

// Object(Number)
var b = new Number(1);
```

### `typeof`
> 详见 [typeof] https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof

| 类型    | 	结果    |
| :------------- | :------------- |
| Undefined       | "undefined"      |
| Null       | "object"      |
| Boolean       | "boolean"      |
| Number       | "number"      |
| String       | "string"      |
| Symbol       | "symbol"      |
| 宿主对象（由JS环境提供）       | "Implementation-dependent"      |
| 函数对象（`[[Call]]` 在ECMA-262条款中实现了）       | "function"      |
| 任何其他对象       | "object"      |

可以看出来typeof如果是原始对象，则返回原始对象的类型，在遇到Object的情况下除了宿主对象和函数，则返回"object",其实object也是原始对象的一种，所以可以理解为typeof 主要是返回是基本数据类型中的哪一个。
```
// Number
var a  = 1;

// Object(Number)
var b = new Number(1);

typeof a; // 'number'
typeof b; // 'object'
```


#### 关于`typeof null ==== 'object'`

在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null的类型标签也成为了 0，typeof null就错误的返回了"object"。


#### `let`
let和const除了有块级作用域的特点外，还取消了变量提升的功能。
```
typeof a; // "undefined"
var a = 1;

typeof b;//ReferenceError
let b = 2;
```

#### 例外

```
type document.all === 'undefined'
```
尽管规范允许为非标准的外来对象定制类型标签，但它要求这些类型标签与预定义标签不同。document.all的类型标记为“undefined”的情况必须被列为违反规则的特殊情况。

### instanceof

`instanceof`用来测试一个对象在其原型链中是否存在一个构造函数的 `prototype`属性。相对来说instanceof的功能更加的直接，就是判断继承关系。

```
// Number
var a  = 1;

// Object(Number)
var b = new Number(1);

a instanceof Number; // false
b instanceof Number; // true
```

唯一需要注意的是在iframe和窗口之间，会出现`[] instanceof window.frames[0].Array === false`
