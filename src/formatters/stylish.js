import _ from 'lodash';

const indent = (depth, str = ' ', spacesCount = 4) => str.repeat((depth * spacesCount) - 2);

const makeString = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);

  const result = keys.map((key) => {
    const newKey = value[key];

    return `${indent(depth + 1)}  ${key}: ${makeString(newKey, depth + 1)}`;
  });

  return `{\n${result.join('\n')}\n  ${indent(depth)}}`;
};

const stylish = (data) => {
  const iter = (node, depth = 1) => {
    const result = node.map((item) => {
      switch (item.type) {
        case 'nested': {
          return `${indent(depth)}  ${item.key}: {\n${iter(item.children, depth + 1)}\n${indent(depth)}  }`;
        }
        case 'remove':
          return `${indent(depth)}- ${item.key}: ${makeString(item.val, depth)}`;
        case 'add':

          return `${indent(depth)}+ ${item.key}: ${makeString(item.val, depth)}`;
        case 'updated':

          return (`${indent(depth)}- ${item.key}: ${makeString(item.val1, depth)}\n${indent(depth)}+ ${item.key}: ${makeString(item.val2, depth)}`);
        case 'notUpdated':
          return `${indent(depth)}  ${item.key}: ${makeString(item.val, depth)}`;
        default:
          throw new Error(`Unknown type ${item.type}`);
      }
    });
    return result.join('\n');
  };
  return `{\n${iter(data)}\n}`;
};
export default stylish;
