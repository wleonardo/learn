#### 怪异模式开启
判断当前模式
 ```
 x-ua-compatible doctype Document Mode
<meta http-equiv="X-UA-Compatible" content="IE=5" > // IE5 quirks 作死，千万别用
<meta http-equiv="X-UA-Compatible" content="IE=7/8/9/10" > // IE7/8/9/10 Standards
<meta http-equiv="X-UA-Compatible" content="IE=Edge" >  //  IE 最新版本的 Standards
// c<!-- 据说下面两个 在 <!DOCTYPE html> 下面才起效 -->
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7/8/9" >// IE7/8/9 Standards
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE10" > //IE10 Standards
 ```
```
document.compatMode // BackCompat：怪异模式；CSS1Compat：标准模式
```
[浏览器标准模式和怪异模式之间的区别是什么](https://zhidao.baidu.com/question/437436477445618004.html)


### 缓存
![](https://segmentfault.com/img/remote/1460000013662137?w=886&h=539)

### GET与POST的区别
![99%的人都理解错了HTTP中GET与POST的区别](https://zhuanlan.zhihu.com/p/22536382)

* GET在浏览器回退时是无害的，而POST会再次提交请求。
* GET产生的URL地址可以被Bookmark，而POST不可以。
* GET请求会被浏览器主动cache，而POST不会，除非手动设置。
* GET请求只能进行url编码，而POST支持多种编码方式。
* GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留。
* GET请求在URL中传送的参数是有长度限制的，而POST么有。
* 对参数的数据类型，GET只接受ASCII字符，而POST没有限制。
* GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
* GET参数通过URL传递，POST放在Request body中。


* GET产生一个TCP数据包；POST产生两个TCP数据包。

> 对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；
> 而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。
