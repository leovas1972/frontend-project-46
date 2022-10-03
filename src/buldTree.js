import _ from 'lodash';

const buildTree = (fileData1, fileData2) => {
  const keys = _.union(_.keys(fileData1), _.keys(fileData2));
  const sortedKeys = _.sortBy(keys);
  const tree = sortedKeys.map((key) => {
    if (!_.has(fileData1, key)) {
      return { type: 'add', key, val: fileData2[key] };
    }
    if (!_.has(fileData2, key)) {
      return { type: 'remove', key, val: fileData1[key] };
    }
    if (_.isPlainObject(fileData1[key]) && _.isPlainObject(fileData2[key])) {
      return { type: 'nested', key, children: buildTree(fileData1[key], fileData2[key]) };
    }
    if (!_.isEqual(fileData1[key], fileData2[key])) {
      return {
        type: 'updated', key, val1: fileData1[key], val2: fileData2[key],
      };
    }
    return { type: 'notUpdated', key, val: fileData1[key] };
  });

  return tree;
};

export default buildTree;
