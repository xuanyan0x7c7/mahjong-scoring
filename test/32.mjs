import { strict as assert } from 'assert'
import { getScore, hasFan } from './utils'

export default {
  一色四步高() {
    let result1 = getScore('23456m77s', '4m', {chows: ['123m', '345m']})
    assert.equal(hasFan(result1.fans, '一色四步高'), true)
    assert.equal(hasFan(result1.fans, '一色三步高'), false)
    assert.equal(hasFan(result1.fans, '连六'), false)
    let result2 = getScore('5677789m', '7m', {chows: ['123m', '345m']})
    assert.equal(hasFan(result2.fans, '一色三步高'), false)
    assert.equal(hasFan(result2.fans, '老少副'), false)
  },
  三杠() {
    let result = getScore('44m66p', '4m', {exposedKongs: ['2222m', '3333p', '5555s']})
    assert.equal(hasFan(result.fans, '三杠'), true)
  },
  混幺九() {
    let result1 = getScore('999m11p22z', '2z', {pungs: ['333z', '777z']})
    assert.equal(hasFan(result1.fans, '混幺九'), true)
    assert.equal(hasFan(result1.fans, '碰碰和'), false)
    assert.equal(hasFan(result1.fans, '全带幺'), false)
    assert.equal(hasFan(result1.fans, '幺九刻'), false)
    let result2 = getScore('1199m11p99s22337z', '7z')
    assert.equal(hasFan(result2.fans, '混幺九'), true)
    assert.equal(hasFan(result2.fans, '七对'), true)
  }
}
