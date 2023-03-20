# Hetzner Cloud API Client

Typescript implementation of this api: https://docs.hetzner.cloud/

### Following extensions are available

| API Extension                                                   |
|-----------------------------------------------------------------|
| [Datacenter](https://docs.hetzner.cloud/#datacenters)           |
| [Firewall](https://docs.hetzner.cloud/#firewalls)               |
| [Image](https://docs.hetzner.cloud/#images)                     |
| [Iso](https://docs.hetzner.cloud/#isos)                         |
| [Network](https://docs.hetzner.cloud/#networks)                 |
| [Placement group](https://docs.hetzner.cloud/#placement-groups) |
| [Server](https://docs.hetzner.cloud/#servers)                   |

### Example with axios:

```typescript
import axios from 'axios';
import HCloud from 'hcloud-ts';

const request: HttpClientRequestMethod = <T>(props: HttpClientRequestMethodProps<T>): Promise<T> => {
  return axios.request<T>({
    url: props.url,
    data: props.data,
    method: props.method,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(props.data),
      Authorization: 'Bearer API_TOKEN'
    }
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(response.statusText)
    }

    return response.data
  });
};

const hCloudClient = new HCloud(request);
```

### Example with nodejs https:

```typescript
import * as https from 'https';
import HCloud from 'hcloud-ts';

const request: HttpClientRequestMethod = <T>(props: HttpClientRequestMethodProps<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: props.url,
      method: props.method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(props.data),
        Authorization: 'Bearer API_TOKEN'
      }
    }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data = data + chunk
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(res.statusMessage));
        } else {
          resolve(JSON.parse(data) as T);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    })

    req.write(props.data);
    req.end();
  });
}

const hCloudClient = new HCloud(request);
```

### Example with fetch:

```typescript
const request: HttpClientRequestMethod = <T>(props: HttpClientRequestMethodProps<T>): Promise<T> => {
  const body = JSON.stringify(props.data);

  return window.fetch(props.url, {
    method: props.method,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify(props.data).length,
      Authorization: 'Bearer API_TOKEN'
    },
    body,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return response.json() as Promise<T>
  });
};

const hCloudClient = new HCloud(request);
```
