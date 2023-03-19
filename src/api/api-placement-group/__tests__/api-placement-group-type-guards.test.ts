import {
  isCreatePlacementGroupResponse,
  isGetAllPlacementGroupResponse,
  isGetOnePlacementGroupResponse,
  isPlacementGroup,
  isRemovePlacementGroupResponse,
  isUpdatePlacementGroupResponse
} from "../api-placement-group-type-guards";
import {
  CreatePlacementGroupResponse,
  GetAllPlacementGroupResponse,
  GetOnePlacementGroupResponse,
  PlacementGroup,
  PlacementGroupType,
  RemovePlacementGroupResponse,
  UpdatePlacementGroupResponse
} from "../api-placement-group-types";

export const validPlacementGroup: PlacementGroup = {
  id: 1,
  name: 'placementGroup',
  created: 'created',
  labels: {
    'placement-group-label': ''
  },
  servers: [1],
  type: PlacementGroupType.SPREAD
};

export const getOnePlacementGroupResponse: GetOnePlacementGroupResponse = {
  placement_group: validPlacementGroup
}

export const getAllPlacementGroupResponse: GetAllPlacementGroupResponse = {
  meta: {
    pagination: {
      page: 1,
      last_page: 1,
      next_page: 1,
      per_page: 1,
      previous_page: 1,
      total_entries: 1
    }
  },
  placement_groups: [validPlacementGroup]
}

export const createPlacementGroupResponse: CreatePlacementGroupResponse = {
  placement_group: validPlacementGroup
}

export const updatePlacementGroupResponse: UpdatePlacementGroupResponse = {
  placement_group: validPlacementGroup
}

export const removePlacementGroupResponse: RemovePlacementGroupResponse = {
  placement_group: validPlacementGroup
}

describe('testing datacenter type-guards', () => {
  test('object should be PlacementGroup', () => {
    expect(isPlacementGroup(validPlacementGroup));
  })

  test('object should be GetOnePlacementGroupResponse', () => {
    expect(isGetOnePlacementGroupResponse(getOnePlacementGroupResponse));
  })

  test('object should be GetAllPlacementGroupResponse', () => {
    expect(isGetAllPlacementGroupResponse(getAllPlacementGroupResponse));
  })

  test('object should be CreatePlacementGroupResponse', () => {
    expect(isCreatePlacementGroupResponse(createPlacementGroupResponse));
  })

  test('object should be UpdatePlacementGroupResponse', () => {
    expect(isUpdatePlacementGroupResponse(updatePlacementGroupResponse));
  })

  test('object should be RemovePlacementGroupResponse', () => {
    expect(isRemovePlacementGroupResponse(removePlacementGroupResponse));
  })
});
