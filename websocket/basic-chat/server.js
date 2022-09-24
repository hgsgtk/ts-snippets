// npm install ws
// npm install node-uuid

// https://stackoverflow.com/questions/43311238/javascript-referenceerror-websocket-is-not-defined
const WebSocket = require('ws');
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8181})
var uuid = require('node-uuid')

var clients = [];

function wsSend(type, client_uuid, nickname, message) {
    for (var i = 0; i < clients.length; i++) {
        var clientSocket = clients[i].ws;
        if (clientSocket.readyState === WebSocket.OPEN) {
            clientSocket.send(JSON.stringify({
                "type": type,
                "id": client_uuid,
                "nickname": nickname,
                "message": message,
            }));
        }
    }
}

var clientIndex = 1;

wss.on('connection', function(ws) {
    var client_uuid = uuid.v4()
    var nickname = "AnonymousUser" + clientIndex;
    clientIndex += 1;
    clients.push({"id": client_uuid, "ws": ws, "nick_name": nickname})
    console.log('client [%s] connected', client_uuid)

    var connect_message = nickname + " has connected";
    wsSend("notification", client_uuid, nickname, connect_message);

    ws.on('message', function(message) {
        if (message.indexOf('/nick') == 0) {
            var nickname_array = message.split(' ')
            if (nickname_array.length >= 2) {
                var old_nickname = nickname;
                nickname = nickname_array[1];
                wsSend('nick_update', client_uuid, nickname, "Client " + old_nickname + " changed to " + nickname);
            }
        } else {
            // The type of message is prototype.
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toString
            wsSend('message', client_uuid, nickname, message.toString());
        }
    });

    var closeSocket  = function(customMessage) {
        for (var i=0; i<clients.length; i++) {
            if (clients[i].id == client_uuid) {
                var disconnect_message;
                if (customMessage) {
                    disconnect_message = customMessage;
                } else {
                    disconnect_message = nickname + " has disconnected";
                }
                wsSend("notification", client_uuid, nickname, disconnect_message);
                clients.splice(i, 1)
            }
        }
    }

    ws.on('close', function() {
        closeSocket();
    })

    process.on("SIGINT", function() {
        console.log("Closing things")
        closeSocket("Server has disconnected");
        process.exit();
    });
})