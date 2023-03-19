/**
 * @module Common
 */
export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
export type Typeguard<T> = (value: unknown) => value is T;

export type OrNull<T> = T | null;

export enum Status {
  INITIALIZING = 'initializing',
  STARTING = 'starting',
  RUNNING = 'running',
  STOPPING = 'stopping',
  OFF = 'off',
  DELETING = 'deleting',
  REBUILDING = 'rebuilding',
  MIGRATING = 'migrating',
  UNKNOWN = 'unknown'
}

export enum Sort {
  ID = 'id',
  ID_ASC = 'id:asc',
  ID_DESC = 'id:desc',
  NAME = 'name',
  NAME_ASC = 'name:asc',
  NAME_DESC = 'name:desc',
  CREATED = 'created',
  CREATED_ASC = 'created:asc',
  CREATED_DESC = 'created:desc'
}

export type Protection = {
  delete: boolean;
}

export type Pagination = {
  last_page: OrNull<number>;
  next_page: OrNull<number>;
  page: number;
  per_page: number;
  previous_page: OrNull<number>;
  total_entries: OrNull<number>;
}

export type Meta = {
  pagination: Pagination
}

export type MetaResponse = {
  meta: Meta;
}

export type Pagable = {
  page: number,
  per_page: number
}

export type PagableRequest = {
  pagination: Pagable
}

export type Labels = Record<string, string>;
