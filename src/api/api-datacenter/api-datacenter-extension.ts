/**
 * @packageDocumentation
 * API extension for datacenters
 * @see https://docs.hetzner.cloud/#datacenters
 *
 * @module Datacenter
 */
import {GetAllDatacenterRequest, GetAllDatacenterResponse, GetOneDatacenterResponse} from "./api-datacenter-types";
import {isGetAllDatacenterResponse, isGetOneDatacenterResponse} from "./api-datacenter-type-guards";
import {Getter} from "../../client";
import ApiExtension from "../api-extension";
import {normalizePath} from "../utils";

export interface DatacenterGetter extends Getter<GetOneDatacenterResponse, GetAllDatacenterRequest, GetAllDatacenterResponse> {
}

export default class ApiDatacenterExtension extends ApiExtension implements DatacenterGetter {
  private readonly extensionPath: string = 'datacenters';

  /**
   * @see https://docs.hetzner.cloud/#datacenters-get-all-datacenters
   */
  getAll(search?: GetAllDatacenterRequest): Promise<GetAllDatacenterResponse> {
    return this.client.get({
      path: this.extensionPath,
      typeguard: isGetAllDatacenterResponse,
      data: search,
    });
  }

  /**
   * @see https://docs.hetzner.cloud/#datacenters-get-a-datacenter
   */
  getOne(id: number): Promise<GetOneDatacenterResponse> {
    return this.client.get({
      path: normalizePath(this.extensionPath, id),
      typeguard: isGetOneDatacenterResponse,
    });
  }
}
