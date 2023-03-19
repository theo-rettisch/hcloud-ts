import {
  CpuType,
  FirewallStatus,
  GetAllServerResponse,
  GetOneServerResponse,
  Server,
  StorageType
} from "../api-server-types";
import {validDatacenter} from "../../api-datacenter/__tests__/api-datacenter-type-guards.test";
import {validCloudImage} from "../../api-image/__tests__/api-image-type-guards.test";
import {validIso} from "../../api-iso/__tests__/api-iso-type-guards.test";
import {validPlacementGroup} from "../../api-placement-group/__tests__/api-placement-group-type-guards.test";
import {Status} from "../../../types";
import {isGetAllServerResponse, isGetOneServerResponse, isServer} from "../api-server-type-guards";

export const validServer: Server = {
  id: 1,
  name: 'server',
  datacenter: validDatacenter,
  backup_window: null,
  created: new Date().toDateString(),
  image: validCloudImage,
  iso: validIso,
  included_traffic: 0,
  labels: {
    'server-label': ''
  },
  ingoing_traffic: 0,
  load_balancers: [1],
  locked: false,
  outgoing_traffic: 0,
  placement_group: validPlacementGroup,
  primary_disk_size: 0,
  private_net: [{
    network: 1,
    alias_ips: ['127.0.0.1'],
    mac_address: '00:00:00:00:00',
    ip: '0.0.0.0'
  }],
  public_net: [{
    ipv4: {
      id: 1,
      ip: '127.0.0.1',
      blocked: false,
      dns_ptr: 'dns_ptr'
    },
    ipv6: {
      id: 1,
      ip: '127.0.0.1',
      blocked: false,
      dns_ptr: [{
        dns_ptr: 'dns_ptr',
        ip: '127.0.0.1'
      }]
    },
    floating_ips: [123],
    firewalls: [{id: 1, status: FirewallStatus.APPLIED}]
  }],
  protection: {
    delete: false,
    rebuild: false
  },
  server_type: {
    cores: 4,
    cpu_type: CpuType.SHARED,
    deprecated: false,
    description: 'description',
    disk: 0,
    id: 1,
    memory: 2,
    name: 'server_type',
    prices: [{
      price_hourly: {
        net: '1',
        gross: '1.1'
      },
      price_monthly: {
        net: '6',
        gross: '6.6'
      },
      location: 'location'
    }],
    storage_type: StorageType.LOCAL
  },
  status: Status.RUNNING,
  rescue_enabled: false,
  volumes: [2]
}

export const getOneServerResponse: GetOneServerResponse = {
  server: validServer
}

export const getAllServerResponse: GetAllServerResponse = {
  servers: [validServer]
}

describe('testing server type-guards', () => {
  test('object should be server', () => {
    expect(isServer(validServer));
  })

  test('object should be getOneServerResponse', () => {
    expect(isGetOneServerResponse(getOneServerResponse));
  })

  test('object should be getAllServerResponse', () => {
    expect(isGetAllServerResponse(getAllServerResponse));
  })
});
