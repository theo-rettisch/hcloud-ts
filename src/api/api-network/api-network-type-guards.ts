/**
 * @module Network
 */
import {
  CreateNetworkResponse,
  GetAllNetworkResponse,
  GetOneNetworkResponse,
  Network,
  RemoveNetworkResponse,
  Route,
  Subnet,
  SubnetType,
  UpdateNetworkResponse
} from "./api-network-types";
import {
  isArrayOf,
  isArrayOfNumber,
  isLabels,
  isMetaResponse,
  isNumber,
  isProtection,
  isString,
  optional
} from "../../type-guards";

export const isNetwork = (value: unknown): value is Network => {
  const cast = value as Network;
  return isString(cast.created) &&
    isNumber(cast.id) &&
    isString(cast.ip_range) &&
    isLabels(cast.labels) &&
    isArrayOfNumber(cast.load_balancers) &&
    isString(cast.name) &&
    isProtection(cast.protection) &&
    isArrayOfRoute(cast.routes) &&
    isArrayOfNumber(cast.servers) &&
    isArrayOfSubnet(cast.subnets)
}

export const isArrayOfNetwork = (value: unknown): value is Array<Network> => {
  return isArrayOf<Network>(value, isNetwork);
}

export const isRoute = (value: unknown): value is Route => {
  const cast = value as Route;
  return isString(cast.destination) &&
    isString(cast.gateway)
}

export const isArrayOfRoute = (value: unknown): value is Array<Route> => {
  return isArrayOf<Route>(value, isRoute);
}

export const isSubnetType = (value: unknown): value is SubnetType => {
  return Object.values(SubnetType).includes(value as SubnetType);
}

export const isSubnet = (value: unknown): value is Subnet => {
  const cast = value as Subnet;
  return isString(cast.gateway) &&
    isString(cast.ip_range) &&
    isString(cast.network_zone) &&
    isSubnetType(cast.type)
}

export const isArrayOfSubnet = (value: unknown): value is Array<Subnet> => {
  return isArrayOf<Subnet>(value, isSubnet);
}

export const isGetAllNetworkResponse = (value: unknown): value is GetAllNetworkResponse => {
  const cast = value as GetAllNetworkResponse;
  return isArrayOfNetwork(cast.networks) && optional(cast, isMetaResponse);
}

export const isGetOneNetworkResponse = (value: unknown): value is GetOneNetworkResponse => {
  const cast = value as GetOneNetworkResponse;
  return isNetwork(cast.network);
}

export const isCreateNetworkResponse = (value: unknown): value is CreateNetworkResponse => {
  const cast = value as CreateNetworkResponse;
  return optional(cast.network, isNetwork)
}

export const isUpdateNetworkResponse = (value: unknown): value is UpdateNetworkResponse => {
  const cast = value as UpdateNetworkResponse;
  return optional(cast.network, isNetwork);
}

export const isRemoveNetworkResponse = (value: unknown): value is RemoveNetworkResponse => {
  const cast = value as RemoveNetworkResponse;
  return optional(cast.network, isNetwork);
}
