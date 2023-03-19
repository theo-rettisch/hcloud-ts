import {wrapApiExtension} from "../../../test-helper";
import ApiServerExtension from "../api-server-extension";
import {getAllServerResponse, getOneServerResponse} from "./api-server-type-guards.test";
import {isGetAllServerResponse, isGetOneServerResponse} from "../api-server-type-guards";

describe('testing server api extension', () => {
  test('getOne returns GetOneServerResponse', async () => {
    const api = wrapApiExtension(ApiServerExtension, getOneServerResponse);
    const response = await api.getOne(1);
    expect(isGetOneServerResponse(response));
  });

  test('getOne returns GetAllServerResponse', async () => {
    const api = wrapApiExtension(ApiServerExtension, getAllServerResponse);
    const response = await api.getAll();
    expect(isGetAllServerResponse(response));
  })
});
