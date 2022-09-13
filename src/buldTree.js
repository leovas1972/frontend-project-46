import _ from 'lodash';

const buildTree = (fileData1, fileData2) => {
  const keys = _.union(_.keys(fileData1), _.keys(fileData2));
  const sortedKeys = _.sortBy(keys);
  const tree = sortedKeys.map((key) => {
    if (!_.has(fileData1, key)) {
      return [`+${key}`, fileData2[key]];
    }
    if (!_.has(fileData2, key)) {
      return [`-${key}`, fileData1[key]];
    }
    
    if (_.isEqual(fileData1[key], fileData2[key])) {
      return [`${key}`, fileData1[key]];
    }
    return [[`-${key}`, fileData1[key]], [`+${key}`, fileData2[key]]].flat()
  }); 
  const newTree = _.chunk((tree.flat()),2);
  const newObject = Object.fromEntries(newTree)
  return newObject;
};

export default buildTree;