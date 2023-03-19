import {normalizePath} from "../utils";

describe('testing api extension utils', () => {
  test('normalizePath returns valid url path', async () => {
    expect(normalizePath('/start', 'center', 'end/')).toBe('start/center/end')
  });
});
