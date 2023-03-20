import {isArrayOfSort, isNull, isPagableRequest, isProtection, isSort, isStatus, isUndefined} from "../type-guards";
import {Protection, Sort, Status} from "../types";

describe('testing generic type-guards', () => {
  test('value should be keyof Status', () => {
    expect(isStatus(Status.OFF)).toBeTruthy();
  })

  test('value should be keyof Sort', () => {
    expect(isSort(Sort.CREATED_DESC)).toBeTruthy();
  })

  test('value should be array of Sort', () => {
    expect(isArrayOfSort([Sort.NAME_ASC, Sort.CREATED_DESC])).toBeTruthy();
  })

  test('object should be Protection', () => {
    const protection: Protection = {
      delete: true
    }
    expect(isProtection(protection)).toBeTruthy();
  })

  test('value should be null', () => {
    expect(isNull(null)).toBeTruthy();
  })

  test('value should be undefined', () => {
    expect(isUndefined(undefined)).toBeTruthy();
  })

  test('value should be PagableRequest', () => {
    expect(isPagableRequest({otherProps: true, pagination: {page: 1, per_page: 10}})).toBeTruthy();
  })
})
