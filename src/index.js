import path from 'path';
import buildTree from "./buldTree.js";
import { buildFullPath, readFile, defineFileType, parseFile } from './utils.js';

const findDifference = (filepath1, filepath2) => {
  const fileType1 = defineFileType(filepath1);
  const fileType2 = defineFileType(filepath2);
  const data1 = parseFile(fileType1, readFile(buildFullPath(filepath1)));
  const data2 = parseFile(fileType2, readFile(buildFullPath(filepath2)));
 
  const tree = buildTree(data1, data2);
  return tree;
};

export default findDifference;
