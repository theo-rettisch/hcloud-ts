/**
 * @module Firewall
 */
import {Labels, MetaResponse, OrNull, PagableRequest, Sort} from "../../types";

export enum AppliedToType {
  SERVER = 'server',
  LABEL_SELECTOR = 'label_selector'
}

export type AppliedToLabelSelector = { selector: string };
export type AppliedToServer = { id: number };

export enum AppliedToResourceType {
  SERVER = 'server'
}

export type AppliedToResource = { type: AppliedToResourceType, server: { id: number } };

export type AppliedTo = {
  type: AppliedToType
  server?: AppliedToServer;
  label_selector?: AppliedToLabelSelector;
  applied_to_resources?: Array<AppliedToResource>;
}

export enum RuleDirection {
  IN = 'in', OUT = 'out'
}

export type Rule = {
  protocol: string;
  direction: RuleDirection;
  description?: OrNull<string>;
  destination_ips?: Array<string>;
  port?: string;
  source_ips?: Array<string>;
}

export type Firewall = {
  applied_to: Array<AppliedTo>;
  created: string;
  id: number;
  labels: Labels;
  name: string;
  rules: Array<Rule>;
}

export type FirewallResponse = { firewall: Firewall };

export type GetOneFirewallResponse = FirewallResponse;

export type GetAllFirewallRequest = {
  name?: string;
  label_selector?: string;
  sort?: Array<Sort>;
} & PagableRequest;
export type GetAllFirewallResponse = Partial<MetaResponse> & { firewalls: Array<Firewall> }

export type CreateFirewallRequest = {
  applyTo?: Array<AppliedTo>,
  labels?: Labels,
  name: string;
  rules?: Array<Rule>
};

// TODO: actions object
export type CreateFirewallResponse = Partial<FirewallResponse> & { actions?: Array<string> };

export type UpdateFirewallRequest = { labels?: Labels, name?: string };
export type UpdateFirewallResponse = FirewallResponse;

export type RemoveFirewallResponse = FirewallResponse;

