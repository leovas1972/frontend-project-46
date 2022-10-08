import _ from 'lodash';

const buildTree = (fileData1, fileData2) => {
  const keys = _.sortBy(_.union(_.keys(fileData1), _.keys(fileData2)));
  const result = keys.map((key) => {
    const valueData1 = fileData1[key];
    const valueData2 = fileData2[key];

    if (typeof valueData1 === 'object' && typeof valueData2 === 'object') {
      return {
        name: key,
        type: 'nested',
        value: buildTree(valueData1, valueData2),
      };
    }
    if (_.has(fileData1, key) && _.has(fileData2, key)) {
      if (valueData1 === valueData2) {
        return {
          name: key,
          type: 'unchanged',
          value: valueData1,
        };
      }
      if (valueData1 !== valueData2) {
        return {
          name: key,
          type: 'changed',
          value: [valueData1, valueData2],
        };
      }
    }
    if (_.has(fileData1, key) && !_.has(fileData2, key)) {
      return {
        name: key,
        type: 'removed',
        value: valueData1,
      };
    }
    if (!_.has(fileData1, key) && _.has(fileData2, key)) {
      return {
        name: key,
        type: 'added',
        value: valueData2,
      };
    }
    return null;
  });

  return result;
};

export default buildTree;
