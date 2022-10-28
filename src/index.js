import path from 'path';
import { readFileSync } from 'node:fs';
import buildTree from './buldTree.js';
import parseData from './parsers.js';
import format from './formatters/index.js';

const buildFullPath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);

const extractFormat = (filePath) => path.extname(filePath).slice(1);

const getData = (filePath) => parseData(readFileSync(filePath, 'utf-8'), extractFormat(filePath));

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = getData(buildFullPath(filepath1));
  const data2 = getData(buildFullPath(filepath2));

  const tree = buildTree(data1, data2);

  return format(outputFormat, tree);
};

export default genDiff;
