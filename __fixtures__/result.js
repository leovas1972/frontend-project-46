export const json = '[{"name":"common","type":"nested","value":[{"name":"follow","type":"added","value":false},{"name":"setting1","type":"unchanged","value":"Value 1"},{"name":"setting2","type":"removed","value":200},{"name":"setting3","type":"changed","value":[true,null]},{"name":"setting4","type":"added","value":"blah blah"},{"name":"setting5","type":"added","value":{"key5":"value5"}},{"name":"setting6","type":"nested","value":[{"name":"doge","type":"nested","value":[{"name":"wow","type":"changed","value":["","so much"]}]},{"name":"key","type":"unchanged","value":"value"},{"name":"ops","type":"added","value":"vops"}]}]},{"name":"group1","type":"nested","value":[{"name":"baz","type":"changed","value":["bas","bars"]},{"name":"foo","type":"unchanged","value":"bar"},{"name":"nest","type":"changed","value":[{"key":"value"},"str"]}]},{"name":"group2","type":"removed","value":{"abc":12345,"deep":{"id":45}}},{"name":"group3","type":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}]';
export const yml = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
