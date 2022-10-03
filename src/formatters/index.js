import stylish from './stylish.js';

const format = (type, treeOfDifference) => {
  switch (type) {
    case 'stylish':
      return stylish(treeOfDifference);
    case 'json':
      console.log('$', JSON.stringify(treeOfDifference));

      return JSON.stringify(treeOfDifference);
    default:
      throw new Error(`${type} is wrong format type`);
  }
};

export default format;
