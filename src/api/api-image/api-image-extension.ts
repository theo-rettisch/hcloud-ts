/**
 * @packageDocumentation
 * API extension for images
 * @see https://docs.hetzner.cloud/#images
 *
 * @module Image
 */
import {
  BackupRequest,
  BaseRequest,
  CloudImage,
  GetAllImageRequest,
  GetAllImageResponse,
  GetOneImageResponse,
  RemoveImageResponse,
  UpdateImageRequest,
  UpdateImageResponse
} from "./api-image-types";
import {MetaResponse} from "../../types";
import {
  isGetAllCloudImageResponse,
  isGetOneCloudImageResponse,
  isRemoveCloudImageResponse,
  isUpdateCloudImageResponse
} from "./api-image-type-guards";
import {Getter, Remove, Update} from "../../client";
import ApiExtension from "../api-extension";
import {normalizePath} from "../utils";

export interface ImageGetter extends Getter<GetOneImageResponse, GetAllImageRequest, GetAllImageResponse> {
}

export interface ImageModifier extends Update<UpdateImageRequest, UpdateImageResponse>, Remove<RemoveImageResponse> {
}

export default class ApiImageExtension extends ApiExtension implements ImageGetter, ImageModifier {
  private readonly extensionPath: string = 'images';

  /**
   * @see https://docs.hetzner.cloud/#images-get-all-images
   */
  getAll(search?: BaseRequest | BackupRequest): Promise<Partial<MetaResponse> & { images: Array<CloudImage> }> {
    return this.client.get({
      path: this.extensionPath,
      typeguard: isGetAllCloudImageResponse,
      data: search,
    });
  }

  /**
   * @see https://docs.hetzner.cloud/#images-get-an-image
   */
  getOne(id: number): Promise<GetOneImageResponse> {
    return this.client.get({
      path: normalizePath(this.extensionPath, id),
      typeguard: isGetOneCloudImageResponse,
    });
  }

  /**
   * @see https://docs.hetzner.cloud/#images-delete-an-image
   */
  remove(id: number): Promise<RemoveImageResponse> {
    return this.client.delete({
      path: normalizePath(this.extensionPath, id),
      typeguard: isRemoveCloudImageResponse
    })
  }

  /**
   * @see https://docs.hetzner.cloud/#images-update-an-image
   */
  update(id: number, data: UpdateImageRequest): Promise<UpdateImageResponse> {
    return this.client.put({
      path: normalizePath(this.extensionPath, id),
      typeguard: isUpdateCloudImageResponse,
      data
    });
  }

}
