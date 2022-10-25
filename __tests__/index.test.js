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

const stylish = readFile('stylish.txt');
const plain = readFile('plain.txt');
const json = readFile('json.txt');

describe('output formats', () => {
  it('json', () => {
    expect(genDiff('file1.json', 'file2.json')).toBe(stylish);
    expect(genDiff('file1.json', 'file2.json', 'stylish')).toBe(stylish);
    expect(genDiff('file1.json', 'file2.json', 'json')).toBe(json);
  });
});

describe('output formats yml', () => {
  it('yml', () => {
    expect(genDiff('file1.yml', 'file2.yml')).toBe(stylish);
    expect(genDiff('file1.yml', 'file2.yml', 'stylish')).toBe(stylish);
  });
});

describe('output formats plain', () => {
  it('plain', () => {
    expect(genDiff('file1.json', 'file2.json', 'plain')).toBe(plain);
  });
});
