import { test, expect, describe } from '@jest/globals';
import findDifference from '../src/index.js';
import { json, stylish, yml } from '../__fixtures__/result.js';

const fileJson1 = 'file1.json';
const fileJson2 = 'file2.json';
const fileYaml1 = 'file1.yml';
const fileYaml2 = 'file2.yml';

const stylishFormat = 'stylish';
const jsonFormat = 'json';

describe('stylish output', () => {
  test('stylish files', () => {
    expect(findDifference(fileJson1, fileJson2, stylishFormat)).toBe(stylish);
  });
  test('json files ', () => {
    expect(findDifference(fileJson1, fileJson2, jsonFormat)).toBe(json);
  });
  test('yaml files', () => {
    expect(findDifference(fileYaml1, fileYaml2, stylishFormat)).toBe(yml);
  });
});
