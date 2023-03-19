import {isGetAllIsoResponse, isGetOneIsoResponse, isIso} from "../api-iso-type-guards";
import {GetAllIsoResponse, GetOneIsoResponse, Iso, Visibility} from "../api-iso-types";

export const validIso: Iso = {
  id: 1,
  name: 'iso',
  type: Visibility.PRIVATE,
  description: 'description',
  deprecated: 'deprecated'
}

export const getOneIsoResponse: GetOneIsoResponse = {
  iso: validIso
}

export const getAllIsoResponse: GetAllIsoResponse = {
  isos: [validIso]
}

describe('testing datacenter type-guards', () => {
  test('object should be Iso', () => {
    expect(isIso(validIso));
  })

  test('object should be GetOneIsoResponse', () => {
    expect(isGetOneIsoResponse(getOneIsoResponse));
  })

  test('object should be GetAllIsoResponse', () => {
    expect(isGetAllIsoResponse(getAllIsoResponse));
  })
});
