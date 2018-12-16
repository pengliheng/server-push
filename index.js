const http = require('http');
const fs = require('fs');
const chalk = require('chalk');
let mod = require('yargs').argv
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8888 });


// 打开连接
var c = require('child_process')
 
c.exec("open http://localhost:8080")


const dist = mod._[0]
// console.log(
//   chalk.red(dist)
// );


const wsScript = require('./client');
const srv = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  // 同步阻塞代码
  let html = fs.readFileSync(dist,'utf-8')
  html+=wsScript.script;
  res.end(html);
});
srv.listen(8080,()=>{
  console.log('success listen port 8080');
})


let isWatch = true;
wss.on('connection', function connection(ws) {
  console.log('连接');
  if(isWatch){
    isWatch = false;
    fs.watch(dist, function (event, filename) {
      console.log(filename , '被修改');
      wss.clients.forEach(client=>{
        console.log("wss",client.readyState);
        if(client.readyState===1){
          client.send('reload')
        }
      })
    });
  }
  ws.on('message', function incoming(msg) {
    console.log('received: %s', msg);
  });
  ws.on('close', function () {
    console.log('关闭');
    ws.close()
  });
  ws.on('error', function error(event) {
    console.log('错误');
    // console.log(event.err + '  state: ' + ws.readyState);
  });
});