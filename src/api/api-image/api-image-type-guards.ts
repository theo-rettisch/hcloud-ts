/**
 * @module Image
 */
import {
  CloudImage,
  CreatedFrom,
  GetAllImageResponse,
  GetOneImageResponse,
  ImageProtection,
  ImageStatus,
  ImageType,
  OsFlavour,
  RemoveImageResponse,
  UpdateImageResponse
} from "./api-image-types";
import {
  isArrayOf,
  isBool,
  isLabels,
  isMetaResponse,
  isNumber,
  isProtection,
  isString,
  optional,
  orNull
} from "../../type-guards";

export const isCloudImage = (value: unknown): value is CloudImage => {
  const cast = value as CloudImage
  return orNull(cast.bound_to, isNumber) &&
    isString(cast.created) &&
    isCreatedFrom(cast.created_from) &&
    orNull(cast.deleted, isString) &&
    orNull(cast.deprecated, isString) &&
    isString(cast.description) &&
    isNumber(cast.disk_size) &&
    isNumber(cast.id) &&
    orNull(cast.image_size, isNumber) &&
    isLabels(cast.labels) &&
    orNull(cast.name, isString) &&
    isOsFlavour(cast.os_flavor) &&
    orNull(cast.os_version, isString) &&
    isImageProtection(cast.protection) &&
    isBool(cast.rapid_deploy) &&
    isImageStatus(cast.status) &&
    isImageType(cast.type)
}

export const isCreatedFrom = (value: unknown): value is CreatedFrom => {
  const cast = value as CreatedFrom;
  return isString(cast.name) &&
    isNumber(cast.id);
}

export const isOsFlavour = (value: unknown): value is OsFlavour => {
  return Object.values(OsFlavour).includes(value as OsFlavour);
}

export const isImageProtection = (value: unknown): value is ImageProtection => {
  return isProtection(value);
}

export const isImageStatus = (value: unknown): value is ImageStatus => {
  return Object.values(ImageStatus).includes(value as ImageStatus);
}

export const isImageType = (value: unknown): value is ImageType => {
  return Object.values(ImageType).includes(value as ImageType);
}

export const isArrayOfCloudImage = (value: unknown): value is Array<CloudImage> => {
  return isArrayOf<CloudImage>(value, isCloudImage);
}

export const isGetAllCloudImageResponse = (value: unknown): value is GetAllImageResponse => {
  const cast = value as GetAllImageResponse;
  return isArrayOfCloudImage(cast.images) && optional(value, isMetaResponse);
}

export const isGetOneCloudImageResponse = (value: unknown): value is GetOneImageResponse => {
  const cast = value as GetOneImageResponse;
  return optional(cast.image, isCloudImage);
}

export const isUpdateCloudImageResponse = (value: unknown): value is UpdateImageResponse => {
  const cast = value as UpdateImageResponse;
  return optional(cast.image, isCloudImage);
}

export const isRemoveCloudImageResponse = (value: unknown): value is RemoveImageResponse => {
  const cast = value as RemoveImageResponse;
  return optional(cast.image, isCloudImage);
}
