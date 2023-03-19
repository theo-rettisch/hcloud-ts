/**
 * @module Network
 */
import {Labels, MetaResponse, PagableRequest, Protection} from "../../types";

export type Route = {
  destination: string;
  gateway: string;
}

export enum SubnetType {
  CLOUD = 'cloud', SERVER = 'server', VSWITCH = 'vswitch'
}

export type Subnet = {
  gateway: string;
  ip_range: string;
  network_zone: string;
  type: SubnetType;
}

export type Network = {
  created: string;
  id: number;
  ip_range: string;
  labels: Labels;
  load_balancers: Array<number>;
  name: string;
  protection: Protection;
  routes: Array<Route>;
  servers: Array<number>;
  subnets: Array<Subnet>;
}

export type NetworkResponse = { network: Network };
export type NetworksResponse = { networks: Array<Network> };

export type GetOneNetworkResponse = NetworkResponse;
export type GetAllNetworkResponse = Partial<MetaResponse> & NetworksResponse;
export type GetAllNetworkRequest = {
  name?: string;
  label_selector?: string;
} & PagableRequest;

export type CreateNetworkRequest = {
  ip_range: string,
  labels?: Labels,
  name: string;
  routes?: Array<Route>,
  subnets?: Array<Subnet>
};

export type CreateNetworkResponse = Partial<NetworkResponse>;

export type UpdateNetworkRequest = { labels?: Labels, name?: string };
export type UpdateNetworkResponse = Partial<NetworkResponse>;

export type RemoveNetworkResponse = Partial<NetworkResponse>;
