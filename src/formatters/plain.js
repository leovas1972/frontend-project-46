import _ from 'lodash';

const stringify = (value) => {
  if (value === null) {
    return value;
  }

  if (typeof value === 'object') {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (data, ancestors = []) => {
  const typeMap = {
    unchanged: () => null,
    added: ({ value }, path) => `Property '${path.join('.')}' was added with value: ${stringify(value)}`,
    removed: (none, path) => `Property '${path.join('.')}' was removed`,
    changed: ({ addedValue, removedValue }, path) => (
      `Property '${path.join('.')}' was updated. From ${stringify(removedValue)} to ${stringify(addedValue)}`),
    nested: ({ children }, path) => plain(children, path),
  };

  const result = data.map((node) => {
    const { key, type } = node;
    const newAncestors = [...ancestors, key];
    return typeMap[type](node, newAncestors);
  });

  return _.compact(_.flatten(result)).join('\n');
};

export default plain;
