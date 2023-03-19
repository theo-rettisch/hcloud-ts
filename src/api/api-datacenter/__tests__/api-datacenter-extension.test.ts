import ApiDatacenterExtension from "../api-datacenter-extension";
import {isGetAllDatacenterResponse, isGetOneDatacenterResponse} from "../api-datacenter-type-guards";
import {getAllDatacenterResponse, getOneDatacenterResponse} from "./api-datacenter-type-guards.test";
import {wrapApiExtension} from "../../../test-helper";

describe('testing datacenter api extension', () => {
  test('getOne returns GetOneResponse', async () => {
    const api = wrapApiExtension(ApiDatacenterExtension, getOneDatacenterResponse);
    const response = await api.getOne(1);
    expect(isGetOneDatacenterResponse(response));
  });

  test('getOne returns GetOneResponse', async () => {
    const api = wrapApiExtension(ApiDatacenterExtension, getAllDatacenterResponse);
    const response = await api.getAll({name: 'test'});
    expect(isGetAllDatacenterResponse(response));
  })
});
