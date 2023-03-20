/**
 * @module HCloud
 */
import Client from "./client";
import {HttpClientRequestMethod} from "./client-types";
import ApiDatacenterExtension from "./api/api-datacenter/api-datacenter-extension";
import ApiIsoExtension from "./api/api-iso/api-iso-extension";
import ApiNetworkExtension from "./api/api-network/api-network-extension";
import ApiImageExtension from "./api/api-image/api-image-extension";
import ApiPlacementGroupExtension from "./api/api-placement-group/api-placement-group-extension";
import ApiFirewallExtension from "./api/api-firewall/api-firewall-extension";
import ApiServerExtension from "./api/api-server/api-server-extension";

export * from "./types";
export * from "./type-guards";
export * from "./client-types";

export * from "./api/api-datacenter/api-datacenter-types";
export * from "./api/api-datacenter/api-datacenter-type-guards";

export * from "./api/api-iso/api-iso-types";
export * from "./api/api-iso/api-iso-type-guards";

export * from "./api/api-network/api-network-types";
export * from "./api/api-network/api-network-type-guards";

export * from "./api/api-image/api-image-types";
export * from "./api/api-image/api-image-type-guards";

export * from "./api/api-placement-group/api-placement-group-types";
export * from "./api/api-placement-group/api-placement-group-type-guards";

export * from "./api/api-firewall/api-firewall-types";
export * from "./api/api-firewall/api-firewall-type-guards";

export * from "./api/api-server/api-server-types";
export * from "./api/api-server/api-server-type-guards";

/**
 * Hetzner Cloud API Client
 */
class HCloud {
  public datacenter: ApiDatacenterExtension;
  public firewall: ApiFirewallExtension;
  public image: ApiImageExtension;
  public iso: ApiIsoExtension;
  public network: ApiNetworkExtension;
  public placementGroup: ApiPlacementGroupExtension;
  public server: ApiServerExtension;

  constructor(clientRequestMethod: HttpClientRequestMethod) {
    const client = new Client(clientRequestMethod);
    this.firewall = new ApiFirewallExtension(client);
    this.datacenter = new ApiDatacenterExtension(client);
    this.image = new ApiImageExtension(client);
    this.iso = new ApiIsoExtension(client);
    this.network = new ApiNetworkExtension(client);
    this.placementGroup = new ApiPlacementGroupExtension(client);
    this.server = new ApiServerExtension(client);
  }
}

export default HCloud;
