/**
 * @packageDocumentation
 * API extension for networks
 * @see https://docs.hetzner.cloud/#networks
 *
 * @module Network
 */
import {
  CreateNetworkRequest,
  CreateNetworkResponse,
  GetAllNetworkRequest,
  GetAllNetworkResponse,
  GetOneNetworkResponse,
  RemoveNetworkResponse,
  UpdateNetworkRequest,
  UpdateNetworkResponse
} from "./api-network-types";
import {
  isCreateNetworkResponse,
  isGetAllNetworkResponse,
  isGetOneNetworkResponse,
  isRemoveNetworkResponse,
  isUpdateNetworkResponse
} from "./api-network-type-guards";
import {Getter, Modifier} from "../../client";
import ApiExtension from "../api-extension";
import {normalizePath} from "../utils";

export interface NetworkGetter extends Getter<GetOneNetworkResponse, GetAllNetworkRequest, GetAllNetworkResponse> {
}

export interface NetworkModifier extends Modifier<CreateNetworkRequest, CreateNetworkResponse, UpdateNetworkRequest, UpdateNetworkResponse, RemoveNetworkResponse> {
}

export default class ApiNetworkExtension extends ApiExtension implements NetworkGetter, NetworkModifier {
  private readonly extensionPath: string = 'networks';

  /**
   * @see https://docs.hetzner.cloud/#networks-create-a-network
   */
  create(data: CreateNetworkRequest): Promise<CreateNetworkResponse> {
    return this.client.post({
      path: this.extensionPath,
      typeguard: isCreateNetworkResponse,
      data
    });
  }

  /**
   * @see https://docs.hetzner.cloud/#networks-get-all-networks
   */
  getAll(search?: GetAllNetworkRequest): Promise<GetAllNetworkResponse> {
    return this.client.get({
      path: this.extensionPath,
      typeguard: isGetAllNetworkResponse,
      data: search
    });
  }

  /**
   * @see https://docs.hetzner.cloud/#networks-get-a-network
   */
  getOne(id: number): Promise<GetOneNetworkResponse> {
    return this.client.get({
      path: normalizePath(this.extensionPath, id),
      typeguard: isGetOneNetworkResponse,
    });
  }

  /**
   * @see https://docs.hetzner.cloud/#networks-delete-a-network
   */
  remove(id: number): Promise<RemoveNetworkResponse> {
    return this.client.delete({
      path: normalizePath(this.extensionPath, id),
      typeguard: isRemoveNetworkResponse
    })
  }

  /**
   * @see https://docs.hetzner.cloud/#networks-update-a-network
   */
  update(id: number, data: UpdateNetworkRequest): Promise<UpdateNetworkResponse> {
    return this.client.put({
      path: normalizePath(this.extensionPath, id),
      typeguard: isUpdateNetworkResponse,
      data
    });
  }
}
