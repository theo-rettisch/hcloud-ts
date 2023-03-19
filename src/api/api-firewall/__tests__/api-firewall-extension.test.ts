import {
  createFirewallResponse,
  getAllFirewallResponse,
  getOneFirewallResponse,
  removeFirewallResponse,
  updateFirewallResponse
} from "./api-firewall-type-guards.test";
import {
  isCreateFirewallResponse,
  isGetAllFirewallResponse,
  isGetOneFirewallResponse,
  isRemoveFirewallResponse,
  isUpdateFirewallResponse
} from "../api-firewall-type-guards";
import ApiFirewallExtension from "../api-firewall-extension";
import {wrapApiExtension} from "../../../test-helper";

describe('testing firewall api extension', () => {
  test('getOne returns GetOneResponse', async () => {
    const api = wrapApiExtension(ApiFirewallExtension, getOneFirewallResponse);
    const response = await api.getOne(1);
    expect(isGetOneFirewallResponse(response));
  })

  test('getAll returns GetAllResponse', async () => {
    const api = wrapApiExtension(ApiFirewallExtension, getAllFirewallResponse);
    const response = await api.getAll();
    expect(isGetAllFirewallResponse(response));
  })

  test('create returns CreateResponse', async () => {
    const api = wrapApiExtension(ApiFirewallExtension, createFirewallResponse);
    const response = await api.create({name: 'name'});
    expect(isCreateFirewallResponse(response));
  })

  test('update returns UpdateResponse', async () => {
    const api = wrapApiExtension(ApiFirewallExtension, updateFirewallResponse);
    const response = await api.update(1, {name: 'new-name'});
    expect(isUpdateFirewallResponse(response));
  })

  test('remove returns RemoveResponse', async () => {
    const api = wrapApiExtension(ApiFirewallExtension, removeFirewallResponse);
    const response = await api.remove(1);
    expect(isRemoveFirewallResponse(response));
  })
});
