/**
 * @module API Client
 */
import {Typeguard} from "./types";

export type HttpClientRequestMethodProps = {
  url: string,
  data?: any,
  method: HttpMethod
}

export type HttpClientRequestMethod = <Response>(props: HttpClientRequestMethodProps) => Promise<Response>;

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export type RequestProps<Response> = {
  method: HttpMethod,
  path: string,
  typeguard?: Typeguard<Response>,
  data?: any
};

export type MethodProps<Response> = Omit<RequestProps<Response>, 'method'>;
