export type Dict<T> = Record<string, T>;
export type DictN<T> = Record<number, T>;

export type ArrIterator<T, TResult> = (value?: T, index?: number, collection?: T[]) => TResult;
