"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const v4_1 = tslib_1.__importDefault(require("uuid/v4"));
const Message_1 = tslib_1.__importDefault(require("./Message"));
const Rejection_1 = tslib_1.__importDefault(require("./Rejection"));
class Closed {
}
class Timeout {
}
class Client {
    constructor(id, socket) {
        this.id = id;
        this.socket = socket;
        this.callbacks = new Map();
        this.receivedMessages = [];
        this.watchers = [];
        this.socket.addEventListener('message', ({ data }) => {
            try {
                const message = new Message_1.default(data);
                if (message.type === 'reject' || message.type === 'error') {
                    const error = message.type === 'reject' ? new Rejection_1.default(message.threadId, message.data, true) : new Error(message.data);
                    const [, callback] = this.callbacks.get(message.threadId) || [];
                    if (callback) {
                        console.log(`Response received (${message.threadId}): ${message.type}`);
                        callback(error);
                    }
                    else {
                        this.throw(error);
                    }
                }
                else {
                    const [callback] = this.callbacks.get(message.threadId) || [];
                    if (callback) {
                        console.log(`Response received (${message.threadId}): ${message.type}`);
                        callback(message.data);
                    }
                    else {
                        this.notify(message);
                    }
                }
            }
            catch (e) {
                console.error(data, e);
            }
        });
        this.socket.addEventListener('close', () => this.throw(new Closed));
        this.socket.addEventListener('error', (error) => this.throw(error));
    }
    send(type, data, timeout = 10000) {
        const threadId = v4_1.default();
        let callbacks;
        let timer;
        const promise = new Promise((resolve, reject) => {
            callbacks = [
                value => {
                    this.callbacks.delete(threadId);
                    clearTimeout(timer);
                    resolve(value);
                },
                error => {
                    this.callbacks.delete(threadId);
                    clearTimeout(timer);
                    reject(error);
                },
            ];
            this.socket.send(JSON.stringify({
                threadId,
                type,
                data,
            }));
        });
        return {
            then: async (...args) => {
                timer = setTimeout(() => {
                    const [, reject] = this.callbacks.get(threadId);
                    this.callbacks.delete(threadId);
                    reject(new Timeout);
                }, timeout);
                this.callbacks.set(threadId, callbacks);
                return promise.then(...args);
            },
        };
    }
    respond(threadId, type, data) {
        console.log(`Responding (${threadId}): ${type}`);
        this.socket.send(JSON.stringify({
            threadId,
            type: type || 'response',
            data,
        }));
    }
    reject(threadId, reason) {
        this.socket.send(JSON.stringify({
            threadId,
            type: 'reject',
            data: reason,
        }));
    }
    throw(error) {
        const { watchers } = this;
        this.watchers = [];
        watchers.forEach(([, reject]) => reject(error));
    }
    notify(message) {
        console.log(`${this.username}: ${message.type} (${message.threadId}):`, message.data);
        const { watchers } = this;
        if (this.watchers.length && !this.receivedMessages.length) {
            this.watchers = [];
            watchers.forEach(([resolve]) => resolve(message));
        }
        else {
            this.receivedMessages.push(message);
        }
    }
    async *[Symbol.asyncIterator]() {
        for (;;) {
            try {
                if (this.receivedMessages.length) {
                    const [first, ...rest] = this.receivedMessages;
                    this.receivedMessages = rest;
                    yield first;
                }
                else {
                    yield await new Promise((resolve, reject) => this.watchers.push([resolve, reject]));
                }
            }
            catch (e) {
                console.error(e);
                if (e instanceof Closed) {
                    break;
                }
                else {
                    throw e;
                }
            }
        }
    }
}
exports.default = Client;
