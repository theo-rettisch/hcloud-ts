/**
 * @module Server
 */
import {
  CpuType,
  DNSPtr,
  FirewallStatus,
  GetAllServerResponse,
  GetOneServerResponse,
  IP,
  IPv4,
  IPv6,
  NetworkFirewall,
  Price,
  Server,
  ServerPrivateNetwork,
  ServerProtection,
  ServerPublicNetwork,
  ServerType,
  ServerTypePrice,
  StorageType
} from "./api-server-types";
import {isCloudImage} from "../api-image/api-image-type-guards";
import {isIso} from "../api-iso/api-iso-type-guards";
import {isDatacenter} from "../api-datacenter/api-datacenter-type-guards";
import {isPlacementGroup} from "../api-placement-group/api-placement-group-type-guards";
import {
  isArrayOf,
  isArrayOfNumber,
  isArrayOfString,
  isBool,
  isLabels,
  isNumber,
  isProtection,
  isStatus,
  isString,
  orNull
} from "../../type-guards";

export const isServer = (value: unknown): value is Server => {
  const cast = value as Server;
  return orNull(cast.backup_window, isString) &&
    isString(cast.created) &&
    isDatacenter(cast.datacenter) &&
    isNumber(cast.id) &&
    isCloudImage(cast.image) &&
    orNull(cast.included_traffic, isNumber) &&
    orNull(cast.ingoing_traffic, isNumber) &&
    isIso(cast.iso) &&
    isLabels(cast.labels) &&
    isArrayOfNumber(cast.load_balancers) &&
    isBool(cast.locked) &&
    isString(cast.name) &&
    orNull(cast.outgoing_traffic, isNumber) &&
    isPlacementGroup(cast.placement_group) &&
    isNumber(cast.primary_disk_size) &&
    isArrayOfServerPrivateNetwork(cast.private_net) &&
    isServerProtection(cast.protection) &&
    isArrayOfServerPublicNetwork(cast.public_net) &&
    isBool(cast.rescue_enabled) &&
    isServerType(cast.server_type) &&
    isStatus(cast.status) &&
    isArrayOfNumber(cast.volumes)
    ;
}

const isArrayOfServer = (value: unknown): value is Array<Server> => {
  return isArrayOf<Server>(value, isServer);
}

const isFirewallStatus = (value: unknown): value is FirewallStatus => {
  return Object.values(FirewallStatus).includes(value as FirewallStatus);
}

const isNetworkFirewall = (value: unknown): value is NetworkFirewall => {
  return isNumber((value as NetworkFirewall)?.id) && isFirewallStatus((value as NetworkFirewall)?.status);
}

const isArrayOfNetworkFirewall = (value: unknown): value is Array<NetworkFirewall> => {
  return isArrayOf<NetworkFirewall>(value, isNetworkFirewall)
}

const isIp = (value: unknown): value is IP => {
  return isNumber((value as IP)?.id) &&
    isString((value as IP)?.ip) &&
    isBool((value as IP)?.blocked);
}

const isDnsPtr = (value: unknown): value is DNSPtr => {
  return isString((value as DNSPtr)?.ip) &&
    isString((value as DNSPtr)?.dns_ptr);
}

const isArrayOfDnsPtr = (value: unknown): value is Array<DNSPtr> => {
  return isArrayOf<DNSPtr>(value, isDnsPtr);
}

const isIpv4 = (value: unknown): value is IPv4 => {
  return isIp(value) &&
    isString((value as IPv4)?.dns_ptr);
}

const isIpv6 = (value: unknown): value is IPv6 => {
  return isIp(value) &&
    isArrayOfDnsPtr((value as IPv6)?.dns_ptr);
}

const isServerPublicNetwork = (value: unknown): value is ServerPublicNetwork => {
  return isArrayOfNetworkFirewall((value as ServerPublicNetwork)?.firewalls) &&
    isArrayOfNumber((value as ServerPublicNetwork)?.floating_ips) &&
    isIpv4((value as ServerPublicNetwork)?.ipv4) &&
    isIpv6((value as ServerPublicNetwork)?.ipv6);
}

const isArrayOfServerPublicNetwork = (value: unknown): value is Array<ServerPublicNetwork> => {
  return isArrayOf<ServerPublicNetwork>(value, isServerPublicNetwork)
}

const isServerPrivateNetwork = (value: unknown): value is ServerPrivateNetwork => {
  return isNumber((value as ServerPrivateNetwork)?.network) &&
    isString((value as ServerPrivateNetwork)?.ip) &&
    isArrayOfString((value as ServerPrivateNetwork)?.alias_ips) &&
    isString((value as ServerPrivateNetwork)?.mac_address)
}

const isArrayOfServerPrivateNetwork = (value: unknown): value is Array<ServerPrivateNetwork> => {
  return isArrayOf<ServerPrivateNetwork>(value, isServerPrivateNetwork)
}

const isServerProtection = (value: unknown): value is ServerProtection => {
  return isProtection(value) && isBool((value as ServerProtection)?.rebuild);
}

export const isPrice = (value: unknown): value is Price => {
  return isString((value as Price)?.gross) &&
    isString((value as Price)?.net);
}

const isServerTypePrice = (value: unknown): value is ServerTypePrice => {
  return isString((value as ServerTypePrice)?.location) &&
    isPrice((value as ServerTypePrice)?.price_hourly) &&
    isPrice((value as ServerTypePrice)?.price_monthly)
}

const isArrayOfServerTypePrice = (value: unknown): value is Array<ServerTypePrice> => {
  return isArrayOf<ServerTypePrice>(value, isServerTypePrice);
}

const isCpuType = (value: unknown): value is CpuType => {
  return Object.values(CpuType).includes(value as CpuType);
}

const isStorageType = (value: unknown): value is StorageType => {
  return Object.values(StorageType).includes(value as StorageType);
}

const isServerType = (value: unknown): value is ServerType => {
  const cast = value as ServerType;

  return isNumber(cast.cores) &&
    isCpuType(cast.cpu_type) &&
    isBool(cast.deprecated) &&
    isString(cast.description) &&
    isNumber(cast.disk) &&
    isNumber(cast.id) &&
    isNumber(cast.memory) &&
    isString(cast.name) &&
    isArrayOfServerTypePrice(cast.prices) &&
    isStorageType(cast.storage_type)
}

export const isGetOneServerResponse = (value: unknown): value is GetOneServerResponse => {
  const cast = value as GetOneServerResponse;
  return isServer(cast.server);
}

export const isGetAllServerResponse = (value: unknown): value is GetAllServerResponse => {
  const cast = value as GetAllServerResponse;
  return isArrayOfServer(cast.servers);
}
