"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rejection {
    constructor(threadId = '', message = null, remote = false) {
        this.threadId = threadId;
        this.message = message;
        this.remote = remote;
    }
    localizedMessage(locFn) {
        if (this.message) {
            if (typeof this.message === 'string') {
                return locFn(this.message);
            }
            else {
                const { key, params } = this.message;
                return locFn(key, params);
            }
        }
        return null;
    }
}
exports.default = Rejection;
