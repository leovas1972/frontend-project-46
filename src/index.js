// import path from 'path';
import buildTree from './buldTree.js';
import {
  buildFullPath, readFile, defineFileType,
} from './utils.js';
import parseData from './parsers.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const filePath1 = buildFullPath(filepath1);
  const filePath2 = buildFullPath(filepath2);

  const fileValue1 = readFile(filePath1);
  const fileValue2 = readFile(filePath2);

  const fileType1 = defineFileType(filepath1);
  const fileType2 = defineFileType(filepath2);

  const data1 = parseData(fileValue1, fileType1);
  const data2 = parseData(fileValue2, fileType2);

  const tree = buildTree(data1, data2);

  return format(outputFormat, tree);
};

export default genDiff;
