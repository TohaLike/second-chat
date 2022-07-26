const WedSocket = require('ws');

const server = new WedSocket.Server({ port: 3000 });

server.on('connection', (ws) => {
    ws.on('message', (message) => {
        server.clients.forEach((client) => {
           if (client.readyState === ws.OPEN){
            client.send(message.toString('utf-8'));
           };
        });
    });
    ws.send(JSON.stringify({login:"SERVER", text:'Hello'}))
});
