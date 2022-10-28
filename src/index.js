import path from 'path';
import { readFileSync } from 'node:fs';
import buildTree from './buldTree.js';
import parseData from './parsers.js';
import format from './formatters/index.js';

const buildFullPath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);

const extractFormat = (filepath) => path.extname(filepath).slice(1);

const getData = (filepath) => parseData(readFileSync(filepath, 'utf-8'), extractFormat(filepath));

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = getData(buildFullPath(filepath1));
  const data2 = getData(buildFullPath(filepath2));

  const tree = buildTree(data1, data2);

  return format(tree, outputFormat);
};

export default genDiff;
