import { ArrIterator, Dict, DictN } from '../../types/common';

/**
 * Creates object by any value from array of objects
 */
export function keyBy<T extends string>(arr: T[]): Record<T, true>;
export function keyBy(arr: number[]): DictN<true>;
export function keyBy<TTransform>(arr: string[], key?: null, transform?: ArrIterator<string, TTransform> | TTransform): Dict<TTransform>;
export function keyBy<TTransform>(arr: number[], key?: null, transform?: ArrIterator<number, TTransform> | TTransform): DictN<TTransform>;
export function keyBy<T extends Dict<any>>(arr: T[], key: keyof T | ArrIterator<T, keyof T>): Dict<T>;
export function keyBy<T extends Dict<any>, TTransform>(arr: T[], key: keyof T | ArrIterator<T, keyof T>, transform: ArrIterator<T, TTransform>): Dict<TTransform>;
export function keyBy<T>(arr: any[], key?: T extends Dict<T> ? keyof T | ArrIterator<T, keyof T> : null, transform: any = true): Dict<any> {
  let map: Dict<any> = {};
  let isKeyNotString = typeof key !== 'string';
  let isKeyFunction = typeof key === 'function';
  let isTransformFunction = typeof transform === 'function';
  let i = -1;
  let len = arr.length;
  let item;

  if (isKeyNotString && !isKeyFunction) {
    while (++i < len) {
      item = arr[i];
      map[item] = isTransformFunction ? transform(item, i, arr) : transform;
    }
  } else if (isKeyFunction) {
    while (++i < len) {
      item = arr[i];
      // @ts-ignore
      map[key(item, i, arr)] = isTransformFunction ? transform(item, i, arr) : item;
    }
  } else {
    while (++i < len) {
      item = arr[i];
      // @ts-ignore
      map[item[key]] = isTransformFunction ? transform(item, i, arr) : item;
    }
  }

  return map;
}
