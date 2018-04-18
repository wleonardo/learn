o### 浏览器中

* macro task(宏任务)
  * setInterval()
  * setTimeout()
  * setImmediate
  * I/O
  * UI渲染

* micro task(微任务)
  * Promise
  * process.nextTick
  * Object.observe
  * MutationObserver

当当前执行栈里的内容为空的时候，会去查询是否有microtask在队列中，如果有，则执行所有的microtask队列，如果没有，则查看是否有macrotask，有则取出一个macrotask来执行，然后再去执行所有的microtask。

相当于如下
一个macrotask > 所有的microtask > 一个macrotask > 有的microtask ...

> [whatwg event loop](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue)


### node 环境中
```
   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │ 事件循环是在这里开始的，往下走
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```

* timers: 这个阶段执行定时器队列中的回调如 setTimeout() 和 setInterval()。
* I/O callbacks: 这个阶段执行几乎所有的回调。但是不包括close事件，定时器和setImmediate()的回调。
* idle, prepare: 这个阶段仅在内部使用，可以不必理会。
* poll: 等待新的I/O事件，node在一些特殊情况下会阻塞在这里。
* check: setImmediate()的回调会在这个阶段执行。
* close callbacks: 例如socket.on('close', ...)这种close事件的回调

#### poll阶段
当个v8引擎将js代码解析后传入libuv引擎后，循环首先进入poll阶段。poll阶段的执行逻辑如下： 先查看poll queue中是否有事件，有任务就按先进先出的顺序依次执行回调。 当queue为空时，会检查是否有setImmediate()的callback，如果有就进入check阶段执行这些callback。但同时也会检查是否有到期的timer，如果有，就把这些到期的timer的callback按照调用顺序放到timer queue中，之后循环会进入timer阶段执行queue中的 callback。 这两者的顺序是不固定的，收到代码运行的环境的影响。如果两者的queue都是空的，那么loop会在poll阶段停留，直到有一个i/o事件返回，循环会进入i/o callback阶段并立即执行这个事件的callback。

值得注意的是，poll阶段在执行poll queue中的回调时实际上不会无限的执行下去。有两种情况poll阶段会终止执行poll queue中的下一个回调：1.所有回调执行完毕。2.执行数超过了node的限制。

#### process.nextTick()
当事件循环准备进入下一个阶段之前，会先检查nextTick queue中是否有任务，如果有，那么会先清空这个队列。与执行poll queue中的任务不同的是，这个操作在队列清空前是不会停止的。这也就意味着，错误的使用process.nextTick()方法会导致node进入一个死循环。。直到内存泄漏。

> [详解JavaScript中的Event Loop（事件循环）机制](https://zhuanlan.zhihu.com/p/33058983)
> [The Node.js Event Loop, Timers, and process.nextTick()](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)


#### UI update

[event-loop-processing-model](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)
[Vue源码详解之nextTick](https://chuckliu.me/#!/posts/58bd08a2b5187d2fb51c04f9)

第一步，从多个task queue中的一个queue里，挑出一个最老的task。（因为有多个task queue的存在，使得浏览器可以完成我们前面说的，优先、高频率的执行某些task queue中的任务，比如UI的task queue）。
然后2到5步，执行这个task。
第六步， Perform a microtask checkpoint. ，这里会执行完microtask queue中的所有的microtask，如果microtask执行过程中又添加了microtask，那么仍然会执行新添加的microtask，当然，这个机制好像有限制，一轮microtask的执行总量似乎有限制(1000?)，数量太多就执行一部分留下的以后再执行？这里我不太确定。

第七步，Update the rendering：
7.2到7.4，当前轮次的event loop中关联到的document对象会保持某些特定顺序，这些document对象都会执行需要执行UI render的，但是并不是所有关联到的document都需要更新UI，浏览器会判断这个document是否会从UI Render中获益，因为浏览器只需要保持60Hz的刷新率即可，而每轮event loop都是非常快的，所以没必要每个document都Render UI。
7.5和7.6 run the resize steps/run the scroll steps不是说去执行resize和scroll。每次我们scoll的时候视口或者dom就已经立即scroll了，并把document或者dom加入到 pending scroll event targets中，而run the scroll steps具体做的则是遍历这些target，在target上触发scroll事件。run the resize steps也是相似的，这个步骤是触发resize事件。
7.8和7.9 后续的media query, run CSS animations and send events等等也是相似的，都是触发事件，第10步和第11步则是执行我们熟悉的requestAnimationFrame回调和IntersectionObserver回调（第十步还是挺关键的,raf就是在这执行的！）。
7.12 渲染UI，关键就在这了。
