import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import findDifference from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylish = readFile('stylish.txt');
const plain = readFile('plain.txt');
const json = readFile('json.txt');
const yml = readFile('yml.txt');

const fileJson1 = 'file1.json';
const fileJson2 = 'file2.json';
const fileYaml1 = 'file1.yml';
const fileYaml2 = 'file2.yml';

const stylishFormat = 'stylish';
const jsonFormat = 'json';
const plainFormat = 'plain';

describe('output formats', () => {
  test('stylish files', () => {
    expect(findDifference(fileJson1, fileJson2, stylishFormat)).toBe(stylish);
  });
  test('json files default', () => {
    expect(findDifference(fileJson1, fileJson2)).toBe(stylish);
  });
  test('json files string', () => {
    expect(findDifference(fileJson1, fileJson2, jsonFormat)).toBe(json);
  });
  test('yaml files', () => {
    expect(findDifference(fileYaml1, fileYaml2, stylishFormat)).toBe(yml);
  });
  test('plain files', () => {
    expect(findDifference(fileJson1, fileJson2, plainFormat)).toBe(plain);
  });
});
