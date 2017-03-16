// @flow
import css from './css'
import type { Interpolation, Target } from '../types'
import domElements from '../utils/domElements'
import replaceVarsAndMixins from '../utils/varsAndMixins'


export default (styledComponent: Function) => {
  const styled = (tag: Target) =>
    (strings: Array<string>, ...interpolations: Array<Interpolation>) => {
      const { globalObject } = styled
      const newStrings = globalObject ? replaceVarsAndMixins(globalObject)(strings) : strings
      return styledComponent(tag, css(newStrings, ...interpolations))
    }

  // Shorthands for all valid HTML Elements
  domElements.forEach(domElement => {
    styled[domElement] = styled(domElement)
  })

  styled.init = (globalObject) => {
    styled.globalObject = globalObject
  }

  return styled
}
