// node中三次握手的实现
const http = require('http');

const hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer(function(req, res) {
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    // res.getHeader('content-type')

    res.write('<head><meta charset="utf-8"/></head>');
    // res.charset = 'utf-8';   不行

    var htmlDiv = '<div style="width: 200px;height: 200px;background-color: #f0f;">div</div>';
    res.write('<b>亲爱的，你慢慢飞，小心前面带刺的玫瑰...</b>');
    res.write(htmlDiv);

    // 有参数=先调用 res.write(data, encoding) 之后再调用 res.end().
    res.end('<h1>Hello world!</h1>');
});


var s = server.listen(port, hostname, function() {
    console.log('Server running at http://%s:%s', hostname, port);
});
s.on('connection', (socket) => {
    console.log("socket");
});
s.on('close', () => {
    console.log('close');
});
s.on('data', (data) => {
    console.log(data);
})
// console.log(s);
