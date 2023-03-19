import Client from "./client";
import ApiExtension from "./api/api-extension";

export const wrapClient = <WRAP_CLIENT_RESPONSE>(response: WRAP_CLIENT_RESPONSE) => new Client(<R = WRAP_CLIENT_RESPONSE>() => Promise.resolve(response) as Promise<R>)

export const wrapApiExtension = <EXTENSION extends ApiExtension, WRAP_CLIENT_RESPONSE>(apiExtensionClass: new(c: Client) => EXTENSION, response: WRAP_CLIENT_RESPONSE) => {
  const client = wrapClient(response);
  return new apiExtensionClass(client);
}
