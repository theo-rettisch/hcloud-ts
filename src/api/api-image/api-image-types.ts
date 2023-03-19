/**
 * @module Image
 */
import {Labels, MetaResponse, Overwrite, PagableRequest, Protection, Sort} from "../../types";

export type CreatedFrom = {
  id: number;
  name: string;
}

export type ImageProtection = Protection;

export enum OsFlavour {
  UBUNTU = 'ubuntu', CENTOS = 'centos', DEBIAN = 'debian', FEDORA = 'fedora', UNKNOWN = 'unknown'
}

export enum ImageStatus {
  AVAILABLE = 'available', CREATING = 'creating', UNAVAILABLE = 'unavailable'
}

export enum ImageType {
  SYSTEM = 'system', APP = 'app', SNAPSHOT = 'snapshot', BACKUP = 'backup', TEMPORARY = 'temporary'
}

export type CloudImage = {
  bound_to: number | null;
  created: string;
  created_from: CreatedFrom;
  deleted: string | null;
  deprecated: string | null;
  description: string;
  disk_size: number;
  id: number;
  image_size: number | null;
  labels: Labels;
  name: string | null;
  os_flavor: OsFlavour;
  os_version: string | null;
  protection: ImageProtection;
  rapid_deploy: boolean;
  status: ImageStatus;
  type: ImageType;
}

export type BaseRequest = {
  sort?: Array<Sort>;
  type?: ImageType;
  status?: 'available' | 'creating';
  include_deprecated?: boolean;
  name?: string;
  label_selector?: string;
} & PagableRequest

export type BackupRequest = Overwrite<BaseRequest, { type: 'backup' }> & {
  bound_to?: string;
}

export type ImageResponse = { image: CloudImage };

export type GetOneImageResponse = Partial<ImageResponse>;
export type GetAllImageRequest = BaseRequest | BackupRequest;
export type GetAllImageResponse = Partial<MetaResponse> & { images: Array<CloudImage> };

export type UpdateImageRequest = { description?: string, labels?: Labels, type: 'snapshot' };
export type UpdateImageResponse = Partial<ImageResponse>;

export type RemoveImageResponse = Partial<ImageResponse>;
