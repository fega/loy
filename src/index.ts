import { createTestObject, getItem } from './util';

type Colors =
  | 'red'
  | 'pink'
  | 'purple'
  | 'deep-purple'
  | 'indigo'
  | 'blue'
  | 'light-blue'
  | 'cyan'
  | 'teal'
  | 'green'
  | 'light-green'
  | 'lime'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'deep-orange'
  | 'brown'
  | 'blue-grey'
  | 'grey'
  | 'white'
  | 'black';

export const Test = '<>!-!_LOI_GENERATE_DESCRIPTIONS_!-!<>';
export const DateItem = 'loi_internal_Date';
export const Url = 'loi_internal_Url';
export const File = 'loi_internal_File';
export const Image = 'loi_internal_Image';
export const Enum = 'loi_internal_Enum';

/**
 * Return a result
 * @param result expected result
 * @param user user object
 * @param state state
 */
export function Give(
  result: any,
  user?: any,
  state: any = { permissions: [], examples: [], type: [] }
) {
  return {
    // returns value
    ok() {
      if (result === Test) {
        const { previous, ...rest } = state;
        return {
          ...getItem(rest.permissions, 'permissions'),
          ...getItem(rest.examples, 'examples'),
          ...getItem(rest.type, 'type'),
          ...getItem(rest.format, 'format'),
          ...getItem(rest.description, 'description')
        };
      }
      if (state.permissions.length && !user) return undefined;
      if (state.permissions.length && !user.permissions) return undefined;
      // if (state.permissions.length && user.permissions.permissions.includes[])
      return result;
    },
    // provides an output description
    description(description) {
      state.description = description;
      return Give(result, result, state);
    },
    // describe permissions
    for(permission: Array<string | Array<string>> | string) {
      state.permissions.push(permission);
      state.previous = 'permissions';
      return Give(result, user, state);
    },
    // adds another of the previous thing
    or(item: any) {
      if (state.previous) state[state.previous].push(item);
      return Give(result, user, state);
    },
    // adds another of the previous thing
    and(item: any) {
      if (state.previous) state[state.previous].push(item);
      return Give(result, user, state);
    },

    // sets the model
    as(model: string | Date) {
      state.type.push(model);
      state.previous = 'type';
      return Give(result, user, state);
    },

    // sets the format
    format(format: string | Date) {
      state.format = format;
      state.previous = 'format';
      return Give(result, user, state);
    },

    // sets the minimum
    min() {
      return Give(result, user, state);
    },

    // sets the minimum
    max() {
      return Give(result, user, state);
    },

    // sets an example
    example(example: string) {
      state.examples.push(example);
      state.previous = 'examples';

      return Give(result, user, state);
    },

    colorEnum(dictionary: { [index: string]: Colors }) {
      state.format = Enum;
      state.enumColors = dictionary;

      return Give(result, user, state);
    }
  };
}
/**
 * generates a description of an output function'
 * @param fn output function to describe
 */

export function Describe(fn: Function) {
  try {
    const keys = Object.keys(fn({}, {}));

    const testObj = createTestObject(keys);

    const obj = Object.entries(fn(testObj, {})).reduce((o, [key, value]) => {
      // If key is not a Loy object
      if (value == Test) o[key] = {};
      // if key  id loy object
      else o[key] = value;
      return o;
    }, {});
    return obj;
  } catch (error) {
    return {};
  }
}

export const give = Give;
export const describe = Describe;
