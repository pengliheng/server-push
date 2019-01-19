module.exports = {
  script: `
    <script>
      function createWS() {
        const log = function(msg) {
          document.body.innerHTML = "<br/>" + document.body.innerHTML;
          document.body.innerHTML = msg + document.body.innerHTML;
        }
        const ws = new WebSocket("ws://localhost:8888");
        ws.onopen = function(){
          console.log('打开');
        }
        ws.onmessage = function(msg){
          switch (msg.data){
            case 'reload':
              console.log('now to reload');
              // ws.send('close');
              window.location.reload();
          }
        }
        ws.onclose = function(){
          // ws.close(); //关闭TCP连接
          console.log('断开连接');
        };
      };
      window.onload = createWS;
    </script>
  `
}