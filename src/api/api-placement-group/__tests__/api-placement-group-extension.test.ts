import {
  createPlacementGroupResponse,
  getAllPlacementGroupResponse,
  getOnePlacementGroupResponse,
  removePlacementGroupResponse,
  updatePlacementGroupResponse
} from "./api-placement-group-type-guards.test";
import {
  isCreatePlacementGroupResponse,
  isGetAllPlacementGroupResponse,
  isGetOnePlacementGroupResponse,
  isRemovePlacementGroupResponse,
  isUpdatePlacementGroupResponse
} from "../api-placement-group-type-guards";
import ApiPlacementGroupExtension from "../api-placement-group-extension";
import {wrapApiExtension} from "../../../test-helper";

describe('testing placement-group api extension', () => {
  test('getOne returns GetOneResponse', async () => {
    const api = wrapApiExtension(ApiPlacementGroupExtension, getOnePlacementGroupResponse);
    const response = await api.getOne(1);
    expect(isGetOnePlacementGroupResponse(response));
  })

  test('getAll returns GetAllResponse', async () => {
    const api = wrapApiExtension(ApiPlacementGroupExtension, getAllPlacementGroupResponse);
    const response = await api.getAll();
    expect(isGetAllPlacementGroupResponse(response));
  })

  test('create returns CreateResponse', async () => {
    const api = wrapApiExtension(ApiPlacementGroupExtension, createPlacementGroupResponse);
    const response = await api.create({name: 'name', type: 'spread'});
    expect(isCreatePlacementGroupResponse(response));
  })

  test('update returns UpdateResponse', async () => {
    const api = wrapApiExtension(ApiPlacementGroupExtension, updatePlacementGroupResponse);
    const response = await api.update(1, {name: 'new-name'});
    expect(isUpdatePlacementGroupResponse(response));
  })

  test('remove returns RemoveResponse', async () => {
    const api = wrapApiExtension(ApiPlacementGroupExtension, removePlacementGroupResponse);
    const response = await api.remove(1);
    expect(isRemovePlacementGroupResponse(response));
  })
});
