/**
 * @module Iso
 */
import {GetAllIsoResponse, GetOneIsoResponse, Iso, Visibility} from "./api-iso-types";
import {isArrayOf, isNumber, isString, orNull} from "../../type-guards";

export const isIso = (value: unknown): value is Iso => {
  const cast = value as Iso;
  return isNumber(cast.id) &&
    isVisibility(cast.type) &&
    isString(cast.description) &&
    orNull(cast.name, isString) &&
    orNull(cast.deprecated, isString)
}

export const isVisibility = (value: unknown): value is Visibility => {
  return Object.values(Visibility).includes(value as Visibility);
}

export const isArrayOfIso = (value: unknown): value is Array<Iso> => {
  return isArrayOf(value, isIso);
}

export const isGetOneIsoResponse = (value: unknown): value is GetOneIsoResponse => {
  const cast = value as GetOneIsoResponse;
  return isIso(cast.iso)
}

export const isGetAllIsoResponse = (value: unknown): value is GetAllIsoResponse => {
  const cast = value as GetAllIsoResponse;
  return isArrayOfIso(cast.isos);
}
