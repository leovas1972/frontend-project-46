// import path from 'path';
import buildTree from './buldTree.js';
import {
  buildFullPath, readFile, parseFile,
} from './utils.js';

const findDifference = (filepath1, filepath2) => {
  const data1 = parseFile(readFile(buildFullPath(filepath1)));
  const data2 = parseFile(readFile(buildFullPath(filepath2)));

  const tree = buildTree(data1, data2);
  return tree;
};

export default findDifference;
