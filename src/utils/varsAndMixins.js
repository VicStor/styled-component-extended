// @flow

type VARS = { [key: string]: string }
type MIXIN_FUNC = (arg: string | void, ...rest?: Array<string>) => string
type MIXINS = { [key: string]: MIXIN_FUNC }


const replaceVarsAndMixins = ({ vars, mixins }: { vars: VARS, mixins: MIXINS }) =>
  (strings: Array<string>) => {
    const varRegExp = /#(\w+(:?\w+)?)/g
    const mixinRegExp = /@(\w+)\((.+)\)/g

    const matchVar = (matchVars: string, varName: string): string => {
      if (!vars) {
        throw new Error('No "vars" section in globalObject')
      }
      if (!vars[varName]) {
        throw new Error(`Can't find variable #${varName} in globalObject`)
      }
      if (typeof vars[varName] !== 'string') {
        throw new TypeError(`Expect variable #${varName} to be of type string in globalObject i see ${typeof vars[varName]} instead`)
      }
      return vars[varName]
    }

    const matchMixin = (matchMix: string, funcName: string, arg: string): string => {
      if (!mixins) {
        throw new Error('No "mixins" section in globalObject')
      }
      if (!mixins[funcName]) {
        throw new Error(`Can't find mixin @${funcName} in globalObject`)
      }
      if (typeof mixins[funcName] !== 'function') {
        throw new TypeError(`Expect mixin @${funcName} to be of type function in globalObject i see ${typeof mixins[funcName]} instead`)
      }

      const mixinArgs: Array<string> = arg.split(',').map(str => str.trim())

      return mixins[funcName].apply(null, mixinArgs)
    }

    const replaceVar = str => str.replace(varRegExp, matchVar)
    const replaceMixin = str => str.replace(mixinRegExp, matchMixin)

    return strings.map(replaceVar).map(replaceMixin)
  }

export default replaceVarsAndMixins
