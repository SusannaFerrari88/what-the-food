// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'wtf-server';

// Port where we'll run the websocket server
var webSocketsServerPort = 1337;

// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');

/**
 * Global variables
 */
// latest 100 datas
var history = [ ];
// list of currently connected clients (users)
var clients = [ ];
// maps food and sensors 
var foods = { };

var ipAddress = {
    sensor1 : "192.168.77.199", 
    app : "192.168.77.157",
    websocketServer : "192.168.77.134"        
};

/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server
});

server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    // accept connection - you should check 'request.origin' to make sure that
    // client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var connection = request.accept(null, request.origin); 
    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;
    var userName = false;

    console.log((new Date()) + ' Connection accepted.');

    // user sent some data
    connection.on('message', function(data) {
    	console.log(data);
        var clientIp = connection.remoteAddress.replace(/::(.+):/, '');
        console.log(clientIp);

        if (userName === false) { // first data sent by user is their name
                // remember user name
                userName = clientIp;
                console.log((new Date()) + ' User is known as: ' + userName);
        }

        // if the data is coming from sensor1 
        if (clientIp == ipAddress.websocketServer) { // accept only text
            console.log((new Date()) + ' Received data from '
                        + userName + ': ' + data.utf8Data);
            
            var supplyLevel = parseInt(data.utf8Data) / 100;

            // we want to keep history of all sent datas
            var obj = {
                time: (new Date()).getTime(),
                value: supplyLevel,
                author: userName, 
                food: foods["1"]
            };
            history.push(obj);
            history = history.slice(-100);

            // broadcast data to all connected clients
            var json = JSON.stringify(obj);
            for (var i=0; i < clients.length; i++) {
                clients[i].sendUTF(json);
            }
            console.log("Sent push notification to all clients.\n" + json);
        }

        if(clientIp == ipAddress.websocketServer) {
            var request;
            try {
                request = JSON.parse(data.utf8Data);
            } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ', data.utf8Data);
                return;
            }
            if(request.sensorId && request.food) {
                foods[request.sensorId] = request.food;
                console.log("Food configuration stored. { " +request.sensorId + " : " + request.food + " } ");
            }
        }

    });

    // user disconnected
    connection.on('close', function(connection) {
        if (userName !== false) {
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            // remove user from the list of connected clients
            clients.splice(index, 1);
        }
    });

});