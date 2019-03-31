import { addNewPlayer, removePlayer } from './playerManager';
// var Peer = require('simple-peer')
import * as Peer from "simple-peer";
// var wrtc = require('wrtc');
// var uuid = require('uuid/v4');
// const ws = require('ws'); // TODO: switch to uWebSockets
import * as uWS from "uWebSockets.js";
// const WebSocketsConfig = require('./webSockets/config');
import WebSocketsConfig from "./webSockets/config";
// const messageHandler = require('./webSockets/messageHandler');
import messageHandler from "./webSockets/messageHandler";

uWS.App({})
	.ws('/*',
		{
			open: ws => {
				addNewPlayer(ws);
			},
			message: (ws, message, isBinary) => {
				messageHandler(JSON.parse(JSON.stringify(message))); // test this, how is this even supposed to work
			},
			close: (ws, code, message) => {
				console.log(`Closing WS connection. Code ${code}. ${message}`);
				removePlayer(player => player.webSocket === ws);
			}
		}
	).any("/*", res => {
		res.end("Only WebSockets are supported");
	}).listen(WebSocketsConfig.wsServerPort, listenSocket => {
		if (listenSocket) {
			console.log(`WS listening to port ${WebSocketsConfig.wsServerPort}`);
		}
	})