import {
  getAllImageResponse,
  getOneImageResponse,
  removeImageResponse,
  updateImageResponse
} from "./api-image-type-guards.test";
import ApiImageExtension from "../api-image-extension";
import {
  isGetAllCloudImageResponse,
  isGetOneCloudImageResponse,
  isRemoveCloudImageResponse,
  isUpdateCloudImageResponse
} from "../api-image-type-guards";
import {wrapApiExtension} from "../../../test-helper";

describe('testing image api extension', () => {
  test('getOne returns GetOneResponse', async () => {
    const api = wrapApiExtension(ApiImageExtension, getOneImageResponse);
    const response = await api.getOne(1);
    expect(isGetOneCloudImageResponse(response));
  })

  test('getAll returns GetAllResponse', async () => {
    const api = wrapApiExtension(ApiImageExtension, getAllImageResponse);
    const response = await api.getAll();
    expect(isGetAllCloudImageResponse(response));
  })

  test('update returns UpdateResponse', async () => {
    const api = wrapApiExtension(ApiImageExtension, updateImageResponse);
    const response = await api.update(1, {type: 'snapshot'});
    expect(isUpdateCloudImageResponse(response));
  })

  test('remove returns RemoveResponse', async () => {
    const api = wrapApiExtension(ApiImageExtension, removeImageResponse);
    const response = await api.remove(1);
    expect(isRemoveCloudImageResponse(response));
  })
});
