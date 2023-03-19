import {
  isCloudImage,
  isGetAllCloudImageResponse,
  isGetOneCloudImageResponse,
  isRemoveCloudImageResponse,
  isUpdateCloudImageResponse
} from "../api-image-type-guards";
import {
  CloudImage,
  GetAllImageResponse,
  GetOneImageResponse,
  ImageStatus,
  ImageType,
  OsFlavour,
  RemoveImageResponse,
  UpdateImageResponse
} from "../api-image-types";

export const validCloudImage: CloudImage = {
  id: 1,
  name: 'cloud-image',
  labels: {
    'cloud-image-label': ''
  },
  created: 'created',
  type: ImageType.SYSTEM,
  description: 'description',
  image_size: 123,
  deprecated: 'deprecated',
  bound_to: 1,
  deleted: 'deleted',
  created_from: {
    id: 1,
    name: 'created_from'
  },
  disk_size: 1,
  os_flavor: OsFlavour.DEBIAN,
  os_version: '1.2.3',
  protection: {
    delete: false
  },
  status: ImageStatus.CREATING,
  rapid_deploy: false
};

export const getOneImageResponse: GetOneImageResponse = {
  image: validCloudImage
}

export const getAllImageResponse: GetAllImageResponse = {
  meta: {
    pagination: {
      page: 1,
      last_page: 1,
      next_page: 1,
      per_page: 1,
      previous_page: 1,
      total_entries: 1
    }
  },
  images: [validCloudImage]
}

export const updateImageResponse: UpdateImageResponse = {
  image: validCloudImage
}

export const removeImageResponse: RemoveImageResponse = {
  image: validCloudImage
}

describe('testing images type-guards', () => {
  test('object should be CloudImage', () => {
    expect(isCloudImage(validCloudImage));
  })

  test('object should be GetOneImageResponse', () => {
    expect(isGetOneCloudImageResponse(getOneImageResponse));
  })

  test('object should be GetAllImageResponse', () => {
    expect(isGetAllCloudImageResponse(getAllImageResponse));
  })

  test('object should be UpdateImageResponse', () => {
    expect(isUpdateCloudImageResponse(updateImageResponse));
  })

  test('object should be RemoveImageResponse', () => {
    expect(isRemoveCloudImageResponse(removeImageResponse));
  })
});
