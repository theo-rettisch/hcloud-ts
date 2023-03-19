import Client from "../client";
import {PagableRequest} from "../types";
import {isString} from "../type-guards";

describe('testing client', () => {

  test('client can be instantiated', async () => {
    const client = new Client(<T>() => Promise.resolve() as Promise<T>);
    expect(client).toBeInstanceOf(Client);
  });

  test('pagable request successful processed', async () => {
    type Res = {
      id: number
    }

    const resData: Res = {id: 123}

    const client = new Client(<T = Res>(): Promise<T> => Promise.resolve(resData) as Promise<T>);

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

    const client = new Client(<T = Res>(): Promise<T> => Promise.resolve(resData) as Promise<T>);

    const callGet = () => client.get<Res>({
      path: '/test/',
      data: {},
      typeguard: (value: unknown): value is Res => isString((value as Res)?.id)
    })

    await expect(callGet()).rejects.toThrowError('response does not match requested type');
  });
});
