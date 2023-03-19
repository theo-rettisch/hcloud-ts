import {
  createNetworkResponse,
  getAllNetworkResponse,
  getOneNetworkResponse,
  removeNetworkResponse,
  updateNetworkResponse
} from "./api-network-type-guards.test";
import {
  isCreateNetworkResponse,
  isGetAllNetworkResponse,
  isGetOneNetworkResponse,
  isRemoveNetworkResponse,
  isUpdateNetworkResponse
} from "../api-network-type-guards";
import ApiNetworkExtension from "../api-network-extension";
import {wrapApiExtension} from "../../../test-helper";


describe('testing network api extension', () => {
  test('getOne returns GetOneResponse', async () => {
    const api = wrapApiExtension(ApiNetworkExtension, getOneNetworkResponse);
    const response = await api.getOne(1);
    expect(isGetOneNetworkResponse(response));
  })

  test('getAll returns GetAllResponse', async () => {
    const api = wrapApiExtension(ApiNetworkExtension, getAllNetworkResponse);
    const response = await api.getAll();
    expect(isGetAllNetworkResponse(response));
  })

  test('create returns CreateResponse', async () => {
    const api = wrapApiExtension(ApiNetworkExtension, createNetworkResponse);
    const response = await api.create({name: 'name', ip_range: '1.2.3.4'});
    expect(isCreateNetworkResponse(response));
  })

  test('update returns UpdateResponse', async () => {
    const api = wrapApiExtension(ApiNetworkExtension, updateNetworkResponse);
    const response = await api.update(1, {name: 'new-name'});
    expect(isUpdateNetworkResponse(response));
  })

  test('remove returns RemoveResponse', async () => {
    const api = wrapApiExtension(ApiNetworkExtension, removeNetworkResponse);
    const response = await api.remove(1);
    expect(isRemoveNetworkResponse(response));
  })
});
