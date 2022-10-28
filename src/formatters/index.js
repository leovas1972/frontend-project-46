import stylish from './stylish.js';
import plain from './plain.js';

const formats = {
  stylish,
  plain,
  json: JSON.stringify,
};

const format = (treeOfDifference, outputFormat) => formats[outputFormat](treeOfDifference);

export default format;
