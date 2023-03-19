/**
 * @module Datacenter
 */
import {Datacenter, DatacenterLocation, DatacenterServerType, GetAllDatacenterResponse, GetOneDatacenterResponse} from "./api-datacenter-types";
import {isArrayOf, isArrayOfNumber, isNumber, isString} from "../../type-guards";

export const isDatacenter = (value: unknown): value is Datacenter => {
  const cast = value as Datacenter;
  return isNumber(cast.id) &&
    isString(cast.name) &&
    isString(cast.description) &&
    isDatacenterLocation(cast.location) &&
    isDatacenterServerType(cast.server_types)
}

export const isDatacenterLocation = (value: unknown): value is DatacenterLocation => {
  const cast = value as DatacenterLocation;
  return isNumber(cast.id) &&
    isString(cast.name) &&
    isString(cast.city) &&
    isString(cast.description) &&
    isString(cast.country) &&
    isNumber(cast.latitude) &&
    isNumber(cast.longitude) &&
    isString(cast.network_zone)
}

export const isDatacenterServerType = (value: unknown): value is DatacenterServerType => {
  const cast = value as DatacenterServerType;
  return isArrayOfNumber(cast.available) &&
    isArrayOfNumber(cast.supported) &&
    isArrayOfNumber(cast.available_for_migration)
}

export const isArrayOfDatacenter = (value: unknown): value is Array<Datacenter> => {
  return isArrayOf<Datacenter>(value, isDatacenter);
}

export const isGetAllDatacenterResponse = (value: unknown): value is GetAllDatacenterResponse => {
  const cast = value as GetAllDatacenterResponse;
  return isArrayOfDatacenter(cast.datacenters) &&
    isNumber(cast.recommendation);
}

export const isGetOneDatacenterResponse = (value: unknown): value is GetOneDatacenterResponse => {
  const cast = value as GetOneDatacenterResponse;
  return isDatacenter(cast.datacenter);
}
