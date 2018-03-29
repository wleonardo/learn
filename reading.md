#### [ES6 的几个小技巧](https://juejin.im/post/5ab9a8196fb9a028b86e0615?utm_source=gold_browser_extension)

> 关于函数的强制参数，`Array.reduce`，对象解构，数组解构的相关技巧，挺有启发的


#### 获取dom的位置
下面是Jquery-3.3.1.js的实现，
通过`getBoundingClientRect`来获取dom相对于视窗的位置，再通过`defaultView`来获取视窗滚动的距离，相加获得dom的位置
```
function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	}
```

#### https的握手过程
[SSL/TLS协议运行机制的概述](http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html)

#### 关于redux相关插件的选择
* Context
  * 我需要一个全局数据源且其他组件可以直接获取/改变全局数据源中的数据
* Redux
  * 我需要一个全局数据源且其他组件可以直接获取/改变全局数据源中的数据
  * 我需要全程跟踪/管理 action 的分发过程/顺序
* redux-thunk
  * 我需要一个全局数据源且其他组件可以直接获取/改变全局数据源中的数据
  * 我需要全程跟踪/管理 action 的分发过程/顺序
  * 我需要组件对同步或异步的 action 无感，调用异步 action 时不需要显式地传入 dispatch
* redux-saga
  * 我需要一个全局数据源且其他组件可以直接获取/改变全局数据源中的数据
  * 我需要全程跟踪/管理 action 的分发过程/顺序
  * 我需要组件对同步或异步的 action 无感，调用异步 action 时不需要显式地传入 dispatch
  * 我需要声明式地来表述复杂异步数据流（如长流程表单，请求失败后重试等），命令式的 thunk 对于复杂异步数据流的表现力有限

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


#### 缓存
![](https://segmentfault.com/img/remote/1460000013662137?w=886&h=539)

#### GET与POST的区别
[99%的人都理解错了HTTP中GET与POST的区别](https://zhuanlan.zhihu.com/p/22536382)

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
