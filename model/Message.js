"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const v4_1 = tslib_1.__importDefault(require("uuid/v4"));
class Message {
    static direct(type, data) {
        const msg = new Message();
        msg.threadId = v4_1.default();
        msg.type = type;
        msg.data = data;
        return msg;
    }
    constructor(rawMsg) {
        if (rawMsg) {
            const { threadId, type, data } = JSON.parse(rawMsg);
            this.threadId = threadId;
            this.type = type;
            this.data = data;
        }
    }
    toString() {
        return `${this.type} (${this.threadId}): ${JSON.stringify(this.data)}`;
    }
}
exports.default = Message;
