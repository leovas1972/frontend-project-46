import stylishFormat from './stylish.js';
import plainFormat from './plain.js';

const formats = {
  stylish: stylishFormat,
  plain: plainFormat,
  json: JSON.stringify,
};

const format = (treeOfDifference, outputFormat) => formats[outputFormat](treeOfDifference);

export default format;
