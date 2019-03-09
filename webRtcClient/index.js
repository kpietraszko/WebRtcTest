const url = 'ws://vps656802.ovh.net:7777';
const connection = new WebSocket(url);

var peer = new SimplePeer({
	channelConfig: {
		ordered: false, // unordered
		maxRetransmits: 0 // unreliable
	}
});

connection.onopen = () => {
	console.log("WS connection opened");
	peer.on('data', function incoming(data) {
		console.log("Got WebRTC data", data.toString());
	});

	peer.on('signal', function (data) {
		console.log("Offer answer", data);
		connection.send(JSON.stringify({ type: "OFFER_ANSWER", payload: JSON.stringify(data)}));
	});
}

connection.onerror = error => {
	console.log(`Websockets error: ${error}`);
}

connection.onmessage = message => {
	console.log("I received a message", message);
	console.log(JSON.parse(message.data));
	peer.signal(JSON.parse(message.data));
}

