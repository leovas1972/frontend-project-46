import stylishFormat from './stylish.js';
import plainFormat from './plain.js';

const formats = {
  stylish: stylishFormat,
  plain: plainFormat,
  json: JSON.stringify,
};

const format = (tree, outputFormat) => formats[outputFormat](tree);

export default format;
