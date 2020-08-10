"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Rejection_1 = tslib_1.__importDefault(require("./Rejection"));
class Abort {
    constructor() { }
}
exports.Abort = Abort;
class Unacceptable extends Error {
    constructor(type) {
        super(`Cannot accept message of type ${type}`);
    }
}
const matches = ({ type }) => (handler) => {
    if (typeof handler === 'string') {
        return handler === type;
    }
    else if (typeof handler === 'function') {
        return handler.name === type;
    }
    else if (typeof handler === 'object') {
        return handler.type === type;
    }
    throw new Error('Invalid handler');
};
class Acceptor {
    constructor(spec) {
        this.spec = spec;
    }
    accepts(msg) {
        return this.spec.some(matches(msg));
    }
    async *accept(thisArg, msg) {
        for (const handler of this.spec) {
            if (!matches(msg)(handler)) {
                return;
            }
            switch (typeof handler) {
                case 'string':
                    return msg.data;
                case 'function':
                    return yield* handler.call(thisArg, msg.data, msg.threadId);
                case 'object':
                    return yield* handler.handler.call(thisArg, msg.data, msg.threadId);
            }
        }
        throw new Unacceptable(msg.type);
    }
    description() {
        const description = [];
        for (const handler of this.spec) {
            switch (typeof handler) {
                case 'string':
                    description.push(`${handler}`);
                    break;
                case 'function':
                    description.push(`${handler.name}`);
                    break;
                case 'object':
                    description.push(`${handler.type}`);
                    break;
            }
        }
        return description.join(', ');
    }
}
exports.Acceptor = Acceptor;
let rejectionHandler = (rejection) => console.error(rejection);
function setRejectionHandler(handler) {
    rejectionHandler = handler || (rejection => console.error(rejection));
}
exports.setRejectionHandler = setRejectionHandler;
async function* accept(...spec) {
    const acceptor = new Acceptor(spec);
    for (;;) {
        try {
            return await (yield* acceptor.accept(this, yield acceptor));
        }
        catch (e) {
            if (e instanceof Rejection_1.default) {
                if (e.remote) {
                    console.warn('Rejected:', e);
                    rejectionHandler(e);
                }
                else if (e.threadId) {
                    console.log('Rejecting:', e);
                    this.reject(e.threadId, e.message);
                }
                continue;
            }
            throw e;
        }
    }
}
exports.accept = accept;
