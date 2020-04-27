/// <reference path= "../../node_modules/@types/jest/index.d.ts" />
import { sum } from '../../src';

describe('sum', () => {
  it('works', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});

