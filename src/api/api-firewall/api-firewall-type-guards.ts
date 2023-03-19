/**
 * @module Firewall
 */
import {
  AppliedTo,
  AppliedToLabelSelector,
  AppliedToResource,
  AppliedToResourceType,
  AppliedToServer,
  AppliedToType,
  CreateFirewallRequest,
  CreateFirewallResponse,
  Firewall,
  GetAllFirewallResponse,
  GetOneFirewallResponse,
  RemoveFirewallResponse,
  Rule,
  RuleDirection,
  UpdateFirewallResponse
} from "./api-firewall-types";
import {
  isArrayOf,
  isArrayOfString,
  isLabels,
  isMetaResponse,
  isNumber,
  isString,
  optional,
  orNull
} from "../../type-guards";

export const isGetAllFirewallResponse = (value: unknown): value is GetAllFirewallResponse => {
  const cast = value as GetAllFirewallResponse;
  return isArrayOfFirewall(cast.firewalls) && optional(value, isMetaResponse);
}

export const isGetOneFirewallResponse = (value: unknown): value is GetOneFirewallResponse => {
  const cast = value as GetOneFirewallResponse;
  return isFirewall(cast.firewall);
}

export const isCreateFirewallRequest = (value: unknown): value is CreateFirewallRequest => {
  const cast = value as CreateFirewallRequest;
  return isString(cast.name) &&
    optional(cast.labels, isLabels) &&
    optional(cast.rules, isArrayOfRule) &&
    optional(cast.applyTo, isArrayOfAppliedTo);
}

export const isCreateFirewallResponse = (value: unknown): value is CreateFirewallResponse => {
  const cast = value as CreateFirewallResponse;
  return optional(cast.firewall, isFirewall) &&
    optional(cast.actions, isArrayOfString);
}

export const isUpdateFirewallResponse = (value: unknown): value is UpdateFirewallResponse => {
  const cast = value as UpdateFirewallResponse;
  return optional(cast.firewall, isFirewall);
}

export const isRemoveFirewallResponse = (value: unknown): value is RemoveFirewallResponse => {
  const cast = value as RemoveFirewallResponse;
  return optional(cast.firewall, isFirewall);
}

const isArrayOfFirewall = (value: unknown): value is Array<Firewall> => {
  return isArrayOf<Firewall>(value, isFirewall);
}

export const isFirewall = (value: unknown): value is Firewall => {
  const cast = value as Firewall;
  return isNumber(cast.id) &&
    isString(cast.name) &&
    isArrayOfAppliedTo(cast.applied_to) &&
    isString(cast.created) &&
    isArrayOfRule(cast.rules) &&
    isLabels(cast.labels)
}

export const isAppliedToServer = (value: unknown): value is AppliedToServer => {
  const cast = value as AppliedToServer;
  return isNumber(cast.id);
}

export const isAppliedToType = (value: unknown): value is AppliedToType => {
  return Object.values(AppliedToType).includes(value as AppliedToType);
}

export const isAppliedToLabelSelector = (value: unknown): value is AppliedToLabelSelector => {
  const cast = value as AppliedToLabelSelector;
  return isString(cast.selector);
}

export const isAppliedToResourceType = (value: unknown): value is AppliedToResourceType => {
  return Object.values(AppliedToResourceType).includes(value as AppliedToResourceType);
}

export const isAppliedToResource = (value: unknown): value is AppliedToResource => {
  const cast = value as AppliedToResource;
  return isAppliedToResourceType(cast.type) &&
    isAppliedToServer(cast.server)
}

export const isArrayOfAppliedToResource = (value: unknown): value is Array<AppliedToResource> => {
  return isArrayOf<AppliedToResource>(value, isAppliedToResource);
}

export const isAppliedTo = (value: unknown): value is AppliedTo => {
  const cast = value as AppliedTo;
  return isAppliedToType(cast.type) &&
    optional(cast.server, isAppliedToServer) &&
    optional(cast.label_selector, isAppliedToLabelSelector) &&
    optional(cast.applied_to_resources, isArrayOfAppliedToResource)
}

export const isArrayOfAppliedTo = (value: unknown): value is Array<AppliedTo> => {
  return isArrayOf<AppliedTo>(value, isAppliedTo);
}

export const isRuleDirection = (value: unknown): value is RuleDirection => {
  return Object.values(RuleDirection).includes(value as RuleDirection);
}

export const isRule = (value: unknown): value is Rule => {
  const cast = value as Rule;
  return isString(cast.protocol) &&
    isRuleDirection(cast.direction) &&
    optional(cast.description, (d): d is string | null => orNull(d, isString)) &&
    optional(cast.destination_ips, isArrayOfString) &&
    optional(cast.port, isString) &&
    optional(cast.source_ips, isArrayOfString)
}

export const isArrayOfRule = (value: unknown): value is Array<Rule> => {
  return isArrayOf<Rule>(value, isRule);
}
