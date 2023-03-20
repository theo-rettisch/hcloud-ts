/**
 * @module HCloud
 */
import ApiIsoExtension from "./api/api-iso/api-iso-extension";
import ApiNetworkExtension from "./api/api-network/api-network-extension";
import ApiImageExtension from "./api/api-image/api-image-extension";
import ApiPlacementGroupExtension from "./api/api-placement-group/api-placement-group-extension";
import ApiFirewallExtension from "./api/api-firewall/api-firewall-extension";
import ApiDatacenterExtension from "./api/api-datacenter/api-datacenter-extension";
import ApiServerExtension from "./api/api-server/api-server-extension";
import {HttpClientRequestMethod} from "./client-types";
import Client from "./client";

/**
 * Hetzner Cloud API Client
 */
class HCloud {
  public firewall: ApiFirewallExtension;
  public datacenter: ApiDatacenterExtension;
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
