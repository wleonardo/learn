# 浏览器引擎相关

> 基于 mac pro(17A365) 10.13 chrome  63.0.3239.132(64wei)

js加载会中断页面渲染


css 资源
加载html资源至完成
解析html页面
由单独的其他线程预解析页面，找到需要加载的css文件
加载css文件，不停止解析html
html解析完成，生成dom树
css加载一个生成style tree，停止解析html
css每加载一个，加入style树
所有css加载完成， style 树完成。
在style树 和 dom树都完成的情况下，生成render树
（当html文件很大，css很小的极端情况下，会出现style树先完成的情况）
paint到页面上

> css加载完马上就加入style树，没有加载顺序，与js不同

js 资源
* 加载html资源至完成
* 由单独的其他线程预解析页面，找到需要加载的js文件
* 加载js文件，停止解析html
* 按照加载顺序执行，如果文件加载完，但是前面的js文件还未加载完或者执行完成，需要等待前面的js执行完成了才可以执行
* 继续html解析

所有情况下的js运行要符合几个条件
1. js文件已经下载完成
2. js文件编译已经完成
3. 解析器已经解析过当前需要执行的js（因为有预加载的存在，js有可能在dom解析还未到达的时候就已经完成了下载和编译，这个时候需要等待dom解析到当前脚本所在的位置，才可以运行）

* 正常情况下，js加载完成就编译，编译后运行（按照顺序），在运行完成后，页面才可以展示

* defer 加载完成就编译 在DOMContentLoaded之前全部运行完成（按照顺序），但是编译不再影响页面是否出现

* async 加载完成就编译，编译完成后运行（无须按照顺序），编译结果不在影响页面是否出现，

|    ---   |     frame（页面出现） |   DOMContentLoaded   |
| :-------- | ：--------:| :------: |
| 正常    |   影响（之前） |  影响（之前）  |
| defer    |   无关 |  影响（之前）  |
| async    |   无关 |  无关  |
