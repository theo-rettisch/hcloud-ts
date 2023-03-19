/**
 * @module PlacementGroup
 */
import {Labels, MetaResponse, PagableRequest, Sort} from "../../types";

export enum PlacementGroupType {
  SPREAD = 'spread'
}

export type PlacementGroup = {
  created: string;
  id: number;
  labels: Labels;
  name: string;
  servers: Array<number>;
  type: PlacementGroupType;
}

export type PlacementGroupResponse = { placement_group: PlacementGroup };

export type GetOnePlacementGroupResponse = PlacementGroupResponse;
export type GetAllPlacementGroupResponse = MetaResponse & { placement_groups: Array<PlacementGroup> };
export type GetAllPlacementGroupRequest = {
  name?: string;
  label_selector?: string;
  sort?: Array<Sort>;
  type?: PlacementGroupType;
} & PagableRequest;

export type CreatePlacementGroupRequest = {
  labels?: Labels;
  name: string;
  type: 'spread'
};
//TODO action-object-array
export type CreatePlacementGroupResponse = PlacementGroupResponse & { action?: {} | null };

export type UpdatePlacementGroupRequest = {
  labels?: Labels;
  name?: string;
};
export type UpdatePlacementGroupResponse = PlacementGroupResponse;

export type RemovePlacementGroupResponse = PlacementGroupResponse;
