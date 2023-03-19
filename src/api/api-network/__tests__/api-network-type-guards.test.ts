import {
  isCreateNetworkResponse,
  isGetAllNetworkResponse,
  isGetOneNetworkResponse,
  isNetwork,
  isRemoveNetworkResponse,
  isUpdateNetworkResponse
} from "../api-network-type-guards";
import {
  CreateNetworkResponse,
  GetAllNetworkResponse,
  GetOneNetworkResponse,
  Network,
  RemoveNetworkResponse,
  SubnetType,
  UpdateNetworkResponse
} from "../api-network-types";

export const validNetwork: Network = {
  id: 1,
  name: 'network',
  created: 'created',
  ip_range: 'ip-range',
  labels: {
    'network-label': ''
  },
  protection: {
    delete: false
  },
  routes: [{
    gateway: 'gateway',
    destination: 'destination'
  }],
  load_balancers: [1],
  servers: [1],
  subnets: [{
    gateway: 'gateway',
    type: SubnetType.CLOUD,
    ip_range: 'ip-range',
    network_zone: 'network-zone'
  }]
};

export const getOneNetworkResponse: GetOneNetworkResponse = {
  network: validNetwork
}

export const getAllNetworkResponse: GetAllNetworkResponse = {
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
  networks: [validNetwork]
}

export const createNetworkResponse: CreateNetworkResponse = {
  network: validNetwork
}

export const updateNetworkResponse: UpdateNetworkResponse = {
  network: validNetwork
}

export const removeNetworkResponse: RemoveNetworkResponse = {
  network: validNetwork
}

describe('testing datacenter type-guards', () => {
  test('object should be Network', () => {
    expect(isNetwork(validNetwork));
  })

  test('object should be GetOneNetworkResponse', () => {
    expect(isGetOneNetworkResponse(getOneNetworkResponse));
  })

  test('object should be GetAllNetworkResponse', () => {
    expect(isGetAllNetworkResponse(getAllNetworkResponse));
  })

  test('object should be CreateNetworkResponse', () => {
    expect(isCreateNetworkResponse(createNetworkResponse));
  })

  test('object should be UpdateNetworkResponse', () => {
    expect(isUpdateNetworkResponse(updateNetworkResponse));
  })

  test('object should be RemoveNetworkResponse', () => {
    expect(isRemoveNetworkResponse(removeNetworkResponse));
  })
});
