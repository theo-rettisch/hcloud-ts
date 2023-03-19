/**
 * @module API Client
 */
import {
  HttpClientRequestMethod,
  HttpClientRequestMethodProps,
  HttpMethod,
  MethodProps,
  RequestProps
} from "./client-types";
import {isNotUndefined, isPagableRequest} from "./type-guards";

export default class Client {
  private apiUrl: string = 'https://api.hetzner.cloud/v1/';
  private readonly clientRequestMethod: HttpClientRequestMethod;

  constructor(clientRequestMethod: HttpClientRequestMethod) {
    this.clientRequestMethod = clientRequestMethod;
  }

  async get<Response = unknown>(props: MethodProps<Response>): Promise<Response> {
    return this.request<Response>({...props, method: HttpMethod.GET});
  }

  async post<Response = unknown>(props: MethodProps<Response>): Promise<Response> {
    return this.request<Response>({...props, method: HttpMethod.POST});
  }

  async put<Response = unknown>(props: MethodProps<Response>): Promise<Response> {
    return this.request<Response>({...props, method: HttpMethod.PUT});
  }

  async delete<Response = unknown>(props: MethodProps<Response>): Promise<Response> {
    return this.request<Response>({...props, method: HttpMethod.DELETE});
  }

  private async request<Response = unknown>(props: RequestProps<Response>): Promise<Response> {
    const url = new URL(props.path, this.apiUrl);

    if (isPagableRequest(props.data)) {
      Object.keys(props.data.pagination).forEach((key) =>
        url.searchParams.append(key, String(props.data.pagination[key]))
      );
    }

    const clientProps: HttpClientRequestMethodProps = {
      url: url.href,
      data: props.data,
      method: props.method
    }

    return this.clientRequestMethod<Response>(clientProps).then((data) => {
      if (isNotUndefined(props.typeguard) && !props.typeguard(data)) {
        throw TypeError('response does not match requested type');
      }

      return data;
    });
  }
}

export interface GetOne<Response> {
  getOne(id: number): Promise<Response>;
}

export interface GetAll<Request, Response> {
  getAll(search?: Request): Promise<Response>;
}

export interface Getter<OResponse, ARequest, AResponse> extends GetOne<OResponse>, GetAll<ARequest, AResponse> {
}

export interface Create<Request, Response> {
  create(data: Request): Promise<Response>;
}

export interface Update<Request, Response> {
  update(id: number, data: Request): Promise<Response>;
}

export interface Remove<Response> {
  remove(id: number): Promise<Response>;
}

export interface Modifier<CRequest, CResponse, URequest, UResponse, DResponse> extends Create<CRequest, CResponse>,
  Update<URequest, UResponse>,
  Remove<DResponse> {
}
