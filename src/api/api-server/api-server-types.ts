/**
 * @module Server
 */
import {Datacenter} from "../api-datacenter/api-datacenter-types";
import {CloudImage} from "../api-image/api-image-types";
import {Iso} from "../api-iso/api-iso-types";
import {PlacementGroup} from "../api-placement-group/api-placement-group-types";
import {Labels, PagableRequest, Protection, Sort, Status} from "../../types";

export type ServerProtection = Protection & {
  rebuild: boolean;
}

export type ServerPrivateNetwork = {
  alias_ips: Array<string>;
  ip: string;
  mac_address: string;
  network: number;
}

export enum FirewallStatus {
  APPLIED = 'applied', PENDING = 'pending'
}

export type NetworkFirewall = {
  id: number;
  status: FirewallStatus;
}

export type IP = {
  blocked: boolean;
  id: number;
  ip: string;
}

export type DNSPtr = {
  dns_ptr: string;
  ip: string;
}

export type IPv4 = IP & { dns_ptr: string; };
export type IPv6 = IP & { dns_ptr: Array<DNSPtr>; };

export type ServerPublicNetwork = {
  firewalls: Array<NetworkFirewall>;
  floating_ips: Array<number>;
  ipv4: IPv4;
  ipv6: IPv6;
}

export type Price = {
  gross: string;
  net: string;
}

export type ServerTypePrice = {
  location: string;
  price_hourly: Price;
  price_monthly: Price;
}

export enum CpuType {
  SHARED = 'shared',
  DEDICATED = 'dedicated'
}

export enum StorageType {
  LOCAL = 'local',
  NETWORK = 'network'
}

export type ServerType = {
  cores: number;
  cpu_type: CpuType;
  deprecated: boolean;
  description: string;
  disk: number;
  id: number;
  memory: number;
  name: string;
  prices: Array<ServerTypePrice>;
  storage_type: StorageType;
}

export type Server = {
  backup_window: string | null;
  created: string;
  datacenter: Datacenter;
  id: number;
  image: CloudImage;
  included_traffic: number | null;
  ingoing_traffic: number | null;
  iso: Iso;
  labels: Labels;
  load_balancers: Array<number>;
  locked: boolean;
  name: string;
  outgoing_traffic: number | null;
  placement_group: PlacementGroup;
  primary_disk_size: number;
  private_net: Array<ServerPrivateNetwork>
  protection: ServerProtection;
  public_net: Array<ServerPublicNetwork>;
  rescue_enabled: boolean;
  server_type: ServerType;
  status: Status;
  volumes: Array<number>;
}

export type GetOneServerResponse = { server: Server };
export type GetAllServerResponse = { servers: Array<Server> };
export type GetAllServerRequest = {
  name?: string;
  label_selector?: string;
  sort?: Array<Sort>;
  status?: Status;
} & PagableRequest
