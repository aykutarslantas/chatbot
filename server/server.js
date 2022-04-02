const app = require('express')();
const server = require('http').createServer(app)
const io = require('socket.io')(server);

var send = {
    "server": "I didn't understand what you said. I am constantly updating. You can try these.<br><small style='color: green'><strong>[Hello]</strong> OR <strong>[I need help on payment]</strong></small>",
    "user": ""
}

io.on('connection', (socket) => {
    socket.on('chat', data => {
        if (data.message === "Hello") {
            send.server = "Hi, Welcome to our company, we are here to assist you. Please contact us on: test@test.com"
        } else if (data.message === "I need help on payment") {
            send.server = "Hi, we are here to assist you Please contact us on: test@test.com";
        }
        send.user = "<div style='text-align: right;padding-right: 20px'>" + data.message + "</div>";
        io.sockets.emit('chat', send)
    })
})

var port = process.env.PORT || 3001;

server.listen(port, function () {
    console.log('listening in http://localhost:' + port)
})