/**
 * @module Iso
 */
import {PagableRequest} from "../../types";

export enum Visibility {
  PUBLIC = 'public', PRIVATE = 'private'
}

export type Iso = {
  id: number;
  name: string | null;
  type: Visibility;
  deprecated: string | null;
  description: string;
}

export type GetOneIsoResponse = { iso: Iso };
export type GetAllIsoResponse = { isos: Array<Iso> };
export type GetAllIsoRequest = { name: string } & PagableRequest;
