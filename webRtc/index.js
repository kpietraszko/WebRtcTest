var Peer = require('simple-peer')
var wrtc = require('wrtc')
var uuid = require('uuid/v4');
const WebSocket = require('ws');
const WebSocketsConfig = require('./webSockets/config');
const messageHandler = require('./webSockets/messageHandler');

const wss = new WebSocket.Server({ port: WebSocketsConfig.wsServerPort });

const peers = {};

var counter = 0;

wss.on('connection', function connection(ws) {
	var peer = new Peer({
		initiator: true, wrtc: wrtc, trickle: false,
		channelConfig: {
			ordered: false, // unordered
			maxRetransmits: 0 // unreliable
		}
	});
	ws.on('message', function incoming(message) {
		console.log('[WS] received: %s', message);
		messageHandler(message, peer);
	});
	ws.onerror = error => console.error(error);

	var id = uuid();
	peers[id] = peer;
	peer.on('signal', function (data) { // called when creating new Peer
		// send offer to newly connected client
		ws.send(JSON.stringify(data));
		console.log("on signal");
	});
	peer.on('connect', function () {
		// wait for 'connect' event before using the data channel
		console.log("WebRTC connection established");
		setInterval(() =>
			peer.send(`hey peer #${id}, updated 2019-03-10 11:47, ${counter++}`),
			1000);
	})
});