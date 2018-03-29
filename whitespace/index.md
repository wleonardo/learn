### white-space
* `normal`   合并空格 换行符当做空格，填充line盒子时，必要的话会换行。
* `nowrap`   合并空格，但文本不会换行
* `pre`      保留空格，在遇到换行符或者`<br/>`元素时才会换行。
* `pre-wrap` 连续的空白符会被保留。在遇到换行符或者`<br>`元素，或者需要为了填充line盒子时才会换行。
* `pre-line` 连续的空白符会被合并。在遇到换行符或者`<br>`元素，或者需要为了填充line盒子时会换行。

<table class="standard-table">
 <thead>
  <tr>
   <th>&nbsp;</th>
   <th>换行符</th>
   <th>空格和制表符</th>
   <th>文字转行</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <th><code>normal</code></th>
   <td>合并</td>
   <td><span style="background-color: rgba(212, 221, 228, 0.14902);">合并</span></td>
   <td>转行</td>
  </tr>
  <tr>
   <th><code>nowrap</code></th>
   <td><span style="background-color: rgba(212, 221, 228, 0.14902);">合并</span></td>
   <td><span style="background-color: rgba(212, 221, 228, 0.14902);">合并</span></td>
   <td>不<span style="background-color: rgba(212, 221, 228, 0.14902);">转行</span></td>
  </tr>
  <tr>
   <th><code>pre</code></th>
   <td>保留</td>
   <td><span style="background-color: rgba(212, 221, 228, 0.14902);">保留</span></td>
   <td><span style="background-color: rgba(212, 221, 228, 0.14902);">不转行</span></td>
  </tr>
  <tr>
   <th><code>pre-wrap</code></th>
   <td><span style="background-color: rgba(212, 221, 228, 0.14902);">保留</span></td>
   <td><span style="background-color: rgba(212, 221, 228, 0.14902);">保留</span></td>
   <td><span style="background-color: rgba(212, 221, 228, 0.14902);">转行</span></td>
  </tr>
  <tr>
   <th><code>pre-line</code></th>
   <td><span style="background-color: rgba(212, 221, 228, 0.14902);">保留</span></td>
   <td><span style="background-color: rgba(212, 221, 228, 0.14902);">合并</span></td>
   <td><span style="background-color: rgba(212, 221, 228, 0.14902);">转行</span></td>
  </tr>
 </tbody>
</table>

> 换行符表示`\n`
> 每一行的结束，最后都是一个空字符，可以看做空格。可以与其他的空格合并
> 填充line盒子时，必要的话会换行, 指的是按照`word-break`和`word-wrap`规则来判断。可以看做`white-space`处理了换行符，空格，`<br/>`在文字中的问题，和文字超出是否需要换行的问题。但是超出换行的具体规则由`word-break`和`word-wrap`来解决。

### word-break
`word-break`将文字分为CJK文本(指中文/日文/韩文, 其中也包括对应语言的标点符号)，和non-CJK。

* `normal` 超出时，CJK换行，non-CJK不换行，空格换行
* `break-all` 超出时，CJK换行，non-CJK换行，空格换行
* `keep-all` 超出时，CJK不换行，non-CJK不换行，空格换行
* `break-word` 在尽量保留non-CJK不换行的情况下，超出时，CJK换行，空格换行，这个属性和`word-wrap: break-word;`基本相同。

### word-wrap
* `normal` 超出时，CJK换行，non-CJK不换行，空格换行
* `break-word` 在尽量保留non-CJK不换行的情况下，超出时，CJK换行，空格换行，这个属性和`word-break: break-word;`基本相同。


超出换行的css
```
p {
  white-space: pre-wrap;
  word-break: break-all;
}
```
