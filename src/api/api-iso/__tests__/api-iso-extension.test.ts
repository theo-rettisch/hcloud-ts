import {getAllIsoResponse, getOneIsoResponse} from "./api-iso-type-guards.test";
import ApiIsoExtension from "../api-iso-extension";
import {isGetAllIsoResponse, isGetOneIsoResponse} from "../api-iso-type-guards";
import {wrapApiExtension} from "../../../test-helper";

describe('testing iso api extension', () => {
  test('getOne returns GetOneResponse', async () => {
    const api = wrapApiExtension(ApiIsoExtension, getOneIsoResponse);
    const response = await api.getOne(1);
    expect(isGetOneIsoResponse(response));
  })

  test('getOne returns GetAllResponse', async () => {
    const api = wrapApiExtension(ApiIsoExtension, getAllIsoResponse);
    const response = await api.getAll();
    expect(isGetAllIsoResponse(response));
  })
});
