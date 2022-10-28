import stylish from './stylish.js';
import plain from './plain.js';

const format = (treeOfDifference, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(treeOfDifference);
    case 'plain':
      return plain(treeOfDifference);
    case 'json':
      return JSON.stringify(treeOfDifference);
    default:
      throw new Error(`${outputFormat} is wrong format type`);
  }
};

export default format;
