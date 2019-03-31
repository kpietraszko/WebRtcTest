import { handleOfferAnswer } from "../playerManager";

export type Message = {
	type: string,
	payload: any
}
export type OfferAnswer = {
	playerId: string,
	answer: any
}

const handlers: { [type: string]: (payload: any) => any } = {
	OFFER_ANSWER: (payload: OfferAnswer): any => {
		handleOfferAnswer(payload.playerId, payload.answer);
	}
}

export default (message: Message) => {
	if (!handlers[message.type]){
		console.error("Unhandled WS message type");
	}
	var handler = handlers[message.type];
	handler(message.payload);
}