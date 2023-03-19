/**
 * @module PlacementGroup
 */
import {
  CreatePlacementGroupResponse,
  GetAllPlacementGroupResponse,
  GetOnePlacementGroupResponse,
  PlacementGroup,
  PlacementGroupType,
  RemovePlacementGroupResponse,
  UpdatePlacementGroupResponse
} from "./api-placement-group-types";
import {isArrayOf, isArrayOfNumber, isLabels, isMetaResponse, isNumber, isString, optional} from "../../type-guards";

export const isPlacementGroup = (value: unknown): value is PlacementGroup => {
  const cast = value as PlacementGroup;
  return isNumber(cast.id) &&
    isString(cast.name) &&
    isPlacementGroupType(cast.type) &&
    isString(cast.created) &&
    isLabels(cast.labels) &&
    isArrayOfNumber(cast.servers);
}

const isPlacementGroupType = (value: unknown): value is PlacementGroupType => {
  return Object.values(PlacementGroupType).includes(value as PlacementGroupType);
}

export const isGetOnePlacementGroupResponse = (value: unknown): value is GetOnePlacementGroupResponse => {
  const cast = value as GetOnePlacementGroupResponse;
  return isPlacementGroup(cast.placement_group);
}

const isArrayOfPlacementGroup = (value: unknown): value is Array<PlacementGroup> => {
  return isArrayOf<PlacementGroup>(value, isPlacementGroup)
}

export const isGetAllPlacementGroupResponse = (value: unknown): value is GetAllPlacementGroupResponse => {
  const cast = value as GetAllPlacementGroupResponse;
  return optional(cast, isMetaResponse) && isArrayOfPlacementGroup(cast.placement_groups);
}

export const isCreatePlacementGroupResponse = (value: unknown): value is CreatePlacementGroupResponse => {
  const cast = value as CreatePlacementGroupResponse;
  return isPlacementGroup(cast.placement_group);
  // TODO: && action check
}

export const isUpdatePlacementGroupResponse = (value: unknown): value is UpdatePlacementGroupResponse => {
  const cast = value as CreatePlacementGroupResponse;
  return isPlacementGroup(cast.placement_group);
}

export const isRemovePlacementGroupResponse = (value: unknown): value is RemovePlacementGroupResponse => {
  const cast = value as CreatePlacementGroupResponse;
  return isPlacementGroup(cast.placement_group);
}
