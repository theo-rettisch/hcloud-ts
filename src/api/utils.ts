/**
 * @module API Extension
 */
import {isNumber, isString, or} from "../type-guards";

export const normalizePath = (...parts: Array<string | number | undefined>): string => {
  return parts.filter(or(isString, isNumber)).map((part) => {
    if (isString(part)) {
      if (part.startsWith('/')) {
        part = part.slice(1);
      }

      if (part.endsWith('/')) {
        part = part.slice(0, -1);
      }
    }
    return part;
  }).join('/');
}
