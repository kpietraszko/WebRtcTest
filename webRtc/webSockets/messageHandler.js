const handlers = {
	OFFER_ANSWER: (...args) => {
		const peer = args[1];
		const message = JSON.parse(args[0]);
		peer.signal(message.payload);
	}
}

module.exports = (...args) => {
	if (!handlers[args[0].type]){
		console.error("Unhandled WS message type");
	}
	var handler = handlers[JSON.parse(args[0]).type];
	handler(...args);
}