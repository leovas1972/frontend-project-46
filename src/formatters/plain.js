import _ from 'lodash';

const plain = (data) => {
  const toString = (value) => {
    const str = typeof value === 'string' ? `'${value}'` : value;
    return str;
  };

  const iter = (arr, keys) => {
    const result = arr.map((item) => {
      if (item.type === 'nested') {
        return `${iter(item.value, [...keys, item.name])}`;
      }

      if (item.type === 'added') {
        item.value.toString();

        return _.isPlainObject(item.value) ? `Property '${[...keys, item.name].join('.')}' was added with value: [complex value]` : `Property '${[...keys, item.name].join('.')}' was added with value: ${toString(item.value)}`;
      }

      if (item.type === 'removed') {
        return `Property '${[...keys, item.name].join('.')}' was removed`;
      }

      if (item.type === 'changed') {
        if (_.isPlainObject(item.value[0])) {
          return `Property '${[...keys, item.name].join('.')}' was updated. From [complex value] to ${toString(item.value[1])}`;
        }
        if (_.isPlainObject(item.value[1])) {
          return `Property '${[...keys, item.name].join('.')}' was updated. From ${toString(item.value[0])} to [complex value]`;
        }

        return `Property '${[...keys, item.name].join('.')}' was updated. From ${toString(item.value[0])} to ${toString(item.value[1])}`;
      }
      return null;
    })
      .filter((element) => element != null)
      .join('\n');

    return result;
  };
  return iter(data, []);
};

export default plain;
