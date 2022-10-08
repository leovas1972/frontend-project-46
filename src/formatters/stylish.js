import _ from 'lodash';

const getDataFromObject = (obj, depth) => {
  const entries = Object.entries(obj);

  const result = entries.map(([key, value]) => {
    const fourSpace = '    ';
    const tab = fourSpace.repeat(depth);
    if (_.isPlainObject(value)) {
      return `${tab}${key}: {\n${getDataFromObject(value, depth + 1)}\n${tab}}`;
    }

    return `${tab}${key}: ${value}`;
  });

  return result.join('\n');
};

const stylish = (data) => {
  const iter = (arr, depth) => {
    const fourSpace = '    ';
    const tab = fourSpace.repeat(depth);
    const tabRemove = `${fourSpace.repeat(depth).slice(0, -2)}- `;
    const tabAdd = `${fourSpace.repeat(depth).slice(0, -2)}+ `;

    const result = arr.map((item) => {
      if (item.type === 'nested') {
        return `${tab}${item.name}: {\n${iter(item.value, depth + 1)}\n${tab}}`;
      }

      if (item.type === 'changed') {
        const deletedValue = _.isPlainObject(item.value[0]) ? `{\n${getDataFromObject(item.value[0], depth + 1)}\n${tab}}` : `${item.value[0]}`;
        const addedValue = _.isPlainObject(item.value[1]) ? `{\n${getDataFromObject(item.value[1], depth + 1)}\n${tab}}` : `${item.value[1]}`;

        return `${tabRemove}${item.name}: ${deletedValue}\n${tabAdd}${item.name}: ${addedValue}`;
      }

      if (item.type === 'added') {
        const value = _.isPlainObject(item.value) ? `{\n${getDataFromObject(item.value, depth + 1)}\n${tab}}` : `${item.value}`;

        return `${tabAdd}${item.name}: ${value}`;
      }

      if (item.type === 'removed') {
        const value = _.isPlainObject(item.value) ? `{\n${getDataFromObject(item.value, depth + 1)}\n${tab}}` : `${item.value}`;
        return `${tabRemove}${item.name}: ${(value)}`;
      }

      return `${tab}${item.name}: ${item.value}`;
    });

    return result.join('\n');
  };

  return `{\n${iter(data, 1)}\n}`;
};

export default stylish;
