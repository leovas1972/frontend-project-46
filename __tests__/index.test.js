import {
  expect, describe, it,
} from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultStylish = readFile('stylish.txt');
const resultPlain = readFile('plain.txt');
const resultJson = readFile('json.txt');

describe('genDiff', () => {
  it('json', () => {
    expect(genDiff('file1.json', 'file2.json')).toBe(resultStylish);
    expect(genDiff('file1.json', 'file2.json', 'stylish')).toBe(resultStylish);
    expect(genDiff('file1.json', 'file2.json', 'json')).toBe(resultJson);
    expect(genDiff('file1.json', 'file2.json', 'plain')).toBe(resultPlain);
  });

  it('yml', () => {
    expect(genDiff('file1.yml', 'file2.yml')).toBe(resultStylish);
    expect(genDiff('file1.yml', 'file2.yml', 'stylish')).toBe(resultStylish);
    expect(genDiff('file1.yml', 'file2.yml', 'json')).toBe(resultJson);
    expect(genDiff('file1.yml', 'file2.yml', 'plain')).toBe(resultPlain);
  });
});
