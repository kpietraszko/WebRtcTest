import { Player } from './playerManager';
import * as Peer from "simple-peer";
import * as uuid from "uuid/v4";
import * as uWS from "uWebSockets.js";
import * as wrtc from "wrtc";
import * as NanoTimer from "nanotimer";
import wait from './utils/wait';

export type Player = {
	id: string,
	unreliablePeer: Peer.Instance,
	unreliablePeerConnected : boolean,
	webSocket: uWS.WebSocket,
}

const players: Player[] = [];

export const addNewPlayer = (ws: uWS.WebSocket) => {
	const unreliablePeer = new Peer({
		initiator: true, wrtc: wrtc, trickle: false,
		channelConfig: {
			ordered: false, // unordered
			maxRetransmits: 0 // unreliable
		}
	});
	
	const newPlayer: Player = {
		id: uuid(),
		unreliablePeer,
		webSocket: ws,
		unreliablePeerConnected: false
	};

	unreliablePeer.on("signal", data => sendOfferToNewPlayer(ws, data));
	unreliablePeer.on("connect", () => onPeerConnected(newPlayer));
	players.push(newPlayer);
}

export const removePlayer = (predicate: (p: Player) => boolean) => {
	const playerIndex = players.indexOf(getPlayerBy(predicate));
	players.splice(playerIndex, 1);
}

const sendOfferToNewPlayer = (ws: uWS.WebSocket, data: any) => {
	ws.send(JSON.stringify(data), false, false);
}

export const handleOfferAnswer = (playerId: string, answer: any) => {
	const player = getPlayerBy(p => p.id === playerId);
	player.unreliablePeer.signal(answer);
}

const getPlayerBy = (predicate: (p: Player) => boolean): Player => {
	var player = players.find(predicate);
	if (player == undefined){
		throw new Error("Player not found");
	}
	return player;
}

const onPeerConnected = (player: Player) => {
	player.unreliablePeerConnected = true;
	console.log("WebRTC connection established");
	const testTimer = new NanoTimer();
	sendTestDatesEvery(player, 17);
}

const sendTestDatesEvery = async (player: Player, interval: number) => {
	while (player.unreliablePeerConnected){
		player.unreliablePeer.send(Date.now().toLocaleString());
		await wait(interval);
	}
}