import { get, Store } from 'svelte/store';

/**
 * A functional-style wrapper for writing like this:
 *   borrow(game)(game => game.doSomething)
 *
 * Instead of writing like this:
 *   (game => game.doSomething)(game)
 *
 */
export default function borrow<T>(store: Store<T>): <U> (handler: (value: T) => U) => U {
  return handler => handler(get(store));
}
