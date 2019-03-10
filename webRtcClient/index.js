const url = 'ws://147.135.211.159:7777';
const connection = new WebSocket(url);

var peer = new SimplePeer({
	channelConfig: {
		ordered: false, // unordered
		maxRetransmits: 0 // unreliable
	}
});

var fastBoi;

connection.onopen = () => {
	fastBoi = document.querySelector("#fastBoi");
	console.log("WS connection opened");
	peer.on('data', function incoming(data) {
		console.log("Got WebRTC data", data.toString());
		const moveRight = Math.floor(data / ((screen.width-50)/2)) % 2 == 0;
		console.log(moveRight);
		const positionIfRight = data % screen.width;
		const position = moveRight ? positionIfRight : (screen.width - positionIfRight); 
		fastBoi.style["transform"] = `translate(${position*2}px)`;
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

