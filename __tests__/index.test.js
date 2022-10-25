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

const stylishFormat = 'stylish';
const jsonFormat = 'json';
const plainFormat = 'plain';

describe('output formats', () => {
  test('stylish files', () => {
    expect(findDifference('file1.json', 'file2.json', stylishFormat)).toBe(stylish);
  });
  test('json files default', () => {
    expect(findDifference('file1.json', 'file2.json')).toBe(stylish);
  });
  test('json files string', () => {
    expect(findDifference('file1.json', 'file2.json', jsonFormat)).toBe(json);
  });
  test('yaml files', () => {
    expect(findDifference('file1.yml', 'file2.yml', stylishFormat)).toBe(stylish);
  });
  test('plain files', () => {
    expect(findDifference('file1.json', 'file2.json', plainFormat)).toBe(plain);
  });
});
