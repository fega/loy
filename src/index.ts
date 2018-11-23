const def = { permissions: [], examples: [], models: [] }
const SECRET_RESULT = '<>!-!_LOI_GENERATE_DESCRIPTIONS_!-!<>'
export const Url = 'Url'
export const File = 'File'

export function Give(result: any, user?: any, state: any = def) {
  return {
    ok() {
      if (result === SECRET_RESULT) return state
      if (state.permissions.length && !user) return undefined
      if (state.permissions.length && !user.permissions) return undefined
      // if (state.permissions.length && user.permissions.permissions.includes[])
      return result
    },
    description(description) {
      state.description = description
      return Give(result)
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
      return Give(result)
    },
    min() {
      return Give(result)
    },
    max() {
      return Give(result)
    },
    example(example: string) {
      state.examples.push(example)
      state.previous = 'examples'

      return Give(result, user, state)
    }
  }
}