"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var playerManager_1 = require("../playerManager");
var handlers = {
    OFFER_ANSWER: function (payload) {
        playerManager_1.handleOfferAnswer(payload.playerId, payload.answer);
    }
};
exports.default = (function (message) {
    if (!handlers[message.type]) {
        console.error("Unhandled WS message type");
    }
    var handler = handlers[message.type];
    handler(message.payload);
});
