import { strict as assert } from 'assert'
import { getScore, hasFan } from './utils'

export default {
  碰碰和() {
    let result = getScore('22m66999p', '6p', {pungs: ['777m', '888s']})
    assert.equal(hasFan(result.fans, '碰碰和'), true)
  },
  混一色() {
    let result1 = getScore('6788m', '5m', {chows: ['234m', '345m'], pungs: ['777z']})
    assert.equal(hasFan(result1.fans, '混一色'), true)
    let result2 = getScore('6788m', '5m', {chows: ['234m', '345m'], pungs: ['111m']})
    assert.equal(hasFan(result2.fans, '混一色'), false)
    assert.equal(hasFan(result2.fans, '清一色'), true)
  },
  三色三步高() {
    let result = getScore('3477m456p', '5m', {chows: ['234m', '345s']})
    assert.equal(hasFan(result.fans, '三色三步高'), true)
  },
  五门齐() {
    let result = getScore('888m34s44z', '2s', {chows: ['123p', '555z']})
    assert.equal(hasFan(result.fans, '五门齐'), true)
  },
  全求人() {
    let result1 = getScore('4z', '4z', {
      chows: ['123p', '234s'],
      pungs: ['777s'],
      exposedKongs: ['8888m']
    })
    assert.equal(hasFan(result1.fans, '全求人'), true)
    assert.equal(hasFan(result1.fans, '单钓将'), false)
    let result2 = getScore('4z', '4z', {
      chows: ['123p', '234s'],
      pungs: ['777s'],
      exposedKongs: ['8888m'],
      isSelfDrawn: true
    })
    assert.equal(hasFan(result2.fans, '全求人'), false)
    assert.equal(hasFan(result2.fans, '自摸'), true)
    assert.equal(hasFan(result2.fans, '单钓将'), true)
  },
  双暗杠() {
    let result1 = getScore('22m66p', '6p', {concealedKongs: ['7777m', '8888s']})
    assert.equal(hasFan(result1.fans, '双暗杠'), true)
    assert.equal(hasFan(result1.fans, '双暗刻'), false)
    let result2 = getScore('22m66p', '6p', {
      exposedKongs: ['9999p'],
      concealedKongs: ['7777m', '8888s']
    })
    assert.equal(hasFan(result2.fans, '双暗杠'), false)
    assert.equal(hasFan(result2.fans, '双暗刻'), true)
  },
  双箭刻() {
    let result = getScore('22345m66p', '6p', {pungs: ['666z'], concealedKongs: ['7777z']})
    assert.equal(hasFan(result.fans, '双箭刻'), true)
  }
}
