/**
 * @module Datacenter
 */
export type DatacenterLocation = {
  city: string;
  country: string;
  description: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  network_zone: string;
}

export type DatacenterServerType = {
  available: Array<number>;
  available_for_migration: Array<number>;
  supported: Array<number>;
}

export type Datacenter = {
  description: string;
  id: number;
  location: DatacenterLocation;
  name: string;
  server_types: DatacenterServerType
}

export type GetOneDatacenterResponse = { datacenter: Datacenter };

export type GetAllDatacenterResponse = { datacenters: Array<Datacenter>, recommendation: number };
export type GetAllDatacenterRequest = { name: string };
