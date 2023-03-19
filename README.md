# Hetzner Cloud API
![Tests passing](https://github.com/theo-rettisch/hcloud-ts/actions/workflows/test.yml/badge.svg)

Typescript implementation of this api: https://docs.hetzner.cloud/

### Example with axios backend:

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

### Example with nodejs https backend:

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
          resolve(data as T);
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

### Example with fetch backend:

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
