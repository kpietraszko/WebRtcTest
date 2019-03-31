"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var playerManager_1 = require("./playerManager");
// var wrtc = require('wrtc');
// var uuid = require('uuid/v4');
// const ws = require('ws'); // TODO: switch to uWebSockets
var uWS = require("uWebSockets.js");
// const WebSocketsConfig = require('./webSockets/config');
var config_1 = require("./webSockets/config");
// const messageHandler = require('./webSockets/messageHandler');
var messageHandler_1 = require("./webSockets/messageHandler");
uWS.App({})
    .ws('/*', {
    open: function (ws) {
        playerManager_1.addNewPlayer(ws);
    },
    message: function (ws, message, isBinary) {
        messageHandler_1.default(JSON.parse(JSON.stringify(message))); // test this, how is this even supposed to work
    },
    close: function (ws, code, message) {
        console.log("Closing WS connection. Code " + code + ". " + message);
        playerManager_1.removePlayer(function (player) { return player.webSocket === ws; });
    }
}).any("/*", function (res) {
    res.end("Only WebSockets are supported");
}).listen(config_1.default.wsServerPort, function (listenSocket) {
    if (listenSocket) {
        console.log("WS listening to port " + config_1.default.wsServerPort);
    }
});
