import stylish from './stylish.js';
import plain from './plain.js';

const format = (type, treeOfDifference) => {
  switch (type) {
    case 'stylish':
      return stylish(treeOfDifference);
    case 'plain':
      return plain(treeOfDifference);
    case 'json':
      return JSON.stringify(treeOfDifference);
    default:
      throw new Error(`${type} is wrong format type`);
  }
};

export default format;
