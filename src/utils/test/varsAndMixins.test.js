// @flow
import expect from 'expect'
import replaceVarsAndMixins from '../varsAndMixins'

const varsAndMixins = {
  vars: {
    varValue: 'targetValue',
    // notValid: true,
  },
  mixins: {
    flex: (flex: string) => `flex: ${flex}`,
    multi: (str1: string, str2: string) => `${str1}multi${str2}`,
    varArg: (varArg: string) => `varArg: ${varArg}`,
    // notValid: 'string',
  },
}

describe('varsAndMixins', () => {
  const withGlobalObject = replaceVarsAndMixins(varsAndMixins)
  it('should map #var to vars section', () => {
    const testValue = ['other values #varValue; other value', '#varValue']
    const resultValue = ['other values targetValue; other value', 'targetValue']
    expect(withGlobalObject(testValue)).toEqual(resultValue)
  })
  it('should run @mixin from mixins section', () => {
    const testValue = ['other values @flex(flex); other value', '#varValue']
    const resultValue = ['other values flex: flex; other value', 'targetValue']
    expect(withGlobalObject(testValue)).toEqual(resultValue)
  })
  it('should run @mixin with multiple arguments', () => {
    const testValue = ['other values @multi(str1, str2); other value', '#varValue']
    const resultValue = ['other values str1multistr2; other value', 'targetValue']
    expect(withGlobalObject(testValue)).toEqual(resultValue)
  })
  it('should run @mixin with #varible', () => {
    const testValue = ['other values @varArg(#varValue); other value', '#varValue']
    const resultValue = ['other values varArg: targetValue; other value', 'targetValue']
    expect(withGlobalObject(testValue)).toEqual(resultValue)
  })
})
