// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";

// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'wtf-server';

// Port where we'll run the websocket server
var webSocketsServerPort = 1338;

// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');
var lidl = require('./lidl');

/**
 * Global variables
 */
// latest 100 datas
var history = [ ];
// list of currently connected clients (users)
var clients = [ ];
// maps food and sensors 
var foods = [
    {
        sensorId : "1", 
        food : "Reis",
        lastValue : 0
    }, 
    {
        sensorId : "2", 
        food : "Nudeln",
        lastValue : 0.8
    }
];

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

    if(foods[0].lastValue) {
        sendSupplyLevelValues();
    }
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

        if(data.type == 'utf8') {
            console.log((new Date()) + ' Received data from '
                + userName + ': ' + data.utf8Data);

            try {
                request = JSON.parse(data.utf8Data);
            } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ', data.utf8Data);
                return;
            }

            // if it's a number
            var supplyLevel = parseInt(request) / 100;
            if(supplyLevel) {
                foods[0].lastValue = supplyLevel;
                sendSupplyLevelValues();
            } 
            
            if(request.sensorId && request.food) {
                foods.forEach(function(item) {
                    if(item.sensorId == request.sensorId) {
                        item.food = request.food;
                    }
                });
                console.log("Food configuration stored. { " +request.sensorId + " : " + request.food + " } ");
            }

            if(request.product) {
                var obj = {
                    time: (new Date()).getTime(),
                    product: request.product,
                    results: lidl.products(request.product)
                };
                broadcastClients(obj);
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

function sendSupplyLevelValues() {
    var obj = {
        time: (new Date()).getTime(),
        values: foods
    };
    broadcastClients(obj);   
}

function broadcastClients(data) {

    history.push(data);
    history = history.slice(-100);
    // broadcast data to all connected clients
    var json = JSON.stringify(data);
    for (var i=0; i < clients.length; i++) {
        clients[i].sendUTF(json);
    }
    console.log("Sent push notification to all clients.\n" + json);
}