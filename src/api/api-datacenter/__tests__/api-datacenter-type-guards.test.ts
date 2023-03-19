import {isDatacenter, isGetAllDatacenterResponse, isGetOneDatacenterResponse} from "../api-datacenter-type-guards";
import {Datacenter, GetAllDatacenterResponse, GetOneDatacenterResponse} from "../api-datacenter-types";

export const validDatacenter: Datacenter = {
  id: 1,
  name: 'datacenter',
  description: 'description',
  server_types: {
    available: [1],
    supported: [1],
    available_for_migration: [1]
  },
  location: {
    id: 1,
    name: 'location',
    description: 'description',
    city: 'city',
    country: 'country',
    network_zone: 'network zone',
    latitude: 1,
    longitude: 2
  }
}

export const getOneDatacenterResponse: GetOneDatacenterResponse = {
  datacenter: validDatacenter
}

export const getAllDatacenterResponse: GetAllDatacenterResponse = {
  datacenters: [validDatacenter],
  recommendation: 1
}

describe('testing datacenter type-guards', () => {
  test('object should be Datacenter', () => {
    expect(isDatacenter(validDatacenter));
  })

  test('object should be GetOneDatacenterResponse', () => {
    expect(isGetOneDatacenterResponse(getOneDatacenterResponse));
  })

  test('object should be GetAllDatacenterResponse', () => {
    expect(isGetAllDatacenterResponse(getAllDatacenterResponse));
  })
});
