//import { fileURLToPath } from 'url';
//import path, { dirname } from 'path';
import { buildFullPath } from '../src/utils.js'
import { describe, expect, test } from '@jest/globals';
import findDifference from '../src/index.js';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
//const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Test for JSON file', () => {
  const fileJson1 = buildFullPath('file1.json');
  const fileJson2 = buildFullPath('file2.json');

  test('testing function findDifference', () => {
    const actual = findDifference(fileJson1, fileJson2);
    expect(actual).toEqual({
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    });
  });
});
