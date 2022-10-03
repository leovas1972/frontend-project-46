import { describe, expect, test } from '@jest/globals';
import findDifference from '../src/index.js';

describe('Test for JSON file', () => {
  const fileJson1 = 'file1.json';
  const fileJson2 = 'file2.json';

  test('testing function findDifference', () => {
    const actual = findDifference(fileJson1, fileJson2);
    expect(actual).toEqual({
      '-follow': false,
      host: 'hexlet.io',
      '-proxy': '123.234.53.22',
      '-timeout': 50,
      '+timeout': 20,
      '+verbose': true,
    });
  });
});

describe('Test for YML file', () => {
  const fileYml1 = 'file1.yml';
  const fileYml2 = 'file2.yml';

  test('testing function findDifference', () => {
    const actual = findDifference(fileYml1, fileYml2);
    expect(actual).toEqual({
      '-follow': false,
      host: 'hexlet.io',
      '-proxy': '123.234.53.22',
      '-timeout': 50,
      '+timeout': 20,
      '+verbose': true,
    });
  });
});
