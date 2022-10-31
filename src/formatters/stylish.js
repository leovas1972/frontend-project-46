const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (obj, depth = 0) => {
  const iter = (currentValue, currentDepth) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return String(currentValue);
    }
    const result = Object.entries(currentValue).map(([key, value]) => {
      const beginSpace = getIndent(currentDepth + 1);
      return `${beginSpace}  ${key}: ${stringify(value, currentDepth + 1)}`;
    });
    const endSpace = getIndent(currentDepth);
    return `{\n${result.join('\n')}\n  ${endSpace}}`;
  };

  return iter(obj, depth);
};

const makeTree = (data, depth = 1) => {
  const typeMap = {
    nested: ({ key, children }) => {
      const child = makeTree(children, depth + 1);
      return `  ${getIndent(depth)}${key}: {\n${child}\n${getIndent(depth)}  }`;
    },
    unchanged: ({ key, value }) => `${getIndent(depth)}  ${key}: ${stringify(value, depth)}`,
    added: ({ key, value }) => `${getIndent(depth)}+ ${key}: ${stringify(value, depth)}`,
    removed: ({ key, value }) => `${getIndent(depth)}- ${key}: ${stringify(value, depth)}`,
    changed: ({ key, value2, value1 }) => {
      const added = `${getIndent(depth)}+ ${key}: ${stringify(value2, depth)}`;
      const removed = `${getIndent(depth)}- ${key}: ${stringify(value1, depth)}`;
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
