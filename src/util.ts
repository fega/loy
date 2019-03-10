type Primitive = String
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
  | [Boolean]

export const primitiveToString = (primitive: Primitive) => {
  if (primitive === 'Url') {
    return 'Url'
  } else if (primitive === 'File') {
    // @ts-ignore
  } else if (primitive.name) {
    // @ts-ignore
    return primitive.name
  }
}
