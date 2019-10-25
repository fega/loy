import { createTestObject, getItem } from './util'
export const Test = '<>!-!_LOI_GENERATE_DESCRIPTIONS_!-!<>'
export const Date = 'loi_internal_Date'
export const Url = 'loi_internal_Url'
export const File = 'loi_internal_File'
export const Image = 'loi_internal_Image'

/**
 * Return a result
 * @param result expected result
 * @param user user object
 * @param state state
 */
export function Give(result: any, user?: any, state: any = { permissions: [], examples: [], type: [] }) {
  return {
    ok() {
      if (result === Test) {
        const { previous, ...rest } = state
        return {
          ...getItem(rest.permissions, "permissions"),
          ...getItem(rest.examples, "examples"),
          ...getItem(rest.type, "type"),
          ...getItem(rest.format, "format"),
          ...getItem(rest.description, 'description')
        }
      }
      if (state.permissions.length && !user) return undefined
      if (state.permissions.length && !user.permissions) return undefined
      // if (state.permissions.length && user.permissions.permissions.includes[])
      return result
    },
    description(description) {
      state.description = description
      return Give(result, result, state)
    },
    for(permission: Array<string | Array<string>> | string) {
      state.permissions.push(permission)
      state.previous = 'permissions'
      return Give(result, user, state)
    },
    or(item: any) {
      if (state.previous) state[state.previous].push(item)
      return Give(result, user, state)
    },
    and(item: any) {
      if (state.previous) state[state.previous].push(item)
      return Give(result, user, state)
    },
    as(model: string | Date) {
      state.type.push(model)
      state.previous = 'type'
      return Give(result, user, state)
    },
    format(format: string | Date) {
      state.format = format
      state.previous = 'format'
      return Give(result, user, state)
    },
    min() {
      return Give(result, user, state)
    },
    max() {
      return Give(result, user, state)
    },
    example(example: string) {
      state.examples.push(example)
      state.previous = 'examples'

      return Give(result, user, state)
    }
  }
}
/**
 * generates a description of an output function'
 * @param fn output function to describe
 */

export function Describe(fn: Function) {
  try {
    const keys = Object.keys(fn({}, {}))

    const testObj = createTestObject(keys);

    const obj = Object.entries(fn(testObj, {}))
      .reduce((o, [key, value]) => {
        // If key is not a Loy object
        if (value == Test) o[key] = {}
        // if key  id loy object
        else o[key] = value
        return o
      }, {})
    return obj
  } catch (error) {
    return {}
  }
}


export const give = Give
export const describe = Describe
