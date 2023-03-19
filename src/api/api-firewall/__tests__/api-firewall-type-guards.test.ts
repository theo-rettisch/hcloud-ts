import {
  isCreateFirewallRequest,
  isCreateFirewallResponse,
  isGetAllFirewallResponse,
  isGetOneFirewallResponse,
  isRemoveFirewallResponse,
  isUpdateFirewallResponse
} from "../api-firewall-type-guards";
import {
  AppliedToResourceType,
  AppliedToType,
  CreateFirewallRequest,
  CreateFirewallResponse,
  Firewall,
  GetAllFirewallResponse,
  GetOneFirewallResponse,
  RemoveFirewallResponse,
  RuleDirection,
  UpdateFirewallResponse
} from "../api-firewall-types";

export const validFirewall: Firewall = {
  id: 1,
  name: 'firewall',
  labels: {
    'firewall-label': ''
  },
  created: 'created',
  applied_to: [{
    server: {
      id: 1
    },
    type: AppliedToType.SERVER,
    label_selector: {
      selector: 'selector'
    },
    applied_to_resources: [{
      server: {
        id: 1
      },
      type: AppliedToResourceType.SERVER
    }]
  }],
  rules: [{
    direction: RuleDirection.IN,
    description: 'description',
    port: 'port',
    source_ips: ['1.2.3.4'],
    protocol: 'protocol',
    destination_ips: ['4.3.2.1']
  }]
};

export const getOneFirewallResponse: GetOneFirewallResponse = {
  firewall: validFirewall
}

export const getAllFirewallResponse: GetAllFirewallResponse = {
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
  firewalls: [validFirewall]
}

export const createFirewallRequest: CreateFirewallRequest = {
  name: 'createRequest'
}

export const createFirewallResponse: CreateFirewallResponse = {
  firewall: validFirewall,
  actions: ['action 1', 'action 2']
}

export const updateFirewallResponse: UpdateFirewallResponse = {
  firewall: validFirewall
}

export const removeFirewallResponse: RemoveFirewallResponse = {
  firewall: validFirewall
}

describe('testing datacenter type-guards', () => {
  test('object should be GetOneFirewallResponse', () => {
    expect(isGetOneFirewallResponse(getOneFirewallResponse));
  })

  test('object should be GetAllFirewallResponse', () => {
    expect(isGetAllFirewallResponse(getAllFirewallResponse));
  })

  test('object should be CreateFirewallRequest', () => {
    expect(isCreateFirewallRequest(createFirewallRequest));
  })

  test('object should be CreateFirewallResponse', () => {
    expect(isCreateFirewallResponse(createFirewallResponse));
  })

  test('object should be UpdateFirewallResponse', () => {
    expect(isUpdateFirewallResponse(updateFirewallResponse));
  })

  test('object should be RemoveFirewallResponse', () => {
    expect(isRemoveFirewallResponse(removeFirewallResponse));
  })
});
