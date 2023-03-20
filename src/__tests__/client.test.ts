import Client from "../client";
import {PagableRequest} from "../types";
import {isString} from "../type-guards";

describe('testing client', () => {

  test('client can be instantiated', async () => {
    const cb = <T>() => Promise.resolve(null as T);
    const client = new Client(cb);
    expect(client).toBeInstanceOf(Client);
  });

  test('pagable request successful processed', async () => {
    type Res = {
      id: number
    }

    const resData: Res = {id: 123}
    const cb = <T>() => Promise.resolve(resData as T);
    const client = new Client(cb);

    const response = await client.get<Res>({
      path: '/test/',
      data: {
        pagination: {
          page: 1,
          per_page: 15
        }
      } as PagableRequest
    })

    expect(response).toBe(resData);
  });

  test('falsy typeguard', async () => {
    type Res = {
      id: number
    }

    const resData: Res = {id: 123}
    const cb = <T>() => Promise.resolve(resData as T);
    const client = new Client(cb);

    const callGet = () => client.get<Res>({
      path: '/test/',
      data: {},
      typeguard: (value: unknown): value is Res => isString((value as Res)?.id)
    })

    await expect(callGet()).rejects.toThrowError('response does not match requested type');
  });
});
