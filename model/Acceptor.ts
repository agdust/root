import Rejection from './Rejection';
import Message from './Message';
import Client from './Client';

export class Abort {
  constructor() {}
}

class Unacceptable extends Error {
  constructor(type: string) {
    super(`Cannot accept message of type ${type}`);
  }
}

type Handler =
  string
  | ((this: Client, data: any, threadId: string) => any)
  | { type: string, handler: (this: Client, data: any, threadId: string) => any }

const matches = ({ type }: Message) => (handler: Handler) => {
  switch (typeof handler) {
    case 'string':
      return handler === type;
    case 'function':
      return handler.name === type;
    case 'object':
      return handler.type === type;
  }
  throw new Error('Invalid handler');
};

/**
 * A class for accepting messages between client and server
 */
export class Acceptor {
  constructor(
    public spec: Handler[],
  ) {}

  accepts(msg: Message) {
    return this.spec.some(matches(msg));
  }

  async * accept(thisArg: Client, msg: Message) {
    for (const handler of this.spec) {
      if (!matches(msg)(handler)) { continue; }

      switch (typeof handler) {
        case 'string':
          return msg.data;
        case 'function':
          return yield * handler.call(thisArg, msg.data, msg.threadId);
        case 'object':
          return yield * handler.handler.call(thisArg, msg.data, msg.threadId);
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

let rejectionHandler = (rejection: any) => console.error(rejection);

export function setRejectionHandler(handler: (rejection: any) => void) {
  rejectionHandler = handler || (rejection => console.error(rejection));
}

/**
 * Main method for client-server communication
 * It takes all methods, and the name of message it should pass after (or take?)
 *
 * Example:
 * accept.call(this, fooFunc, barFunc, 'importantUpdate');
 */
export async function * accept(this: Client, ...spec: Handler[]) {
  const acceptor = new Acceptor(spec);
  for (; ;) {
    try {
      return await (yield * acceptor.accept(this, yield acceptor));
    } catch (e) {
      if (e instanceof Rejection) {
        if (e.remote) {
          console.warn('Rejected:', e);
          // remote rejections need to be reported to the user
          rejectionHandler(e);
        } else if (e.threadId) {
          console.log('Rejecting:', e);
          // local rejections with threadId need to be reported to the remote
          this.reject(e.threadId, e.message);
        }
        continue;
      }
      throw e;
    }
  }
}
