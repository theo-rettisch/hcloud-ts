/**
 * @packageDocumentation
 * API extension for servers
 * @see https://docs.hetzner.cloud/#servers
 *
 * @module Server
 */
import {Getter} from "../../client";
import {GetAllServerRequest, GetAllServerResponse, GetOneServerResponse} from "./api-server-types";
import {isGetAllServerResponse, isGetOneServerResponse} from "./api-server-type-guards";
import ApiExtension from "../api-extension";
import {normalizePath} from "../utils";

export interface ServerGetter extends Getter<GetOneServerResponse, GetAllServerRequest, GetAllServerResponse> {
}

export default class ApiServerExtension extends ApiExtension implements ServerGetter {
  private readonly extensionPath: string = 'servers';

  /**
   * @see https://docs.hetzner.cloud/#servers-get-all-servers
   */
  getAll(search?: GetAllServerRequest): Promise<GetAllServerResponse> {
    return this.client.get({
      path: this.extensionPath,
      typeguard: isGetAllServerResponse,
      data: search
    });
  }

  /**
   * @see https://docs.hetzner.cloud/#servers-get-a-server
   */
  getOne(id: number): Promise<GetOneServerResponse> {
    return this.client.get({
      path: normalizePath(this.extensionPath, id),
      typeguard: isGetOneServerResponse,
    });
  }
}
