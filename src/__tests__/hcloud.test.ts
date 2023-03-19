import ApiFirewallExtension from "../api/api-firewall/api-firewall-extension";
import ApiDatacenterExtension from "../api/api-datacenter/api-datacenter-extension";
import ApiImageExtension from "../api/api-image/api-image-extension";
import ApiIsoExtension from "../api/api-iso/api-iso-extension";
import ApiNetworkExtension from "../api/api-network/api-network-extension";
import ApiPlacementGroupExtension from "../api/api-placement-group/api-placement-group-extension";
import HCloud from "../hcloud";

describe('testing hcloud', () => {
  let hCloud: HCloud;
  beforeAll(() => {
    hCloud = new HCloud(<T>() => Promise.resolve() as Promise<T>)
  })

  test('hcloud can be instantiated', async () => {
    expect(hCloud).toBeInstanceOf(HCloud);
  });

  test('hcloud.firewall is ApiFirewallExtension', async () => {
    expect(hCloud.firewall).toBeInstanceOf(ApiFirewallExtension);
  });

  test('hcloud.firewall is ApiDatacenterExtension', async () => {
    expect(hCloud.datacenter).toBeInstanceOf(ApiDatacenterExtension);
  });

  test('hcloud.firewall is ApiImageExtension', async () => {
    expect(hCloud.image).toBeInstanceOf(ApiImageExtension);
  });

  test('hcloud.firewall is ApiIsoExtension', async () => {
    expect(hCloud.iso).toBeInstanceOf(ApiIsoExtension);
  });

  test('hcloud.firewall is ApiNetworkExtension', async () => {
    expect(hCloud.network).toBeInstanceOf(ApiNetworkExtension);
  });

  test('hcloud.firewall is ApiPlacementGroupExtension', async () => {
    expect(hCloud.placementGroup).toBeInstanceOf(ApiPlacementGroupExtension);
  });
});
