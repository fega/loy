type Primitive =
  | String
  | string
  | Number
  | Object
  | Boolean
  | 'Url'
  | 'File'
  | Date
  | [String]
  | [Number]
  | [Object]
  | [Boolean];

export const Test = '<>!-!_LOI_GENERATE_DESCRIPTIONS_!-!<>';

export const primitiveToString = (primitive: Primitive) => {
  if (primitive === 'Url') {
    return 'Url';
  } else if (primitive === 'File') {
    // @ts-ignore
  } else if (primitive.name) {
    // @ts-ignore
    return primitive.name;
  }
};

export const createTestObject = (keys: string[]) => {
  return keys.reduce((obj, key) => {
    obj[key] = Test;
    return obj;
  }, {});
};

export const getItem = (item, name) => {
  if (Array.isArray(item) && !item.length) return {};
  if (item === '' || item === undefined) return {};
  return { [name]: item };
};
