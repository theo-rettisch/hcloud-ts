/**
 * @module Common
 */
import {
  Labels,
  Meta,
  MetaResponse,
  Pagable,
  PagableRequest,
  Pagination,
  Protection,
  Sort,
  Status,
  Typeguard
} from "./types";

export type Diff<T, U> = T extends U ? never : T;

export type Predicate<I, O extends I> = (i: I) => i is O;

const not = <I, O extends I>(p: Predicate<I, O>) => (i: I): i is (Diff<I, O>) => !p(i);

export const isNull = <I>(i: I | null): i is null => i === null;

export const isUndefined = <I>(i: I | undefined): i is undefined => i === undefined;

const isNotNull = not(isNull);
export const isNotUndefined = not(isUndefined);

export const isString = (value: unknown): value is string => typeof value === 'string';
export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isBool = (value: unknown): value is boolean => typeof value === 'boolean';

export const or = <X, Y>(validator1: Typeguard<X>, validator2: Typeguard<Y>): (value: unknown) => value is X | Y => {
  return (value: unknown): value is X | Y => validator1(value) || validator2(value);
}

export const orNull = <T>(value: unknown, validator: Typeguard<T>): value is T | null => {
  return isNull(value) || validator(value);
}

export const optional = <T>(value: unknown, validator: Typeguard<T>): value is T | undefined => {
  return isUndefined(value) || validator(value);
}

export const isArrayOf = <T>(obj: unknown, validator: Typeguard<T>): obj is Array<T> => {
  return Array.isArray(obj) &&
    obj.length === obj.filter(validator).length
}

export const isArrayOfNumber = (value: unknown): value is Array<number> => {
  return isArrayOf<number>(value, isNumber);
}

export const isArrayOfString = (value: unknown): value is Array<string> => {
  return isArrayOf<string>(value, isString);
}

export const isProtection = (value: unknown): value is Protection => {
  const cast = value as Protection;
  return isBool(cast.delete);
}

export const isStatus = (value: unknown): value is Status => {
  return Object.values(Status).includes(value as Status);
}

export const isSort = (value: unknown): value is Sort => {
  return Object.values(Sort).includes(value as Sort);
}

export const isArrayOfSort = (value: unknown): value is Array<Sort> => {
  return isArrayOf<Sort>(value, isSort);
}

export const isRecord = (value: unknown): value is Record<string, string> => {
  return typeof value === 'object' && isNotNull(value) && Object.values(value as Record<string, string>).every(isString);
}

export const isLabels: (value: unknown) => value is Labels = isRecord;

export const isMetaResponse = (value: unknown): value is MetaResponse => {
  const cast = value as MetaResponse;
  return isMeta(cast.meta);
}

const isMeta = (value: unknown): value is Meta => {
  const cast = value as Meta;
  return isPagination(cast.pagination);
}

const isPagination = (value: unknown): value is Pagination => {
  const cast = value as Pagination;
  return isNumber(cast.page) &&
    isNumber(cast.per_page) &&
    orNull(cast.last_page, isNumber) &&
    orNull(cast.next_page, isNumber) &&
    orNull(cast.previous_page, isNumber) &&
    orNull(cast.total_entries, isNumber)
}

const isPagable = (value: unknown): value is Pagable => {
  const cast = value as Pagable;
  return isNotUndefined(cast) && isNumber(cast.page) && isNumber(cast.per_page)
}

export const isPagableRequest = (value: unknown): value is PagableRequest => {
  const cast = value as PagableRequest;
  return isPagable(cast?.pagination)
}
