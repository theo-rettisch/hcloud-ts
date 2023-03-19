/**
 * @packageDocumentation
 * Basic API extension
 *
 * @module API Extension
 */
import Client from "../client";

export default class ApiExtension {
  protected client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}
