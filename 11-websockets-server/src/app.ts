import WebSocket, { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 3000 })

wss.on('connection', function connection (ws) {
  ws.on('error', console.error)

  ws.on('message', function message (data) {
    console.log('received: %s', data)
    const payload = JSON.stringify({
      type: 'custom-type',
      message: data.toString().toUpperCase()
    })

    wss.clients.forEach(function each (client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(payload, { binary: false })
      }
    })
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})
