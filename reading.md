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
