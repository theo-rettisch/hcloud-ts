/**
 * @packageDocumentation
 * API extension for placement groups
 * @see https://docs.hetzner.cloud/#placement-groups
 *
 * @module PlacementGroup
 */
import {
  CreatePlacementGroupRequest,
  CreatePlacementGroupResponse,
  GetAllPlacementGroupRequest,
  GetAllPlacementGroupResponse,
  GetOnePlacementGroupResponse,
  RemovePlacementGroupResponse,
  UpdatePlacementGroupRequest,
  UpdatePlacementGroupResponse
} from "./api-placement-group-types";
import {
  isCreatePlacementGroupResponse,
  isGetAllPlacementGroupResponse,
  isGetOnePlacementGroupResponse,
  isRemovePlacementGroupResponse,
  isUpdatePlacementGroupResponse
} from "./api-placement-group-type-guards";
import {Getter, Modifier} from "../../client";
import ApiExtension from "../api-extension";
import {normalizePath} from "../utils";

export interface PlacementGroupGetter extends Getter<GetOnePlacementGroupResponse, GetAllPlacementGroupRequest, GetAllPlacementGroupResponse> {
}

export interface PlacementGroupModifier extends Modifier<CreatePlacementGroupRequest, CreatePlacementGroupResponse, UpdatePlacementGroupRequest, UpdatePlacementGroupResponse, RemovePlacementGroupResponse> {
}

export default class ApiPlacementGroupExtension extends ApiExtension implements PlacementGroupGetter, PlacementGroupModifier {
  private readonly extensionPath: string = 'placement_groups';

  /**
   * https://docs.hetzner.cloud/#placement-groups-create-a-placementgroup
   */
  create(data: CreatePlacementGroupRequest): Promise<CreatePlacementGroupResponse> {
    return this.client.post({
      path: this.extensionPath,
      typeguard: isCreatePlacementGroupResponse,
      data
    });
  }

  /**
   * @see https://docs.hetzner.cloud/#placement-groups-get-all-placementgroups
   */
  getAll(search?: GetAllPlacementGroupRequest | undefined): Promise<GetAllPlacementGroupResponse> {
    return this.client.get({
      path: this.extensionPath,
      typeguard: isGetAllPlacementGroupResponse,
      data: search
    });
  }

  /**
   * @see https://docs.hetzner.cloud/#placement-groups-get-a-placementgroup
   */
  getOne(id: number): Promise<GetOnePlacementGroupResponse> {
    return this.client.get({
      path: normalizePath(this.extensionPath, id),
      typeguard: isGetOnePlacementGroupResponse,
    });
  }

  /**
   * @see https://docs.hetzner.cloud/#placement-groups-delete-a-placementgroup
   */
  remove(id: number): Promise<RemovePlacementGroupResponse> {
    return this.client.delete({
      path: normalizePath(this.extensionPath, id),
      typeguard: isRemovePlacementGroupResponse
    })
  }

  /**
   * @see https://docs.hetzner.cloud/#placement-groups-update-a-placementgroup
   */
  update(id: number, data: UpdatePlacementGroupRequest): Promise<UpdatePlacementGroupResponse> {
    return this.client.put({
      path: normalizePath(this.extensionPath, id),
      typeguard: isUpdatePlacementGroupResponse,
      data
    });
  }
}
