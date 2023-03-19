/**
 * @packageDocumentation
 * API extension for firewalls
 * @see https://docs.hetzner.cloud/#firewalls
 *
 * @module Firewall
 */
import {
  CreateFirewallRequest,
  CreateFirewallResponse,
  FirewallResponse,
  GetAllFirewallRequest,
  GetAllFirewallResponse,
  GetOneFirewallResponse,
  RemoveFirewallResponse,
  UpdateFirewallRequest,
  UpdateFirewallResponse
} from "./api-firewall-types";
import {
  isCreateFirewallResponse,
  isGetAllFirewallResponse,
  isGetOneFirewallResponse,
  isRemoveFirewallResponse,
  isUpdateFirewallResponse
} from "./api-firewall-type-guards";
import {Getter, Modifier} from "../../client";
import ApiExtension from "../api-extension";
import {normalizePath} from "../utils";

export interface FirewallGetter extends Getter<GetOneFirewallResponse, GetAllFirewallRequest, GetAllFirewallResponse> {
}

export interface FirewallModifier extends Modifier<CreateFirewallRequest, CreateFirewallResponse, UpdateFirewallRequest, UpdateFirewallResponse, RemoveFirewallResponse> {
}

export default class ApiFirewallExtension extends ApiExtension implements FirewallGetter, FirewallModifier {
  private readonly extensionPath: string = 'firewalls';

  /**
   * @see https://docs.hetzner.cloud/#firewalls-create-a-firewall
   */
  async create(data: CreateFirewallRequest): Promise<Partial<FirewallResponse> & { actions?: Array<string> }> {
    return this.client.post({
      path: this.extensionPath,
      typeguard: isCreateFirewallResponse,
      data,
    });
  }

  /**
   * @see https://docs.hetzner.cloud/#firewalls-delete-a-firewall
   */
  async remove(id: number): Promise<RemoveFirewallResponse> {
    return this.client.delete({
      path: normalizePath(this.extensionPath, id),
      typeguard: isRemoveFirewallResponse
    })
  }

  /**
   * @see https://docs.hetzner.cloud/#firewalls-get-all-firewalls
   */
  async getAll(search?: GetAllFirewallRequest): Promise<GetAllFirewallResponse> {
    return this.client.get({
      path: this.extensionPath,
      typeguard: isGetAllFirewallResponse,
      data: search,
    });
  }

  /**
   * @see https://docs.hetzner.cloud/#firewalls-get-a-firewall
   */
  async getOne(id: number): Promise<GetOneFirewallResponse> {
    return this.client.get({
      path: normalizePath(this.extensionPath, id),
      typeguard: isGetOneFirewallResponse,
    });
  }

  /**
   * @see https://docs.hetzner.cloud/#firewalls-update-a-firewall
   */
  async update(id: number, data: UpdateFirewallRequest): Promise<UpdateFirewallResponse> {
    return this.client.put({
      path: normalizePath(this.extensionPath, id),
      typeguard: isUpdateFirewallResponse,
      data
    });
  }
}
