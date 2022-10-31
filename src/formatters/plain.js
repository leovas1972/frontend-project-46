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

const plainFormat = (data, ancestors = []) => {
  const typeMap = {
    unchanged: () => null,
    added: ({ value }, path) => `Property '${path.join('.')}' was added with value: ${stringify(value)}`,
    removed: (none, path) => `Property '${path.join('.')}' was removed`,
    changed: ({ value2, value1 }, path) => (
      `Property '${path.join('.')}' was updated. From ${stringify(value1)} to ${stringify(value2)}`),
    nested: ({ children }, path) => plainFormat(children, path),
  };

  const result = data.map((node) => {
    const { key, type } = node;
    const newAncestors = [...ancestors, key];
    return typeMap[type](node, newAncestors);
  });

  return _.compact(_.flatten(result)).join('\n');
};

export default plainFormat;
