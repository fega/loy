export const Test = '<>!-!_LOI_GENERATE_DESCRIPTIONS_!-!<>'
export const Url = 'Url'
export const File = 'File'

/**
 * Return a result
 * @param result expected result
 * @param user user object
 * @param state state
 */
export function Give(result: any, user?: any, state: any = { permissions: [], examples: [], models: [] }) {
  return {
    ok() {
      if (result === Test) {
        const { previous, ...rest } = state
        return rest
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
    as(model: string | String | Number | Object | Boolean | 'Url' | 'File' | Date) {
      state.models.push(model)
      state.previous = 'models'
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

export function Describe(fn: Function) {
  try {
    const keys = Object.keys(fn({}, {}))

    const testObj = keys.reduce((obj, key) => {
      obj[key] = Test
      return obj
    }, {})
    return fn(testObj, {})
  } catch (error) {
    return {}
  }
}


export const give = Give
export const describe = Describe