/**
 * @packageDocumentation
 * API extension for isos
 * @see https://docs.hetzner.cloud/#isos
 *
 * @module Iso
 */
import {GetAllIsoRequest, GetAllIsoResponse, GetOneIsoResponse,} from "./api-iso-types";
import {isGetAllIsoResponse, isGetOneIsoResponse} from "./api-iso-type-guards";
import {Getter} from "../../client";
import ApiExtension from "../api-extension";
import {normalizePath} from "../utils";

export interface IsoGetter extends Getter<GetOneIsoResponse, GetAllIsoRequest, GetAllIsoResponse> {
}

export default class ApiIsoExtension extends ApiExtension implements IsoGetter {
  private readonly extensionPath: string = 'isos';

  /**
   * @see https://docs.hetzner.cloud/#isos-get-all-isos
   */
  getAll(search?: GetAllIsoRequest): Promise<GetAllIsoResponse> {
    return this.client.get({
      path: this.extensionPath,
      typeguard: isGetAllIsoResponse,
      data: search
    });
  }

  /**
   * @see https://docs.hetzner.cloud/#isos-get-an-iso
   */
  getOne(id: number): Promise<GetOneIsoResponse> {
    return this.client.get({
      path: normalizePath(this.extensionPath, id),
      typeguard: isGetOneIsoResponse,
    });
  }
}
