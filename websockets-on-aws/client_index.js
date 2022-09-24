// https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
// https://github.com/ryanmurakami/websockets-on-aws/blob/bd92efb71db409f4efd318fadd91a2968837ba3c/src/public/index.js
const socket = new WebSocket('wss://4jeqkvnloh.execute-api.ap-northeast-1.amazonaws.com/production')

socket.addEventListener('open', e => {
  console.log('WebSocket is connected')
})

socket.addEventListener('close', e => console.log('WebSocket is closed'))

socket.addEventListener('error', e => console.error('WebSocket is in error', e))

socket.addEventListener('message', e => {
  // console.log('WebSocket received a message:', e)
  console.log('Your answer is:', JSON.parse(e.data).message)
})

window.ask = function (msg) {
  const payload = {
    action: 'message',
    msg
  }
  socket.send(JSON.stringify(payload))
}