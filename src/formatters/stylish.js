import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (data, depth = 0) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const result = Object.entries(data).map(([key, value]) => {
    const beginSpace = indent(depth + 1);
    return `${beginSpace}  ${key}: ${stringify(value, depth + 1)}`;
  });
  const endSpace = indent(depth);
  return `{\n${result.join('\n')}\n  ${endSpace}}`;
};

const makeTree = (data, depth = 1) => {
  const typeMap = {
    nested: ({ key, children }) => {
      const child = makeTree(children, depth + 1);
      return `  ${indent(depth)}${key}: {\n${child}\n${indent(depth)}  }`;
    },
    unchanged: ({ key, value }) => `${indent(depth)}  ${key}: ${stringify(value, depth)}`,
    added: ({ key, value }) => `${indent(depth)}+ ${key}: ${stringify(value, depth)}`,
    removed: ({ key, value }) => `${indent(depth)}- ${key}: ${stringify(value, depth)}`,
    changed: ({ key, value2, value1 }) => {
      const added = `${indent(depth)}+ ${key}: ${stringify(value2, depth)}`;
      const removed = `${indent(depth)}- ${key}: ${stringify(value1, depth)}`;
      return `${removed}\n${added}`;
    },
  };
  const result = data.map((node) => {
    const { type } = node;
    return typeMap[type](node, depth);
  });
  return result.join('\n');
};

const stylishFormat = (data) => `{\n${makeTree(data)}\n}`;
export default stylishFormat;
