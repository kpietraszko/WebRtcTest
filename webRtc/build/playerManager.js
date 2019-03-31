"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Peer = require("simple-peer");
var uuid = require("uuid/v4");
var wrtc = require("wrtc");
var NanoTimer = require("nanotimer");
var wait_1 = require("./utils/wait");
var players = [];
exports.addNewPlayer = function (ws) {
    var unreliablePeer = new Peer({
        initiator: true, wrtc: wrtc, trickle: false,
        channelConfig: {
            ordered: false,
            maxRetransmits: 0 // unreliable
        }
    });
    var newPlayer = {
        id: uuid(),
        unreliablePeer: unreliablePeer,
        webSocket: ws,
        unreliablePeerConnected: false
    };
    unreliablePeer.on("signal", function (data) { return sendOfferToNewPlayer(ws, data); });
    unreliablePeer.on("connect", function () { return onPeerConnected(newPlayer); });
    players.push(newPlayer);
};
exports.removePlayer = function (predicate) {
    var playerIndex = players.indexOf(getPlayerBy(predicate));
    players.splice(playerIndex, 1);
};
var sendOfferToNewPlayer = function (ws, data) {
    ws.send(JSON.stringify(data), false, false);
};
exports.handleOfferAnswer = function (playerId, answer) {
    var player = getPlayerBy(function (p) { return p.id === playerId; });
    player.unreliablePeer.signal(answer);
};
var getPlayerBy = function (predicate) {
    var player = players.find(predicate);
    if (player == undefined) {
        throw new Error("Player not found");
    }
    return player;
};
var onPeerConnected = function (player) {
    player.unreliablePeerConnected = true;
    console.log("WebRTC connection established");
    var testTimer = new NanoTimer();
    sendTestDatesEvery(player, 17);
};
var sendTestDatesEvery = function (player, interval) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!player.unreliablePeerConnected) return [3 /*break*/, 2];
                player.unreliablePeer.send(Date.now().toLocaleString());
                return [4 /*yield*/, wait_1.default(interval)];
            case 1:
                _a.sent();
                return [3 /*break*/, 0];
            case 2: return [2 /*return*/];
        }
    });
}); };
