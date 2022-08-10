import { validate } from '@babel/types';
import { isObjEmpty, isEmpty } from './utils';

describe('isObjEmpty', () => {
  const emptyObj = {};
  const singleKeyObj = { testKey: 'testValue' };
  const multiKeyObj = { testKey: 'testValue', anotherKey: 'anotherValue' };

  test('Returns a boolean', () => {
    expect([true, false]).toContain(isObjEmpty(emptyObj));
    expect([true, false]).toContain(isObjEmpty(singleKeyObj));
    expect([true, false]).toContain(isObjEmpty(multiKeyObj));
  });

  test('Returns true for an empty object', () => {
    expect(isObjEmpty(emptyObj)).toBeTruthy();
    expect(isObjEmpty(emptyObj)).toBe(true);
  });

  test('Returns false for an non-empty object', () => {
    expect(isObjEmpty(singleKeyObj)).toBeFalsy();
    expect(isObjEmpty(singleKeyObj)).toBe(false);
    expect(isObjEmpty(multiKeyObj)).toBeFalsy();
    expect(isObjEmpty(multiKeyObj)).toBe(false);
  });
});

describe('isEmpty', () => {
  const emptyObj = {};
  const singleKeyObj: Record<string, string> = { testKey: 'testValue' };
  const multiKeyObj: Record<string, string> = { testKey: 'testValue', anotherKey: 'anotherValue' };
  const emptyArray: unknown[] = [];
  const numberArray: number[] = [1, 2, 3];
  const stringArray: string[] = ['a', 'b', 'c'];
  const emptyString: string = '';
  const string: string = 'abc';
  const validDate: Date = new Date();
  const invalidDate: Date = new Date('nothing');

  test('Returns a boolean', () => {
    expect([true, false]).toContain(isEmpty(emptyObj));
    expect([true, false]).toContain(isEmpty(multiKeyObj));
  });

  test('Returns true for empty object', () => {
    expect(isEmpty(emptyObj)).toEqual(true);
  });

  test('Returns false for non-empty object', () => {
    expect(isEmpty(singleKeyObj)).toEqual(false);
    expect(isEmpty(multiKeyObj)).toEqual(false);
  });

  test('Returns true for empty array', () => {
    expect(isEmpty(emptyArray)).toEqual(true);
  });

  test('Returns false for non-empty array', () => {
    expect(isEmpty(stringArray)).toEqual(false);
    expect(isEmpty(numberArray)).toEqual(false);
  });

  test('Returns true for an invalid Date', () => {
    expect(isEmpty(invalidDate)).toEqual(true);
  });

  test('Returns false for valid Date', () => {
    expect(isEmpty(validDate)).toEqual(false);
  });

  test('Returns true for an empty string', () => {
    expect(isEmpty(emptyString)).toEqual(true);
  });

  test('Returns false for string', () => {
    expect(isEmpty(string)).toEqual(false);
  });

  test('Returns false for any number', () => {
    expect(isEmpty(0)).toEqual(false);
    expect(isEmpty(10)).toEqual(false);
    expect(isEmpty(-10)).toEqual(false);
  });
});
